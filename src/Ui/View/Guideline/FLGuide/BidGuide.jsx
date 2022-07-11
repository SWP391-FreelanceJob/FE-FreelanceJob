

import bidSvg from "@/App/Assets/svg/bid.svg"
import bidLoginSvg from "@/App/Assets/svg/bidLogin.svg"
import bidReadSvg from "@/App/Assets/svg/bidRead.svg"
import bidPriceSvg from "@/App/Assets/svg/bidPrice.svg"
import bidAskSvg from "@/App/Assets/svg/bidAsk.svg"

import "./BidGuide.css";

const BidGuide = () => {
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
                                CHÀO GIÁ DỰ ÁN
                            </h1>
                            <p className="pb-12 fvn-welcome-subtitle">
                                Chào giá chuyên nghiệp sẽ giúp Freelancer thu hút được sự chú ý của khách hàng.
                            </p>
                        </div>
                        <div className="w-2/3 ml-20">
                            <img className="w-[800px]" src={bidSvg} alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center mt-3">
                    <div className="text-4xl mt-2 mb-6 fvn-nunito text-black"><b>Hướng dẫn chào giá dự án</b></div>
                </div>
                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-2 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 1</span> Đăng nhập
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={bidLoginSvg} alt="handskae" />
                            </div>
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
                        </div>
                    </div>
                </div>


                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-2 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 2</span> Đọc, hiểu yêu cầu công việc
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-2xl mt-2 mb-6 fvn-nunito text-black">
                                        <p>Hãy đọc kỹ dự án để nắm được các thông tin cơ bản và hiểu được yêu cầu khách hàng</p>
                                    </h1>
                                </div>
                                <div className="mt-5 text-l">
                                    <b><p>Gợi ý của FreelanceVN:</p></b>
                                    <p>- Liệt kê những câu hỏi liên quan mà bạn cần khách hàng giải đáp để làm sáng tỏ thêm về công việc.</p>
                                    <p>- Những câu hỏi đúng vừa giúp bạn nhận được những phản hồi đúng từ khách hàng,
                                    đồng thời họ cũng sẽ biết bạn đã hiểu rõ yêu cầu và phạm vi công việc.</p>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={bidReadSvg} alt="handskae" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-2 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 3</span> Đề xuất chi phí
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={bidPriceSvg} alt="handskae" />
                            </div>
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-2xl mt-2 mb-6 fvn-nunito text-black">
                                        <p>Hãy đề xuất với khách hàng mức phí để thực hiện công việc bằng cách điền vào mục thông tin</p>
                                    </h1>
                                </div>
                                <div className="mt-5 text-l">
                                    <b><p>Gợi ý của FreelanceVN:</p></b>
                                    <p>- Lựa chọn chi phí dựa trên kinh nghiệm của bạn.</p>
                                    <p>- Tham khảo chi phí của những dự án tương tự trên FreelanceVN.</p>
                                    <p>- Với dự án chưa có đủ thông tin để báo giá, hãy chủ động đề nghị khách hàng cung cấp thêm thông
                                    tin bạn cần.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-2 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 4</span> Dự kiến thời gian hoàn thành
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-2xl mt-2 mb-6 fvn-nunito text-black">
                                        <p>Bạn có thể hoàn thành việc này trong mấy ngày? Hãy cho khách hàng biết điều đó trong mục thông tin.</p>
                                    </h1>
                                </div>
                                <div className="mt-5 text-l">
                                    <b><p>Gợi ý của FreelanceVN:</p></b>
                                    <p>- Thời gian bạn chọn chỉ là dự kiến, hãy chủ động trao đổi với khách hàng nếu bạn cần thêm thời gian.</p>
                                    <p>- Khách hàng muốn công việc phải được hoàn thành đúng thời hạn với chất lượng tốt, vì thế
                                    bạn hãy cam kết điều đó để khách hàng thêm tin tưởng.</p>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={bidReadSvg} alt="handskae" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:mx-7 pt-3 pb-3 my-10">
                    <div className="pb-6 flex justify-between items-center">
                        <h1 className="text-4xl text-blue-600 fvn-nunito font-bold  ">
                            <span className="px-4 text-white w-50 h-50 rounded-lg bg-blue-600">Bước 5</span> Chú ý cách trình bày nội dung chào giá
                        </h1>
                    </div>
                    <div className="text-xl rounded-md mb-4">
                        <div className="container flex mx-auto p-5">
                            <div className="w-1/2 flex justify-center">
                                <img className="w-96" src={bidAskSvg} alt="handskae" />
                            </div>
                            <div className=" w-1/2">
                                <div className="mt-16">
                                    <h1 className="text-2xl mt-2 mb-6 fvn-nunito text-black">
                                        <p>Hãy viết đoạn văn dễ đọc, các đoạn vừa phải và nên ngắt dòng hợp lý.</p>
                                        <p>Kiểm tra một lượt các thông tin đã điền, sau đó bấm nút Gửi chào giá để chào giá của bạn
                                        được gửi tới khách hàng</p>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>


    );
};

export default BidGuide;
