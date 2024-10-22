import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/auth";
import { useState } from "react";

function Signup() {
  const required_field = <span className="text-danger fw-bold">*</span>;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }, // Destructure errors here
  } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const AlertMsg = ({ msg }) => {
    return (
        <div className="d-flex justify-content-start">
        <span className="text-danger text-start" style={{ fontSize: "15px" }}>
          <span className="h5">
            <AiFillWarning />
          </span>
          <span className="ms-1">{msg}</span>
        </span>
        </div>
    );
  };

  const onSubmit = async (user_inf) => {
    console.log(user_inf);
    try {
      // Reset error message
      setApiError("");
      clearErrors(); // Clear previous errors
      await authApi.register(user_inf);
      alert('Đăng ký thành công!\nNhấn "OK" để quay về trang chủ');
      navigate("/home");
    } catch (error) {
      // Handle API error messages
      if (error.response && error.response.data) {
        const { erro } = error.response.data;

        // Set API errors for each field
        if (erro) {
          for (const [field, messages] of Object.entries(erro)) {
            setError(field, {
              type: "manual",
              message: messages[0], // Take the first error message for display
            });
          }
        }
        setApiError("Có lỗi xảy ra!");
      } else {
        setApiError("Có lỗi xảy ra!");
      }
    }
  };

  return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-4 border mt-5 rounded bg-white shadow">
            <div className="pt-3 text-center">
              <strong style={{ fontSize: "20px" }}>Đăng ký</strong>
            </div>
            <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
              {/* Show API error message */}
              {apiError && <AlertMsg msg={apiError} />}

              <div className="mb-3 position-relative">
                <label htmlFor="lastname" className="form-label">
                  Họ{required_field}
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                    {...register("lastname")}
                    id="lastname"
                    placeholder="Họ..."
                />
                {errors.lastname && <AlertMsg msg={errors.lastname.message} />}
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="firstname" className="form-label">
                  Tên{required_field}
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                    {...register("firstname")}
                    id="firstname"
                    placeholder="Tên..."
                />
                {errors.firstname && <AlertMsg msg={errors.firstname.message} />}
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="su_email" className="form-label">
                  Email{required_field}
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email")}
                    id="su_email"
                    placeholder="Email..."
                />
                {errors.email && <AlertMsg msg={errors.email.message} />}
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="su_pswd" className="form-label">
                  Mật khẩu{required_field}
                </label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    {...register("password")}
                    id="su_pswd"
                    placeholder="Mật khẩu..."
                />
                {errors.password && <AlertMsg msg={errors.password.message} />}
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="re_pswd" className="form-label">
                  Nhập lại mật khẩu{required_field}
                </label>
                <input
                    type="password"
                    className={`form-control ${errors.re_password ? "is-invalid" : ""}`}
                    {...register("re_password")}
                    id="re_pswd"
                    placeholder="Nhập lại mật khẩu..."
                />
                {errors.re_password && <AlertMsg msg={errors.re_password.message} />}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Đăng ký
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p>Bạn đã có tài khoản? <a href="/login" className="text-primary">Đăng nhập ngay</a></p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Signup;
