import { login, register } from "@/Api/Service/AuthService";
import { userLogin } from "@/App/Models/User/UserSlice";
import { notyf } from "@/App/Utils/NotyfSetting";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const signInGooglePopup = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      notyf.error("Đã có lỗi xảy ra: " + errorMessage);
    });
    return res;
  };

  const signIn = async () => {
    const res = await signInGooglePopup();
    // const cred = GoogleAuthProvider.credentialFromResult(res);
    const usr = res.user;
    const idToken = await usr.getIdToken();
    // console.log(idToken);
    if (idToken) {
      try {
        const user = await login(idToken);
        if (user && user.role === "admin") {
          throw new Error("Unauthorized");
        }
        // console.log(user);
        dispatch(userLogin(user));
        localStorage.setItem("token", user.jwt);
        navigate("/");
      } catch (error) {
        if (error && error.messages) {
          switch (error.messages[0].err_msg) {
            case "User not found in DB!":
              notyf.error(
                "Tài khoản chưa được đăng ký, vui lòng đăng ký tài khoản mới!"
              );
              break;
            default:
              notyf.error(
                "Đã có lỗi xảy ra khi đăng nhập " + error.messages[0].err_msg
              );
              break;
          }
        } else {
          if (error.message === "Unauthorized") {
            notyf.error("Admin không có quyền truy cập vào trang này!");
          } else {
            notyf.error("Đã có lỗi xảy ra khi đăng nhập!");
          }
        }
      }
    } else {
      notyf.error("Đăng nhập thất bại");
    }
  };

  const signUp = async () => {
    if (selectedRole == "") {
      notyf.error("Vui lòng chọn vai trò");
      return;
    }

    const res = await signInGooglePopup();
    // const cred = GoogleAuthProvider.credentialFromResult(res);
    const usr = res.user;
    const idToken = await usr.getIdToken();

    if (idToken) {
      try {
        await register(idToken, selectedRole);
        notyf.success("Đăng ký thành công");

        const user = await login(idToken);
        dispatch(userLogin(user));
        localStorage.setItem("token", user.jwt);
        navigate("/");
      } catch (error) {
        switch (error.messages[0].err_msg) {
          case "User not found in DB!":
            notyf.error(
              "Tài khoản chưa được đăng ký, vui lòng đăng ký tài khoản mới!"
            );
            break;
          default:
            notyf.error(
              "Đã có lỗi xảy ra khi đăng nhập " + error.messages[0].err_msg
            );
            break;
        }
      }
    } else {
      notyf.error("Đăng nhập thất bại");
    }
  };

  useEffect(() => {
    if (userState.isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex w-full h-screen bg-violet-500">
      <div className="w-full flex  items-center justify-center ">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-4xl font-semibold">Welcome to FreelanceVN</h1>
          {/* <p className="font-medium text-lg text-gray-500 mt-4 text-center">
            Please enter your information.
          </p> */}
          <div className="mt-8">
            {/* <div>
              <label className="text-lg font-medium">Email</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-lg font-medium">Password</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label
                  className="ml-2 font-medium text-base"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <button className="font-medium text-base text-violet-500">
                Forgot your password?
              </button>
            </div> */}
            <div className="mt-8 flex flex-col gap-y-4">
              {/* <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-2xl bg-violet-500 text-white text-lg font-bold">
                Sign in
              </button> */}
              <button
                onClick={signIn}
                className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 "
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Đăng nhập bằng Google
              </button>
            </div>
            <div className="mt-8 flex flex-col justify-center items-center">
              <p className="font-medium text-base">
                Chưa có tài khoản FreelanceVN?
              </p>
              <div className="text-xs text-slate-500 my-2">
                Freelancer chỉ được sử dụng tài khoản với email @fpt.edu.vn
                <br />
                Nhà tuyển dụng chỉ được sử dụng tài khoản với email @gmail.com
              </div>
              <select
                onChange={(e) => setSelectedRole(e.target.value)}
                className="select select-bordered w-full max-w-xs my-2"
                defaultValue="default-select"
              >
                <option disabled value="default-select">
                  Chọn vai trò của bạn
                </option>
                <option value="freelancer">Freelancer</option>
                <option value="recruiter">Nhà tuyển dụng</option>
              </select>
              <button
                onClick={signUp}
                className="flex items-center justify-center 
                gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] 
                ease-in-out transform p-4 rounded-xl text-white font-semibold text-lg border-2 border-blue-100 bg-black "
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Đăng ký bằng Google
              </button>
            </div>
            <div className="flex w-full justify-center mt-3">
              <button
                onClick={() => navigate("/")}
                className="btn offer-btn text-white"
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
