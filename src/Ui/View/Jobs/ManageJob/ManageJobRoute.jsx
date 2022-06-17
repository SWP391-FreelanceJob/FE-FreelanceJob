import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";

const ManageJobLayout = () => {
  const navLinkActive = ({ isActive }) => {
    const active = isActive ? " tab-active" : "";
    return "tab tab-lg tab-lifted" + active;
  };

  return (
    <>
      <div className="tabs bg-slate-50 rounded-md justify-center">
        <NavLink to="offering" className={navLinkActive}>
          Việc đã đăng
        </NavLink>
        <NavLink to="doing" className={navLinkActive}>
          Việc đang làm
        </NavLink>
        <NavLink to="done" className={navLinkActive}>
          Việc đã xong
        </NavLink>
      </div>
      <div className="px-4 py-7">
        <Outlet />
      </div>
    </>
  );
};

const ManageJobRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ManageJobLayout />}>
        <Route path="" element={<Navigate to="offering"/>} />
        <Route path="offering" element={<div />} />
        <Route path="doing" element={<div />} />
        <Route path="done" element={<div />} />
      </Route>
    </Routes>
  );
};

export default ManageJobRoute;
