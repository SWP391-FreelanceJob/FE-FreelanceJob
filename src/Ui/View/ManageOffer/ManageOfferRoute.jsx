import { useGetOffersByFreelancerIdQuery } from "@/App/Models/Offer/Offer";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import AcceptedOffer from "./AcceptedOffer";
import OfferingOffer from "./OfferingJob";
import RejectedOffer from "./RejectedOffer";

const ManageOfferLayout = () => {
  const navLinkActive = ({ isActive }) => {
    const active = isActive ? " tab-active" : "";
    return "tab tab-lg tab-lifted" + active;
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Quản lý chào giá</h1>
      <div className="tabs bg-slate-50 rounded-md justify-center">
        <NavLink to="offering" className={navLinkActive}>
          Chào giá đã gửi
        </NavLink>
        <NavLink to="accepted" className={navLinkActive}>
          Chào giá được chấp nhận
        </NavLink>
        <NavLink to="rejected" className={navLinkActive}>
          Chào giá bị từ chối
        </NavLink>
      </div>
      <div className="px-4 py-7">
        <Outlet/>
      </div>
    </>
  );
};

const ManageOfferRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ManageOfferLayout/>}>
        <Route path="" element={<Navigate to="offering" />} />
        <Route path="offering" element={<OfferingOffer />} />
        <Route path="accepted" element={<AcceptedOffer />} />
        <Route path="rejected" element={<RejectedOffer />} />
      </Route>
    </Routes>
  );
};

export default ManageOfferRoute;
