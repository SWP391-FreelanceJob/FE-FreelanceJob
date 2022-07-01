import { useGetFreelancerByIdQuery } from "@/App/Models/Freelancer/Freelancer";
import { useUpdateProfileMutation } from "@/App/Models/Profile/Profile";
import { notyf } from "@/App/Utils/NotyfSetting";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "../ProfileStyle.css";

const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState(false);

  const userState = useSelector((state) => state.user);
  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;

  const [updateProfile, { loading }] = useUpdateProfileMutation();

  const onSubmit = async (data) => {
    console.log(data);
    const resp = await updateProfile({ userId: userState.userId, updProfile: data });
    if (resp.error) {
      notyf.error(resp.error.messages[0].err_msg);
    }
    else{
      notyf.success("Cập nhật thành công");
      // setIsEdit(false);
    }
  };

  const getPhoneError = (errors) => {
    if (errors.phone) {
      switch (errors.phone.type) {
        case "minLength":
          return (
            <p className="text-red-400 text-xs">
              Số điện thoại không nhỏ hơn 10 số
            </p>
          );
        case "maxLength":
          return (
            <p className="text-red-400 text-xs">
              Số điện thoại không lớn hơn 11 số
            </p>
          );
        default:
          return (
            <p className="text-red-400 text-xs">
              Số điện thoại không được để trống
            </p>
          );
      }
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-4">
          <div className="form-control gap-3">
            <div className="form-input">
              <span>
                Hình đại diện <span className="text-red-500">*</span>
              </span>
              <div>
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img
                      src={`${
                        userState.avatar ?? "https://i.pravatar.cc/300"
                      } `}
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  1. Kích thước không quá 1MB
                  <br />
                  2. Định dạng hỗ trợ: jpg, jpeg, png, gif{" "}
                </div>
              </div>
            </div>
            <div className="form-input">
              <span>
                Họ và Tên <span className="text-red-500">*</span>
              </span>
              <div>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className={`${
                    errors.fullName ? "border-red-500 " : ""
                  }input input-bordered input-sm w-full`}
                  defaultValue={userState.fullName ?? ""}
                  {...register("fullName", {
                    validate: (value) => value !== "",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs">
                    Họ và Tên không được để trống
                  </p>
                )}
              </div>
            </div>
            <div className="form-input">
              <span>Email</span>
              <input
                type="text"
                placeholder="info@site.com"
                className={`${
                  errors.email ? "border-red-500 " : ""
                }input input-bordered input-sm`}
                defaultValue={userState.email ?? ""}
                readOnly
                disabled
                {...register("email")}
              />
            </div>
            <div className="form-input">
              <span>
                Điện thoại <span className="text-red-500">*</span>
              </span>
              <div>
                <input
                  type="number"
                  placeholder="091234567"
                  className={`${
                    errors.phone ? "border-red-500 " : ""
                  }input input-bordered input-sm w-full`}
                  defaultValue={userState.phone ?? ""}
                  {...register("phone", {
                    require: true,
                    minLength: 10,
                    maxLength: 11,
                  })}
                />
                {getPhoneError(errors)}
              </div>
            </div>
            <div className="form-input">
              <span>Giới thiệu ngắn</span>
              <div className="w-1/3">
                <input
                  type="text"
                  placeholder="Lập trình C#,..."
                  className={`${
                    errors.shortDescription ? "border-red-500 " : ""
                  }input input-bordered input-sm w-full`}
                  defaultValue={userState.shortDescription ?? ""}
                  {...register("shortDescription")}
                />
                <div className="text-xs text-slate-400 p-1">
                  VD: Lập trình viên PHP / Lập trình viên Java/ v.v...
                </div>
              </div>
            </div>
            <div className="form-input">
              <span>Giới thiệu bản thân</span>
              <div className="tooltip w-1/3" data-tip={introTooltip}>
                <textarea
                  className={`${
                    errors.description ? "border-red-500 " : ""
                  }textarea textarea-bordered h-32 w-full`}
                  placeholder="Giới thiệu về bản thân"
                  defaultValue={userState.description ?? ""}
                  {...register("description")}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="btn secondary-btn text-white btn-sm mt-3 w-full">
          Lưu thay đổi
        </button>
      </form>
    </>
  );
};

export default PersonalInfo;
