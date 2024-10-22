import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import employerApi from "../../api/employer";
import { IoMdPeople } from "react-icons/io";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { IoIosLink } from "react-icons/io";

export default function Company() {
    const { id } = useParams();
    const [infor, setInfor] = useState({});
    const [jobs, setJobs] = useState([]);

    const getCompanyInfor = async () => {
        const res = await employerApi.getById(id);
        setInfor(res);
    };

    const getCompanyJobs = async () => {
        const res = await employerApi.getComJobs(id);
        setJobs(res);
    };

    useEffect(() => {
        getCompanyInfor();
        getCompanyJobs();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <img
                            src={infor.image}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                            alt={infor.name}
                        />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">{infor.name}</h1>
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <div className="w-32 h-32 flex-shrink-0 mb-4 md:mb-0 mr-0 md:mr-6">
                                <img
                                    src={infor.logo}
                                    className="w-full h-full object-contain rounded-lg border border-gray-200"
                                    alt={infor.name}
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <CompanyInfoBadge icon={<IoMdPeople />}>
                                        {infor.min_employees ? (
                                            <>
                                                {infor.min_employees}
                                                {infor.max_employees !== 0 ? ` - ${infor.max_employees}` : "+"} nhân viên
                                            </>
                                        ) : (
                                            "Chưa cập nhật"
                                        )}
                                    </CompanyInfoBadge>
                                    <CompanyInfoBadge icon={<MdPhone />}>
                                        {infor.phone}
                                    </CompanyInfoBadge>
                                    <CompanyInfoBadge icon={<IoIosLink />}>
                                        <a href={infor.website} className="hover:text-blue-700 transition-colors">
                                            {infor.website}
                                        </a>
                                    </CompanyInfoBadge>
                                </div>
                                <div className="flex items-start">
                                    <MdLocationOn className="text-blue-600 text-xl mr-2 mt-1" />
                                    <span className="text-gray-700">{infor.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                        <h2 className="bg-blue-600 text-white p-4 text-xl font-semibold">Giới thiệu công ty</h2>
                        <div className="p-6 whitespace-pre-line text-gray-700">
                            {infor.description || "Chưa cập nhật thông tin"}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <h2 className="bg-blue-600 text-white p-4 text-xl font-semibold">Việc làm đang tuyển</h2>
                        <div className="divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <div key={job.id} className="p-6">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-32 h-32 flex-shrink-0 mb-4 md:mb-0 mr-0 md:mr-6">
                                            <img
                                                src={infor.logo}
                                                className="w-full h-full object-contain rounded-lg border border-gray-200"
                                                alt={infor.name}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <Link
                                                to={`/jobs/${job.id}`}
                                                className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                {job.jname}
                                            </Link>
                                            <p className="text-gray-600 mb-2">{infor.name}</p>
                                            <div className="text-sm text-gray-700 space-y-1">
                                                <p><span className="font-semibold">Mức lương:</span> {job.min_salary ? `${job.min_salary} - ${job.max_salary} triệu VND` : "Cạnh tranh"}</p>
                                                <p><span className="font-semibold">Địa điểm:</span> {job.location}</p>
                                                <div className="flex justify-between">
                                                    <p><span className="font-semibold">Ngày đăng:</span> {job.postDate || "06/04/2023"}</p>
                                                    <p><span className="font-semibold">Hạn nộp:</span> {job.deadline}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CompanyInfoBadge({ icon, children }) {
    return (
        <div className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <span className="mr-2 text-blue-600">{icon}</span>
            {children}
        </div>
    );
}