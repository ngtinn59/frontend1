import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash3, BsBriefcase } from "react-icons/bs";
import { useSelector } from "react-redux";
import SavedJobPopup from "./SavedJobPopup";

import candidateApi from "../../../api/candidate";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [jobLocations, setJobLocations] = useState([]);
  const [curJob, setCurJob] = useState({});
  const user = useSelector((state) => state.candAuth.current);
  const isAuth = useSelector((state) => state.candAuth.isAuth);

  const getSavedJobs = async () => {
    const jobs = await candidateApi.getSavedJobs(user.id);
    let jobLocs = [];
    console.log(jobs);
    setJobs(jobs);
    for (let i = 0; i < jobs.length; i++) {
      jobLocs[i] = jobs[i].locations.map(loc => loc.name).join(", ");
    }
    setJobLocations(jobLocs);
  };

  useEffect(() => {
    if (isAuth) getSavedJobs();
  }, [isAuth, user.id]);

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-bold text-blue-600 p-6 border-b">Việc làm đã lưu</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị trí</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Công ty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa điểm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hạn nộp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {jobs.length > 0 ? (
                  jobs.map((item, index) => (
                      <tr key={`saveJob${item.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.jname}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.employer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{jobLocations[index]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.deadline}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {item.is_active === 1 ? (
                                <Link to={`/jobs/${item.id}`} className="inline-flex items-center">
                                  <button
                                      className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:scale-95"
                                  >
                                    <BsBriefcase className="mr-2" /> {/* Giảm khoảng cách từ 5 xuống 2 */}
                                    Ứng tuyển
                                  </button>
                                </Link>


                            ) : (
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed transition duration-300 ease-in-out">
                                  <BsBriefcase className="mr-2 inline"/>
                                  Đã đóng
                                </button>
                            )}
                            <button
                                className="p-2 text-red-500 bg-red-100 hover:text-white hover:bg-red-500 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                                onClick={() => setCurJob(item)}
                                data-bs-toggle="modal"
                                data-bs-target="#jobDeletingModal"
                            >
                              <BsTrash3 className="text-xl"/>
                            </button>

                          </div>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Không có bản ghi nào
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <SavedJobPopup job_id={curJob.id} />
      </div>
  );
}

export default SavedJobs;