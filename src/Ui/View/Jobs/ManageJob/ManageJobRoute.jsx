import { useGetJobByRecruiterIdQuery, useGetJobsQuery } from "@/App/Models/Job/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import AcceptedJob from "./AcceptedJob";
import DoneJob from "./DoneJob";
import PublishedJob from "./PublishedJob";

const ManageJobLayout = ({ publishedJobs, acceptedJobs, doneJobs }) => {
  
  const navLinkActive = ({ isActive }) => {
    const active = isActive ? " tab-active" : "";
    return "tab tab-lg tab-lifted" + active;
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Quản lý việc làm</h1>
      <div className="tabs bg-slate-50 rounded-md justify-center">
        <NavLink to="published" className={navLinkActive}>
          Việc đã đăng
        </NavLink>
        <NavLink to="accepted" className={navLinkActive}>
          Việc đang làm
        </NavLink>
        <NavLink to="done" className={navLinkActive}>
          Việc đã xong
        </NavLink>
      </div>
      <div className="px-4 py-7">
        <Outlet context={[publishedJobs, acceptedJobs, doneJobs]} />
      </div>
    </>
  );
};

const ManageJobRoute = () => {
  const userInfo = useSelector(state => state.user);
  const jobQuery = useGetJobByRecruiterIdQuery(userInfo.userId);
  return jobQuery.isLoading ? (
    <LoadingOverlay />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <ManageJobLayout
            publishedJobs={jobQuery.data.filter((e) => e.jobStatus === 0)}
            acceptedJobs={jobQuery.data.filter((e) => e.jobStatus === 1)}
            doneJobs={jobQuery.data.filter((e) => e.jobStatus === 2)}
          />
        }
      >
        <Route path="" element={<Navigate to="published" />} />
        <Route path="published" element={<PublishedJob />} />
        <Route path="accepted" element={<AcceptedJob />} />
        <Route path="done" element={<DoneJob />} />
      </Route>
    </Routes>
  );
};

export default ManageJobRoute;
