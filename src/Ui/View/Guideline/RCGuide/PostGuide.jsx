import CustomNavbar from "@/Ui/Components/CustomNavbar/CustomNavbar";
import CustomFooter from "@/Ui/Components/CustomFooter/CustomFooter";
import { Outlet } from "react-router-dom";

import postSvg from "@/App/Assets/svg/post.svg"
import postPostSvg from "@/App/Assets/svg/postPost.svg"
import postFillSvg from "@/App/Assets/svg/postFill.svg"
import postUploadSvg from "@/App/Assets/svg/postUpload.svg"

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
                                ĐĂNG VIỆC
                            </h1>
                            <p className="pb-12 fvn-welcome-subtitle">
                                Đăng việc tại FreelanceVN rất nhanh chóng và đơn giản.
                            </p>
                        </div>
                        <div className="w-2/3 ml-20">
                            <img className="w-[800px]" src={postSvg} alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center mt-3">
                    <div className="text-4xl mt-2 mb-6 fvn-nunito text-black"><b>Hướng dẫn khách hàng đăng việc</b></div>
                </div>
                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 1</span> Vào mục đăng việc
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={postPostSvg} alt="handskae" />
                            </div>
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Bấm vào nút <b>Đăng việc</b> hiện thị trên thanh Menu</p>
                                    <br/>
                                    <p>Mẫu đăng việc của FreelanceVN đã sẵn sàng để bạn sử dụng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 2</span> Điền thông tin
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-2xl mt-2 mb-6 fvn-nunito text-black">
                                        <p>Sau khi vào mục <b>Đăng việc</b>, bạn sẽ thấy mẫu để điền thông tin.</p>
                                        <p>Hãy điền đầy đủ thông tin yêu cầu, mô cả công việc của bạn vào mẫu chúng tôi cung cấp</p>
                                        <p>Chọn ngân sách cho công việc và thêm yêu cầu kỹ năng.</p>
                                    </h1>
                                </div>
                                <div className="mt-5 text-l">
                                    <b><p>Gợi ý của FreelanceVN:</p></b>
                                    <p>- Viết tên việc ngắn gọn</p>
                                    <p>- Mô tả rõ ràng</p>
                                    <p>- Thêm kỹ năng</p>
                                    <p>- Chọn ngân sách hấp dẫn</p>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={postFillSvg} alt="handskae" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="text-white w-50 h-50 rounded-lg bg-blue-600">Bước 3</span> Đăng việc lên FreelanceVN
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={postUploadSvg} alt="handskae" />
                            </div>
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Sau khi hoàn tất các bước ở trên bạn hãy bấm vào nút <b>Đăng việc</b>.</p>
                                    <br/>
                                    <p>Nếu có nhu cầu chỉnh sửa sau khi đăng việc, bạn có thể bấm vào nút <b>Chỉnh sửa</b>.</p>
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
