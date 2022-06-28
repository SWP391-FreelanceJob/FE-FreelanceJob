import CustomNavbar from "./CustomNavbar/CustomNavbar";
import CustomFooter from "./CustomFooter/CustomFooter";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const MasterPage = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      <div className="overflow-hidden min-h-screen relative">
        <CustomNavbar />
        <div className="max-w-[1400px] mx-auto mb-10 mt-12 relative">
          <div className="mx-7 2xl:mx-0">
            <Outlet />
          </div>
          {/* <div className="fixed bottom-0 right-0">
            <div className="flex justify-end h-96 w-auto z-40 mx-3">
              <div className="chat-box">
                <div className="chat-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex avatar">
                        <div className="w-10 rounded-full mr-3">
                          <img
                            src="https://cdn.donmai.us/sample/ea/ab/__nakiri_ayame_hololive_drawn_by_haruhitooo__sample-eaab4cd56f2a051c2dd1b32d606f2aa8.jpg"
                            alt="chat-avatar"
                          />
                        </div>
                      </div>
                      <p className="chat-username">Ayame</p>
                    </div>
                    <div className="flex chat-min-close">
                      <i className="bi bi-dash"></i>
                      <i className="bi bi-x"></i>
                    </div>
                  </div>
                </div>
                <div className="chat-container">
                  <div className="chat">
                    <div className="chat-detail">A</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">B</div>
            </div>
          </div> */}
        </div>
        <CustomFooter />
      </div>
      {isLoading && (
        <div className="bg-slate-100 absolute top-0 right-0 left-0 mx-auto w-full h-full opacity-80">
          <div className="loadingio-spinner-rolling-fvn absolute top-80 right-0 left-0 mx-auto">
            <div className="fvn-spinner">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasterPage;
