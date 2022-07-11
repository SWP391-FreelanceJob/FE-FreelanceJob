

import contactSvg from "@/App/Assets/svg/contact.svg"
import contactSearchSvg from "@/App/Assets/svg/contactSearch.svg"
import contactListSvg from "@/App/Assets/svg/contactList.svg"

import "./ContactGuide.css";
import bidLoginSvg from "@/App/Assets/svg/bidLogin.svg";

const ContactGuide = () => {
    return (
        <div className="overflow-hidden min-h-screen">
            <div className="max-w-[1400px] mx-auto mb-10 mt-12 relative">
                {/*<div className="mx-7 2xl:mx-0">*/}
                {/*    <Outlet />*/}
                {/*</div>*/}
                <div className="h-full mb-16">
                    <div className="m-12 px-5s w-full flex">
                        <div className="w-1/3 mt-40">
                            <h1 className="pb-6 fvn-welcome-title text-blue-500">
                                LIÊN HỆ
                            </h1>
                            <p className="pb-12 fvn-welcome-subtitle">
                                Các bước thực hiện để liên hệ trực tiếp với Freelancer mà bạn muốn.
                            </p>
                        </div>
                        <div className="w-2/3 ml-20">
                            <img className="w-[800px]" src={contactSvg} alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center mt-3">
                    <div className="text-4xl mt-2 mb-6 fvn-nunito text-black"><b>Hướng dẫn khách hàng liên hệ trực tiếp</b></div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-2 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 1</span> Đăng nhập
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                        <b>Đăng nhập</b> thành công
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Để sử dụng những dịch vụ bổ sung như:<b> Nạp tiền, Chào giá, v.v...</b></p>
                                    <br/>
                                    <p>Khách hàng cần phải đăng nhập vào hệ thống để thực hiện giao dịch.</p>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={bidLoginSvg} alt="handskae" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-5 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 2</span> Vào mục tìm Freelancer
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={contactSearchSvg} alt="handskae" />
                            </div>
                            <div className="w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                        <p>Truy cập vào trang chủ</p>
                                    </h1>
                                </div>
                                <div className="mt-5 text-2xl">
                                    <p>Bấm vào nút <b>Tìm Freelancer</b> hiển thị trên thanh Menu.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-5 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 3</span> Danh sách các ứng viên
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                                    </h1>
                                </div>
                                <div className="mt-5 text-l">
                                    <p>Khi vào mục <b>Tìm Freelancer</b>, bạn sẽ thấy danh sách các Freelancer được liệt kê ra.</p>
                                    <br/>
                                    <p>Bấm vào Freelancer mà bạn muốn liên hệ, sau đó bấm nút <b>Liên hệ trực tiếp</b>.</p>
                                    <br/>
                                    <p>Tiếp theo, bấm vào nút <b>Liên hệ ngay</b> để xác nhận yêu cầu của bạn.</p>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={contactListSvg} alt="handskae" />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>


    );
};

export default ContactGuide;
