import { Route, Routes, NavLink, Outlet } from "react-router-dom";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Portfolio from "./Portfolio/Portfolio";
import WorkExp from "./WorkExp/WorkExp";

const ProfileLayout = () => {
  const navLinkActive = ({ isActive }) => {
    const active = isActive ? " tab-active" : "";
    return "tab tab-lifted" + active;
  };

  return (
    <>
      <div className="tabs bg-slate-50 rounded-md">
        <NavLink end to="" className={navLinkActive}>
          Thông tin cá nhân
        </NavLink>
        <NavLink to="work-profile" className={navLinkActive}>
          Hồ sơ làm việc
        </NavLink>
        <NavLink to="portfolio" className={navLinkActive}>
          Hồ sơ năng lực
        </NavLink>
        {/* <NavLink to="h" className={navLinkActive}>
          Xác thực thông tin
        </NavLink> */}
      </div>
      <div className="px-4 py-7">
        <Outlet/>
      </div>
    </>
  );
};

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileLayout />}>
        <Route path="" element={<PersonalInfo/>}/>
        <Route path="work-profile" element={<WorkExp/>}/>
        <Route path="portfolio" element={<Portfolio/>}/>
      </Route>
    </Routes>
  );
};

export default ProfileRoute;
