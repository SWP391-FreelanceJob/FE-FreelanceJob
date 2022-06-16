import { NavLink } from "react-router-dom";
import "../ProfileStyle.css";

const PersonalInfo = () => {

  return (
    <>
      <div>
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
        </div>
      </div>
      <button
        className="btn secondary-btn text-white btn-sm mt-3"
       
      >
        Lưu thay đổi
      </button>
    </>
  );
};

export default PersonalInfo;
