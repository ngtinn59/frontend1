import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";
import { BsCaretLeft, BsCaretRight, BsCurrencyDollar, BsGeoAlt } from "react-icons/bs";

export default function Home() {
    const navigate = useNavigate();
    const [hotJobs, setHotJobs] = useState([{ employer: {}, locations: [] }]);
    const [hotCompanies, setHotCompanies] = useState([]);
    const [page, setPage] = useState({ links: [] });
    const [curPage, setCurPage] = useState(1);

    const getHotJobs = async (apiURL) => {
        try {
            const res = await axios.get(apiURL);
            setHotJobs(res.data.data);
            delete res.data.data;
            setPage(res.data);
            setCurPage(res.data.current_page);
        } catch (error) {
            console.log(error);
        }
    };

    const getHotCompanies = async () => {
        try {
            const res = await axios.get("http://101.101.96.43/api/companies/getHotList");
            setHotCompanies(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHotJobs(`http://101.101.96.43/api/jobs/getHotList`);
        getHotCompanies();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Banner Section */}
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow-xl text-white text-center p-10 mb-10">
                    <FaBriefcase className="text-8xl opacity-10 absolute top-4 left-4" />
                    <h1 className="text-5xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
                        FIND YOUR DREAM JOB
                    </h1>
                    <h2 className="text-3xl font-semibold mb-6 drop-shadow-md">
                        Chào mừng đến với nền tảng việc làm hàng đầu
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Khám phá hàng ngàn cơ hội việc làm mới mỗi ngày. Hãy bắt đầu hành trình nghề nghiệp của bạn cùng chúng tôi!
                    </p>
                    <button
                        onClick={() => navigate("/jobs")}
                        className="bg-white text-blue-600 font-bold text-lg px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition duration-300 flex items-center justify-center mx-auto"
                    >
                        Tìm việc ngay <FaArrowRight className="ml-2" />
                    </button>
                </div>

                {/* Hot Jobs Section */}
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow-xl p-8 mb-10">
                    <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6 drop-shadow-md">
                        OUTSTANDING WORK
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {hotJobs.map((job) => (
                            <div
                                key={`job${job.id}`}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                            >
                                <div className="p-6 flex">
                                    <Link to={`/companies/${job.employer.id}`} className="flex-shrink-0">
                                        <img
                                            src={job.employer.logo}
                                            alt={`hotjob${job.id}`}
                                            className="w-24 h-24 object-contain rounded-lg"
                                        />
                                    </Link>
                                    <div className="ml-4">
                                        <Link
                                            to={`/jobs/${job.id}`}
                                            className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            {job.jname}
                                        </Link>
                                        <p className="text-gray-600 mb-2">{job.employer.name}</p>
                                        <div className="flex items-center text-gray-700 mb-1">
                                            <BsCurrencyDollar className="mr-2" />
                                            <span>
                        {job.min_salary ? `${job.min_salary} - ${job.max_salary} triệu VND` : "Theo thỏa thuận"}
                      </span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <BsGeoAlt className="mr-2" />
                                            <span>{job.locations.map(item => item.name).join(", ")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6 space-x-2">
                        {page.links.map((item) => (
                            <button
                                key={`page${item.label}`}
                                onClick={() => getHotJobs(item.url)}
                                className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${
                                    curPage.toString() === item.label
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-blue-600 hover:bg-blue-100"
                                }`}
                            >
                                {item.label === "&laquo; Previous" ? <BsCaretLeft /> : null}
                                {item.label === "Next &raquo;" ? <BsCaretRight /> : null}
                                {item.label !== "&laquo; Previous" && item.label !== "Next &raquo;" ? item.label : null}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Companies Section */}
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow-xl p-8 mb-10">
                    <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6 drop-shadow-md">
                        COMPANIES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {hotCompanies.map((company) => (
                            <div
                                key={`company${company.id}`}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 p-4"
                            >
                                <Link to={`/companies/${company.id}`} className="flex justify-center mb-4">
                                    <img
                                        src={company.logo}
                                        alt={`hot_company${company.id}`}
                                        className="w-24 h-24 object-contain rounded-lg"
                                    />
                                </Link>
                                <div className="text-center">
                                    <h3 className="font-bold text-lg mb-2">{company.name}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                    {company.job_num} việc làm
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Entertainment Section */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-400 rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6 drop-shadow-md">
                        ENTERTAINMENT
                    </h2>
                    <iframe
                        src="https://www.crazygames.com/embed/real-cars-in-city"
                        className="w-full h-[600px] rounded-lg"
                        title="Trò Chơi Giải Trí"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}