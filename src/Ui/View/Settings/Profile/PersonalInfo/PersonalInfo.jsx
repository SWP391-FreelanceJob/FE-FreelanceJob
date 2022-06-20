import { NavLink } from "react-router-dom";
import "../ProfileStyle.css";

const PersonalInfo = () => {
  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;
  return (
    <>
      <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
      <div className="w-full mt-4">
        <div className="form-control gap-3">
          <div className="form-input">
            <span>
              Hình đại diện <span className="text-red-500">*</span>
            </span>
            <div>
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img src="https://i.pravatar.cc/300" />
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
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="input input-bordered input-sm"
            />
          </div>
          <div className="form-input">
            <span>
              Email <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="info@site.com"
              className="input input-bordered input-sm"
            />
          </div>
          <div className="form-input">
            <span>
              Điện thoại <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              placeholder="091234567"
              className="input input-bordered input-sm"
            />
          </div>
          <div className="form-input">
            <span>CMND/CCCD</span>
            <input
              type="number"
              placeholder="023231322"
              className="input input-bordered input-sm"
            />
          </div>
          <div className="form-input">
            <span>
              Giới thiệu ngắn <span className="text-red-500">*</span>
            </span>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Lập trình C#,..."
                className="input input-bordered input-sm w-full"
              />
              <div className="text-xs text-slate-400 p-1">
                VD: Lập trình viên PHP / Lập trình viên Java/ v.v...
              </div>
            </div>
          </div>
          <div className="form-input">
            <span>
              Giới thiệu bản thân <span className="text-red-500">*</span>
            </span>
            <div className="tooltip w-1/3" data-tip={introTooltip}>
              <textarea
                className="textarea textarea-bordered h-32 w-full"
                placeholder="Giới thiệu về bản thân"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="btn secondary-btn text-white btn-sm mt-3 w-full">
        Lưu thay đổi
      </button>
    </>
  );
};

export default PersonalInfo;
