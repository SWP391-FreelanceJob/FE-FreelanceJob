import CustomNavbar from "@/Ui/Components/CustomNavbar/CustomNavbar";
import CustomFooter from "@/Ui/Components/CustomFooter/CustomFooter";
import { Outlet } from "react-router-dom";

import topupSvg from "@/App/Assets/svg/topup.svg"
import securitySvg from "@/App/Assets/svg/security.svg"
import loginsucSvg from "@/App/Assets/svg/loginsuc.svg"

import "./TopupGuide.css";

const TopupGuide = () => {
    return (
        <div className="overflow-hidden min-h-screen">
            <CustomNavbar />
            <div className="max-w-[1400px] mx-auto mb-10 mt-12 relative">
                <div className="mx-7 2xl:mx-0">
                    <Outlet />
                </div>
                <div className="h-full mb-16">
                    <div className="m-12 px-5s w-full flex">
                        <div className="w-1/3 mt-40">
                            <h1 className="pb-6 fvn-welcome-title text-blue-500">
                                TOP-UP
                            </h1>
                            <p className="pb-12 fvn-welcome-subtitle">
                                Khách hàng có thể sủ dụng credit cho các dịch vụ bổ sung trên FreelanceVN.
                            </p>
                        </div>
                        <div className="w-2/3">
                            <img className="w-[800px]" src={topupSvg} alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center mt-3">
                    <div className="text-4xl mt-2 mb-6 fvn-nunito text-black"><b>Hướng dẫn nạp tiền</b></div>
                </div>
                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 1</span> Đăng nhập
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={securitySvg} alt="handskae" />
                            </div>
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                        <b>Đăng nhập</b> thành công
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Để sử dụng những dịch vụ bổ sung như:<b> Chào giá, đăng Chào giá nổi bật, đăng Hồ sơ
                                        Freelancer nổi bật, v.v...</b></p>
                                    <br/>
                                    <p>Khách hàng cần phải đăng nhập vào hệ thống để thực hiện giao dịch.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 2</span> Thanh toán
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={loginsucSvg} alt="handskae" />
                            </div>
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                        <b>Chọn</b> hình thức thanh toán
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>FreelanceVN cung cấp cho khách hàng những hình thức thanh toán tiện lợi, nhanh chóng.</p>
                                    <br/>
                                    <p>Chúng tôi hỗ trợ thanh toán thông qua những ví điện tử, thể quốc tế, nội địa.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </div>


    );
};

export default TopupGuide;
