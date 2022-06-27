import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import ProfileRoute from "./Profile/ProfileRoute";
import Topup from "./Profile/Topup/Topup";

const SettingLayout = () => {
  return (
    <div className="flex">
      <div className="w-1/5 flex flex-col">
        <ul className="menu filter-shadow w-56 p-2 rounded-box">
          {/* <li>
            <NavLink end to="">Cài đặt chung</NavLink>
          </li> */}
          <li>
            <NavLink to="profile">Tài khoản</NavLink>
          </li>
          <li>
            <NavLink to="topup">Nạp tiền</NavLink>
          </li>
          <li>
            <NavLink to="d">Lịch sử giao dịch</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-full">
        <Outlet />
      </div>
    </div>
  );
};
const Settings = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingLayout />}>
        {/* <Route path="/" element={<CommonSetting />} /> */}
        <Route path="/" element={<Navigate to="profile" />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/profile/*" element={<ProfileRoute />} />
      </Route>
    </Routes>
  );
};

export default Settings;
