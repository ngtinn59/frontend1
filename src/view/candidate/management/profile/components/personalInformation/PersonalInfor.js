import { useContext, useState } from "react";
import dayjs from "dayjs";
import { FaUser, FaPencilAlt } from "react-icons/fa";
import PersonalInforFormDialog from "./PersonalInforFormDialog";
import { CandidateContext } from "../../../layouts/CandidateLayout";

export default function PersonalInfor() {
  const { personal, getPersonal } = useContext(CandidateContext);
  const [isEdit, setIsEdit] = useState(false);
  const [hasImg, setHasImg] = useState(false);
  const none = <span className="text-gray-400 italic">Chưa có</span>;

  const handleEdit = () => {
    setIsEdit(true);
  };

  const InfoItem = ({ label, value }) => (
      <div className="mb-4">
        <span className="text-sm text-gray-500">{label}</span>
        <p className="text-lg font-medium text-gray-800">{value || none}</p>
      </div>
  );

  return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">Thông tin cá nhân</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {personal.avatar ? (
                  <img
                      src={personal.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                  />
              ) : (
                  <FaUser className="w-full h-full text-gray-400 p-4" />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mục tiêu nghề nghiệp</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {personal.objective || none}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InfoItem
                label="Họ tên"
                value={
                  personal.lastname && personal.firstname
                      ? `${personal.lastname} ${personal.firstname}`
                      : null
                }
            />
            <InfoItem
                label="Giới tính"
                value={
                  personal.gender === 0
                      ? "Nam"
                      : personal.gender === 1
                          ? "Nữ"
                          : null
                }
            />
            <InfoItem
                label="Ngày sinh"
                value={
                  personal.dob ? dayjs(personal.dob).format("DD/MM/YYYY") : null
                }
            />
            <InfoItem label="Số điện thoại" value={personal.phone} />
            <InfoItem label="Email" value={personal.email} />
            <InfoItem label="Địa chỉ" value={personal.address} />
            <div className="col-span-full">
              <InfoItem
                  label="Liên kết"
                  value={
                    personal.link ? (
                        <a
                            href={personal.link}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          {personal.link}
                        </a>
                    ) : null
                  }
              />
            </div>
          </div>
          <div className="mt-8 text-right">
            <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              <FaPencilAlt className="mr-2" />
              Cập nhật
            </button>
          </div>
        </div>
        {isEdit && (
            <PersonalInforFormDialog
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                personal={personal}
                hasImg={hasImg}
                setHasImg={setHasImg}
                getPersonal={getPersonal}
            />
        )}
      </div>
  );
}