import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CheckCircleIcon, XCircleIcon, EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import employerApi from "../../../api/employer";
import { MessagePopup } from "./popup";

const tabs = [
  { key: "step1", label: "Duyệt hồ sơ", status: "WAITING" },
  { key: "step2", label: "Duyệt phỏng vấn", status: "BROWSING_INTERVIEW" },
  { key: "step3", label: "Đã tiếp nhận", status: "PASSED" },
];

export default function CandidateList() {
  const { register, handleSubmit } = useForm();
  const [candidates, setCandidates] = useState([]);
  const [curCandidate, setCurCandidate] = useState({});
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("WAITING");
  const [step, setStep] = useState("step1");
  const [showDialog, setShowDialog] = useState(false);

  const isAuth = useSelector((state) => state.employerAuth.isAuth);

  const getCandidateList = async () => {
    const res = await employerApi.getCandidateList(keyword, status);
    setCandidates(res);
  };

  useEffect(() => {
    getCandidateList();
  }, [keyword, status]);

  useEffect(() => {
    const newStatus = tabs.find(tab => tab.key === step)?.status;
    if (newStatus) setStatus(newStatus);
  }, [step]);

  useEffect(() => {
    if (isAuth) getCandidateList();
  }, [isAuth]);

  const handleClickActionBtn = async (candidate, actType) => {
    if (actType === "VIEWED" && candidate.status === "WAITING") {
      await employerApi.processApplying({ ...candidate, actType });
    }
    if (actType !== "VIEWED") {
      setShowDialog(true);
      setCurCandidate({ ...candidate, actType, step });
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-indigo-700 mb-6">Danh sách ứng viên</h1>

          <div className="mb-6">
            <nav className="flex space-x-4">
              {tabs.map((tab) => (
                  <button
                      key={tab.key}
                      onClick={() => setStep(tab.key)}
                      className={`px-3 py-2 font-medium text-sm rounded-md ${
                          step === tab.key
                              ? "bg-indigo-100 text-indigo-700"
                              : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab.label}
                  </button>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <form onSubmit={handleSubmit((data) => setKeyword(data.keyword))} className="flex space-x-4">
              <div className="relative flex-grow">
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập tên, email ứng viên, việc làm"
                    {...register("keyword")}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {step !== "step3" && (
                  <select
                      className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setStatus(e.target.value)}
                  >
                    {step === "step1" && (
                        <>
                          <option value="WAITING">Chưa duyệt hồ sơ</option>
                          <option value="RESUME_FAILED">Hồ sơ bị loại</option>
                        </>
                    )}
                    {step === "step2" && (
                        <>
                          <option value="BROWSING_INTERVIEW">Chưa duyệt phỏng vấn</option>
                          <option value="INTERVIEW_FAILED">Phỏng vấn bị loại</option>
                        </>
                    )}
                  </select>
              )}
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị trí ứng tuyển</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((item) => (
                  <tr key={item.jname + item.phone}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.lastname + " " + item.firstname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.jname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.appliedTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {status !== "PASSED" && status !== "RESUME_FAILED" && status !== "INTERVIEW_FAILED" && (
                          <>
                            <button
                                onClick={() => handleClickActionBtn(item, "ACCEPT")}
                                className="text-green-600 hover:text-green-900 mr-2"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => handleClickActionBtn(item, "REJECT")}
                                className="text-red-600 hover:text-red-900 mr-2"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </>
                      )}
                      <a
                          href={item.cv_link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => handleClickActionBtn(item, "VIEWED")}
                          className="text-indigo-600 hover:text-indigo-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </a>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {candidates.length === 0 && (
              <p className="text-center text-gray-500 mt-4">Không có bản ghi nào</p>
          )}

          <MessagePopup
              candidate={curCandidate}
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              getCandidateList={getCandidateList}
          />
        </div>
      </div>
  );
}