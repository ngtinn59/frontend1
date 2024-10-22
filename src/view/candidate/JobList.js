import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import jobApi from "../../api/job";
import industryApi from "../../api/industry";
import locationApi from "../../api/location";
import jtypeApi from "../../api/jtype";
import jlevelApi from "../../api/jlevel";
import dayjs from "dayjs";
import { BsSearch, BsCurrencyDollar, BsGeoAlt, BsCalendar3 } from "react-icons/bs";

export default function EnhancedJobList() {
  const nav = useNavigate();
  const { setCurrentPage } = useContext(AppContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [jobs, setJobs] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jtypes, setJtypes] = useState([]);
  const [jlevels, setJlevels] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [filterConditions, setFilterConditions] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    setCurrentPage("jobs");
    getJobs();
    getAllIndustries();
    getAllLocations();
    getAllJtypes();
    getAllJlevels();
  }, []);

  const getJobs = async (page = 1, conditions = {}) => {
    const res = await jobApi.getList({ page, ...conditions });
    setJobs(res.data);
    setTotalPage(res.last_page);
  };

  const getAllIndustries = async () => {
    const res = await industryApi.getAll();
    setIndustries(res.inf);
  };

  const getAllLocations = async () => {
    const res = await locationApi.getAll();
    setLocations(res);
  };

  const getAllJtypes = async () => {
    const res = await jtypeApi.getAll();
    setJtypes(res.inf);
  };

  const getAllJlevels = async () => {
    const res = await jlevelApi.getAll();
    setJlevels(res.inf);
  };

  const handleFilter = async (data) => {
    try {
      const conditions = {
        ...data,
        industry_id: selectedIndustries,
        location_id: selectedLocations,
      };
      setIsSearchLoading(true);
      setFilterConditions(conditions);
      await getJobs(1, conditions);
      setCurPage(1);
      setIsSearchLoading(false);
    } catch (e) {
      setIsSearchLoading(false);
    }
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(handleFilter)} className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Tìm việc làm nhanh, việc làm mới nhất trên toàn quốc
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Tìm việc làm"
                  {...register("keyword", { minLength: 3 })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.keyword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.keyword && (
                  <p className="absolute text-red-500 text-xs italic mt-1">Vui lòng nhập tối thiểu 3 kí tự</p>
              )}
            </div>
            <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setSelectedIndustries([e.target.value])}
            >
              <option value="">Tất cả ngành nghề</option>
              {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>{industry.name}</option>
              ))}
            </select>
            <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setSelectedLocations([e.target.value])}
            >
              <option value="">Tất cả tỉnh thành</option>
              {locations.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("salary")}
            >
              <option value="">Mức lương</option>
              <option value="5">Trên 5 triệu</option>
              <option value="10">Trên 10 triệu</option>
              <option value="15">Trên 15 triệu</option>
              <option value="20">Trên 20 triệu</option>
              <option value="25">Trên 25 triệu</option>
              <option value="30">Trên 30 triệu</option>
              <option value="40">Trên 40 triệu</option>
              <option value="50">Trên 50 triệu</option>
            </select>
            <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("jtype_id")}
            >
              <option value="">Hình thức việc làm</option>
              {jtypes.map((item) => (
                  <option value={item.id} key={`jtype${item.id}`}>{item.name}</option>
              ))}
            </select>
            <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("jlevel_id")}
            >
              <option value="">Cấp bậc</option>
              {jlevels.map((item) => (
                  <option value={item.id} key={`jlevel${item.id}`}>{item.name}</option>
              ))}
            </select>
            <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("posting_period")}
            >
              <option value="">Đăng trong vòng</option>
              <option value="3">4 ngày trước</option>
              <option value="7">1 tuần trước</option>
              <option value="14">2 tuần trước</option>
              <option value="30">1 tháng trước</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
                disabled={isSearchLoading}
            >
              {isSearchLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                  <BsSearch className="inline-block mr-2" />
              )}
              Tìm kiếm
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
              jobs.map((job) => (
                  <div
                      key={`job_${job.id}`}
                      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
                      onClick={() => nav(`/jobs/${job.id}`)}
                  >
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <img
                            src={job.employer.logo}
                            alt={job.jname}
                            className="w-16 h-16 object-contain rounded-full border-2 border-gray-200 mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-lg text-indigo-700 truncate" title={job.jname}>
                            {job.jname}
                          </h3>
                          <p className="text-gray-600 truncate" title={job.employer.name}>
                            {job.employer.name}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <BsCurrencyDollar className="mr-2 text-indigo-500" />
                          <span>
                      {job.min_salary
                          ? `${job.min_salary} - ${job.max_salary} triệu VND`
                          : "Theo thỏa thuận"}
                    </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <BsGeoAlt className="mr-2 text-indigo-500" />
                          <span className="truncate" title={job.locations?.map(loc => loc.name).join(", ")}>
                      {job.locations && job.locations[0].name}
                            {job.locations?.length > 1 && "..."}
                    </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-600 flex items-center">
                  <BsCalendar3 className="mr-2 text-indigo-500" />
                  Còn {dayjs().diff(job.expire_at, "day") <= 30
                    ? dayjs(job.expire_at).diff(new Date(), "day")
                    : "30+"} ngày
                </span>
                      <button
                          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-200 transition duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            nav(`/jobs/${job.id}`);
                          }}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
              ))
          ) : (
              <div className="col-span-full text-center py-10">
                <h4 className="text-2xl font-semibold text-gray-700">
                  Không có kết quả nào phù hợp!
                </h4>
              </div>
          )}
        </div>

        {totalPage > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                    onClick={() => {
                      if (curPage > 1) {
                        setCurPage(curPage - 1);
                        getJobs(curPage - 1, filterConditions);
                      }
                    }}
                    disabled={curPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        curPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  Trang trước
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Trang {curPage} / {totalPage}
            </span>
                <button
                    onClick={() => {
                      if (curPage < totalPage) {
                        setCurPage(curPage + 1);
                        getJobs(curPage + 1, filterConditions);
                      }
                    }}
                    disabled={curPage === totalPage}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        curPage === totalPage ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  Trang sau
                </button>
              </nav>
            </div>
        )}
      </div>
  );
}