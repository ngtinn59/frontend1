import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import authApi from "../../../api/auth";
import { candAuthActions } from "../../../redux/slices/candAuthSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Cập nhật import

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi chi tiết
  const [apiErrors, setApiErrors] = useState({}); // State để lưu lỗi từ API

  // Hàm xử lý đăng nhập
  const handleLogin = async (user) => {
    user.role = 1;
    setIsLoading(true);
    setIsError(false); // Reset trạng thái lỗi trước khi gửi request
    setError(""); // Reset lỗi chi tiết
    setApiErrors({}); // Reset lỗi từ API

    try {
      const res = await authApi.login(user);
      console.log(res);
      dispatch(candAuthActions.setCurrentCandidate(res.user));
      localStorage.setItem("candidate_jwt", res.authorization.token);

      if (window.location.pathname === "/sign-up") {
        navigate("/");
      } else {
        const closeBtn = document.getElementById("closeBtn");
        closeBtn.click();
        document.querySelector("button.resetBtn").click();
      }
    } catch (error) {
      setIsError(true);
      if (error.response) {
        if (error.response.status === 422) {
          setApiErrors(error.response.data.error); // Lưu các lỗi chi tiết từ API vào state
        } else if (error.response.status === 401) {
          setError("Unauthorized: Email hoặc mật khẩu không chính xác!");
        } else if (error.response.status === 404) {
          setError("Email chưa được đăng ký!");
        } else {
          setError("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
        }
      } else {
        setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối.");
      }
    }

    setIsLoading(false);
  };

  // Hàm xử lý đăng nhập thành công với Google
  const handleGoogleLoginSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token); // Sử dụng jwtDecode thay vì jwt_decode
    const user = {
      email: decoded.email,
      name: decoded.name,
      role: 1, // Giả định role là 1 cho ứng viên
    };

    dispatch(candAuthActions.setCurrentCandidate(user));
    localStorage.setItem("candidate_jwt", token);
    navigate("/");
  };

  // Hàm xử lý lỗi đăng nhập với Google
  const handleGoogleLoginError = () => {
    setIsError(true);
    setError("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
  };

  return (
      <div className="modal fade" id="login-box">
        <div className="modal-dialog">
          <div className="modal-content custom-modal-content">
            <div className="modal-header custom-modal-header">
              <h3 className="modal-title">Đăng nhập</h3>
              <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="closeBtn"
              ></button>
            </div>
            <div className="modal-body custom-modal-body">
              {/* Form đăng nhập */}
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-floating mb-3 position-relative">
                  <input
                      type="text"
                      className={`form-control ${apiErrors.email ? "is-invalid" : ""}`}
                      name="email"
                      {...register("email")}
                      placeholder="Email"
                  />
                  <label htmlFor="email">
                    <FaUser className="me-2" /> Email
                  </label>
                  {apiErrors.email && (
                      <div className="invalid-feedback">
                        {apiErrors.email[0]} {/* Hiển thị lỗi email */}
                      </div>
                  )}
                </div>

                <div className="form-floating mb-3 position-relative">
                  <input
                      type="password"
                      className={`form-control ${apiErrors.password ? "is-invalid" : ""}`}
                      name="password"
                      {...register("password")}
                      placeholder="Mật khẩu"
                  />
                  <label htmlFor="password">
                    <FaLock className="me-2" /> Mật khẩu
                  </label>
                  {apiErrors.password && (
                      <div className="invalid-feedback">
                        {apiErrors.password[0]} {/* Hiển thị lỗi mật khẩu */}
                      </div>
                  )}
                </div>

                {/* Hiển thị thông báo lỗi chi tiết */}
                {isError && error && (
                    <div className="text-danger text-center mb-3">
                      {error}
                    </div>
                )}
                <div className="text-center mb-3">
                  <a href="/k" className="d-block text-decoration-none">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <button
                      type="submit"
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  >
                    {isLoading && (
                        <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    Đăng nhập
                  </button>
                  <button
                      type="reset"
                      className="resetBtn"
                      style={{ display: "none" }}
                  />
                </div>
              </form>

              {/* Nút đăng nhập bằng Google */}
              <div className="text-center my-3">
                <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                  <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      useOneTap
                  />
                </GoogleOAuthProvider>
              </div>

              {/* Liên kết đăng ký */}
              <div className="text-center mt-4">
                <p>Bạn chưa có tài khoản? <a href="/sign-up" className="text-primary">Đăng ký ngay</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
