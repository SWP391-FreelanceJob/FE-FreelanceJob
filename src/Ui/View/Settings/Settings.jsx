import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import CommonSetting from "./CommonSetting/CommonSetting";
import ProfileRoute from "./Profile/ProfileRoute";

const SettingLayout = () => {
  return (
    <div className="flex">
      <div className="w-1/5 flex flex-col">
        <ul className="menu filter-shadow w-56 p-2 rounded-box">
          <li>
            <NavLink end to="">Cài đặt chung</NavLink>
          </li>
          <li>
            <NavLink to="profile">Tài khoản</NavLink>
          </li>
          <li>
            <NavLink to="c">Nạp tiền</NavLink>
          </li>
          <li>
            <NavLink to="d">Lịch sử giao dịch</NavLink>
          </li>
        </ul>
      </div>
      <div className="w-4/5 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
const Settings = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingLayout />}>
        <Route path="/" element={<CommonSetting />} />
        <Route path="/profile/*" element={<ProfileRoute />} />
      </Route>
    </Routes>
  );
};

export default Settings;
