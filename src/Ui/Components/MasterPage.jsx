import CustomNavbar from "./CustomNavbar/CustomNavbar";
import CustomFooter from "./CustomFooter/CustomFooter";
import { Outlet } from "react-router-dom";

const MasterPage = () => {
  return (
    <div className="overflow-hidden min-h-screen">
      <CustomNavbar />
      <div className="max-w-[1400px] mx-auto mb-10 mt-12 relative">
        <div className="mx-7 2xl:mx-0">
          <Outlet />
        </div>
        <div className="fixed bottom-0 right-0">
          <div className="flex justify-end h-96 w-auto z-40">
            <div className="flex flex-col justify-end">
              
            </div>
            
          </div>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};

export default MasterPage;
