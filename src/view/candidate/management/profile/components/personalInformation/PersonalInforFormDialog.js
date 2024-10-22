import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaUpload, FaTrash } from "react-icons/fa";
import candidateApi from "../../../../../../api/candidate";

export default function PersonalInforFormDialog({
                                                  isEdit,
                                                  setIsEdit,
                                                  personal,
                                                  hasImg,
                                                  setHasImg,
                                                  getPersonal,
                                                }) {
  const requiredMsg = "Không được để trống";
  const schema = yup.object({
    lastname: yup.string().required(requiredMsg),
    firstname: yup.string().required(requiredMsg),
    gender: yup.number().required(requiredMsg),
    dob: yup.string().required(requiredMsg),
    phone: yup
        .string()
        .required(requiredMsg)
        .matches(/^[0-9]{10}$/, "Sai định dạng số điện thoại"),
    email: yup.string().email("Sai định dạng email").required(requiredMsg),
    address: yup.string().required(requiredMsg),
    link: yup.string().url("Sai định dạng URL"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isDeleteImg, setIsDeleteImg] = useState(false);

  const handleDisplayImg = (e) => {
    setHasImg(true);
    setIsDeleteImg(false);
    const reader = new FileReader();
    reader.onload = () => {
      const outputs = document.getElementsByClassName("avatar-img");
      for (let output of outputs) {
        output.src = reader.result;
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteImg = () => {
    setHasImg(false);
    setIsDeleteImg(true);
    document.getElementById("avatar-upload").value = null;
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value);
    });
    if (hasImg) formData.append("image", data.image[0]);
    if (isDeleteImg) formData.append("delete_img", "1");

    try {
      await candidateApi.update(formData);
      alert("Cập nhật thành công!");
      await getPersonal();
      setIsEdit(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (personal.avatar) setHasImg(true);
  }, [personal.avatar]);

  return (
      <div className={`fixed inset-0 z-50 ${isEdit ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Thông tin cá nhân</h2>
            <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {hasImg ? (
                    <img
                        src={personal.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover avatar-img"
                    />
                ) : (
                    <FaUser className="w-full h-full text-gray-400 p-4" />
                )}
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tải ảnh lên
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                    <FaUpload className="inline-block mr-2" />
                    Chọn ảnh
                    <input
                        id="avatar-upload"
                        type="file"
                        className="hidden"
                        {...register("image")}
                        onChange={handleDisplayImg}
                    />
                  </label>
                  <button
                      type="button"
                      onClick={handleDeleteImg}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    <FaTrash className="inline-block mr-2" />
                    Xóa ảnh
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <input
                      type="text"
                      placeholder="Họ"
                      defaultValue={personal.lastname}
                      {...register("lastname")}
                      className={`w-1/2 px-3 py-2 border rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <input
                      type="text"
                      placeholder="Tên"
                      defaultValue={personal.firstname}
                      {...register("firstname")}
                      className={`w-1/2 px-3 py-2 border rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {(errors.lastname || errors.firstname) && (
                    <p className="mt-1 text-sm text-red-500">Vui lòng nhập đủ họ và tên</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới tính <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value={0}
                        defaultChecked={personal.gender === 0}
                        {...register("gender")}
                        className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Nam</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value={1}
                        defaultChecked={personal.gender === 1}
                        {...register("gender")}
                        className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Nữ</span>
                  </label>
                </div>
                {errors.gender && <p className="mt-1 text-sm text-red-500">{requiredMsg}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    {...register("dob")}
                    defaultValue={personal.dob}
                    className={`w-full px-3 py-2 border rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register("phone")}
                    defaultValue={personal.phone}
                    className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    {...register("email")}
                    defaultValue={personal.email}
                    className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register("address")}
                    defaultValue={personal.address}
                    className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liên kết
                </label>
                <input
                    type="text"
                    {...register("link")}
                    defaultValue={personal.link}
                    className={`w-full px-3 py-2 border rounded-md ${errors.link ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mục tiêu nghề nghiệp
              </label>
              <textarea
                  rows={5}
                  defaultValue={personal.objective}
                  {...register("objective")}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 resize-none"
              />
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                Hủy
              </button>
              <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}