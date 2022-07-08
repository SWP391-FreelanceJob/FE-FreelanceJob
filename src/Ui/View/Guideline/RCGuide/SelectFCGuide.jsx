import CustomNavbar from "@/Ui/Components/CustomNavbar/CustomNavbar";
import CustomFooter from "@/Ui/Components/CustomFooter/CustomFooter";
import { Outlet } from "react-router-dom";

import selectFCSvg from "@/App/Assets/svg/selectFC.svg"
import selectFCListSvg from "@/App/Assets/svg/selectFCList.svg"
import selectFCChatSvg from "@/App/Assets/svg/selectFCChat.svg"
import selectFCInviteSvg from "@/App/Assets/svg/selectFCInvite.svg"

import "./ContactGuide.css";

const SelectFCGuide = () => {
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
                                CHỌN FREELANCER
                            </h1>
                            <p className="pb-12 fvn-welcome-subtitle">
                                Những gợi ý sau đây của FreelanceVN sẽ giúp bạn chọn Freelancer một cách dễ dàng.
                            </p>
                        </div>
                        <div className="w-2/3 ml-20">
                            <img className="w-[800px]" src={selectFCSvg} alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center mt-3">
                    <div className="text-4xl mt-2 mb-6 fvn-nunito text-black"><b>Hướng dẫn khách hàng chọn Freelancer</b></div>
                </div>
                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 1</span> Xém xét các chào giá mà bạn nhận được
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={selectFCListSvg} alt="handskae" />
                            </div>
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Đầu tiên bạn vào <b>Góc làm việc</b>, sau đó chọn tên dự án của bạn</p>
                                    <br/>
                                    <p>Hãy xem một lượt những chào giá mà nhận được và chọn lọc các ứng viên tiềm năng nhất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 2</span> Nhắn tin để trao đổi thêm
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Dùng chức năng <b>Nhắn tin</b> để liên hệ và trao đổi với những Freelancer mà bạn thấy tiềm năng.</p>
                                    <br/>
                                    <p>Việc trao đổi này sẽ giúp Freelancer hiểu yêu cầu của bạn hơn và giúp bạn tìm ra được Freelancer phù hợp nhất.</p>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={selectFCChatSvg} alt="handskae" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 3</span> Giao việc cho người phù hợp
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={selectFCInviteSvg} alt="handskae" />
                            </div>
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Khi đã quyết định chọn Freelancer nào, bạn bấm nút <b>Giao việc</b> trên chào giá của Freelancer đó.</p>
                                    <br/>
                                    <p>Nếu bạn chưa ưng ý với những Freelancer đã chào giá, bạn có thể chủ động từ chối
                                        hoặc <b>Mời Freelancer</b> khác tham gia.</p>
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

export default SelectFCGuide;
