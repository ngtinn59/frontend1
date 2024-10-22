import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import jobApi from "../../api/job";
import candidateApi from "../../api/candidate";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import {
  BsCalendar2Check,
  BsCalendarEvent,
  BsFillBriefcaseFill,
  BsFillGeoAltFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsPersonWorkspace,
  BsUpload,
} from "react-icons/bs";
import { FaIndustry } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";

export default function EnhancedJob() {
  const { id } = useParams();
  const nav = useNavigate();
  const [job, setJob] = useState({
    employer: {},
    jtype: {},
    jlevel: {},
    industries: [],
  });
  const user = useSelector((state) => state.candAuth.current);
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [isApplied, setIsApplied] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [file, setFile] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getJobInf();
  }, []);

  useEffect(() => {
    if (isAuth) {
      checkApplying();
      checkJobSaved();
    }
  }, [isAuth]);

  const getJobInf = async () => {
    const res = await jobApi.getById(id);
    setJob(res);
  };

  const checkApplying = async () => {
    const res = await jobApi.checkApplying(id);
    setIsApplied(res.value);
  };

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("fname", file.name);
    await jobApi.apply(id, formData);
    alert("Ứng tuyển thành công!");
    window.location.reload();
  };

  const getFileInf = (e) => {
    setFile(e.target.files[0]);
  };

  const checkLoggedIn = () => {
    if (!isAuth) {
      alert("Vui lòng đăng nhập!");
    } else {
      setShowModal(true);
    }
  };

  const checkJobSaved = async () => {
    const res = await candidateApi.checkJobSaved(id);
    setIsSaved(res.value);
  };

  const handleClickSaveBtn = async (status) => {
    const data = { status: status };
    await candidateApi.processJobSaving(id, data);
    setIsSaved(!isSaved);
    setTimeout(() => {
      alert("Cập nhật thành công!");
    }, 100);
  };

  return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="relative h-80">
              <img
                  src={job.employer?.image || "/placeholder.svg?height=320&width=1280"}
                  alt={`${job.employer?.name} banner`}
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-2">{job.jname}</h1>
                <p className="text-2xl text-gray-200">{job.employer?.name}</p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="flex items-center mb-4 sm:mb-0">
                  <img
                      src={job.employer?.logo || "/placeholder.svg?height=64&width=64"}
                      alt={job.employer?.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{job.employer?.name}</h2>
                    <p className="text-gray-600 flex items-center mt-1">
                      <BsFillGeoAltFill className="mr-2 text-blue-500" />
                      {job.address}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                      className={`px-6 py-3 rounded-full text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
                          isApplied ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      onClick={checkLoggedIn}
                      disabled={isApplied}
                  >
                    {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                  </button>
                  <button
                      className={`px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
                          isSaved
                              ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => handleClickSaveBtn(!isSaved)}
                  >
                    {isSaved ? (
                        <span className="flex items-center">
                      <AiFillHeart className="mr-2" /> Đã lưu
                    </span>
                    ) : (
                        <span className="flex items-center">
                      <AiOutlineHeart className="mr-2" /> Lưu việc làm
                    </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <JobDetail icon={<FaIndustry />} title="Ngành nghề" value={job.industries?.map(i => i.name).join(", ")} />
                <JobDetail icon={<MdOutlineAttachMoney />} title="Lương" value={job.min_salary ? `${job.min_salary} - ${job.max_salary} triệu VND` : "Cạnh tranh"} />
                <JobDetail icon={<BsFillBriefcaseFill />} title="Kinh nghiệm" value={job.yoe ? `${job.yoe} năm` : "Không yêu cầu"} />
                <JobDetail icon={<BsFillPeopleFill />} title="Số lượng" value={`${job.amount} người`} />
                <JobDetail icon={<BsPersonWorkspace />} title="Hình thức" value={job.jtype?.name} />
                <JobDetail icon={<BsFillPersonFill />} title="Cấp bậc" value={job.jlevel?.name} />
                <JobDetail icon={<BsCalendarEvent />} title="Ngày đăng" value={dayjs(job.created_at).format("DD/MM/YYYY")} />
                <JobDetail icon={<BsCalendar2Check />} title="Hạn nộp" value={dayjs(job.expire_at).format("DD/MM/YYYY")} />
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Chi tiết công việc</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.description || "Chưa cập nhật thông tin"}
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Thông tin công ty</h3>
                <div className="flex items-center mb-4">
                  <IoMdPeople className="text-blue-600 text-2xl mr-3" />
                  <span className="font-medium mr-2 text-gray-700">Quy mô:</span>
                  <span className="text-gray-600">
                  {job.employer?.min_employees
                      ? `${job.employer.min_employees}${
                          job.employer.max_employees !== 0
                              ? ` - ${job.employer.max_employees}`
                              : "+"
                      } nhân viên`
                      : "Chưa cập nhật"}
                </span>
                </div>
                <div className="flex items-start">
                  <BsFillGeoAltFill className="text-blue-600 text-2xl mr-3 mt-1" />
                  <div>
                    <span className="font-medium mr-2 text-gray-700">Địa điểm:</span>
                    <span className="text-gray-600 whitespace-pre-line">{job.address}</span>
                  </div>
                </div>
                <button
                    className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => nav(`/companies/${job.employer?.id}`)}
                >
                  Xem trang công ty
                </button>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Ứng tuyển vào vị trí</h2>
                <h3 className="text-xl mb-2 text-gray-700">{job.jname}</h3>
                <p className="text-gray-600 mb-8">{job.employer?.name}</p>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                    Họ và tên
                  </label>
                  <input
                      type="text"
                      id="fullname"
                      className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={user?.name?.lastname + " " + user?.name?.firstname}
                      disabled
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                      type="email"
                      id="email"
                      className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={user?.email}
                      disabled
                  />
                </div>

                <div className="mb-8">
                  <p className="block text-gray-700 text-sm font-bold mb-4">Hồ sơ của bạn:</p>
                  <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => {
                        setShowModal(false);
                        nav("/candidate/resumes");
                      }}
                  >
                    <AiOutlinePlus className="inline mr-2" /> Tạo hồ sơ trực tuyến
                  </button>
                  <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => setIsUpload(!isUpload)}
                  >
                    <BsUpload className="inline mr-2" /> Tải lên hồ sơ có sẵn
                  </button>
                  {isUpload && (
                      <input
                          type="file"
                          className="mt-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={getFileInf}
                      />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={handleApply}
                  >
                    Nộp hồ sơ
                  </button>
                  <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => setShowModal(false)}

                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

function JobDetail({ icon, title, value }) {
  return (
      <div className="flex items-start p-6 bg-gray-50 rounded-xl transition duration-300 ease-in-out hover:shadow-md hover:bg-white">
        <div className="text-blue-600 text-2xl mr-4">{icon}</div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">{title}</h4>
          <p className="text-gray-600">{value}</p>
        </div>
      </div>
  );
}