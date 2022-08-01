import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import defaultAvatar from "@/App/Assets/png/default.webp";
import welcomeSvg from "@/App/Assets/svg/freelance.svg";
import fastSvg from "@/App/Assets/svg/fast.svg";
import feedbackSvg from "@/App/Assets/svg/feedback.svg";
import convenientSvg from "@/App/Assets/svg/convenient.svg";
import loginSvg from "@/App/Assets/svg/login.svg";
import loginsucSvg from "@/App/Assets/svg/loginsuc.svg";
import recruiterSvg from "@/App/Assets/svg/recruiter.svg";
import freelancerSvg from "@/App/Assets/svg/freelancer.svg";
import middlemanSvg from "@/App/Assets/svg/middleman.svg";

import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "@/App/Models/Job/Job";
import CurrencyInput from "react-currency-input-field";
import dayjs from "dayjs";
import { useGetFreelancersQuery } from "@/App/Models/Freelancer/Freelancer";

const LandingPage = () => {
  const navigate = useNavigate();

  const jobQuery = useGetJobsQuery({ pageNo: 1, pageSize: 3, status: "PUBLISHED" });
  const freelancerQuery = useGetFreelancersQuery({});

  const toAllJob = () => {
    navigate("all-jobs");
  };

  return (
    <>
      <div className="h-full mb-16">
        <div className="m-12 px-5s w-full flex">
          <div className="w-1/3 mt-10">
            <h1 className="pb-6 fvn-welcome-title text-blue-500">
              Kết nối công việc
            </h1>
            <p className="pb-12 fvn-welcome-subtitle">
              Nơi tìm kiếm những công việc, những ứng cử viên tài năng giúp bạn
              xử lý mọi vấn đề.
            </p>
            <button className="btn btn-outline btn-info">
              <a href="#browse-skill">Bắt đầu</a>
            </button>
          </div>
          <div className="w-2/3">
            <img className="w-[800px]" src={welcomeSvg} alt="" />
          </div>
        </div>
      </div>
      <div className="mt-5 md:mx-7" id="browse-skill">
        <h1 className="font-bold text-4xl text-black font-nunito pb-2">
          Danh sách các công việc
        </h1>
      </div>
      <div className="flex flex-wrap md:mx-7 mb-8">
        {jobQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          jobQuery.data && (
            <div className="border-2 w-full rounded-lg">
              {jobQuery.data.data.map((job, idx) => (
                <div
                  key={idx}
                  className="job-card cursor-pointer"
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  <div className="px-5">
                    <div className="overflow-hidden">
                      <h1 className="mb-1 text-2xl text-blue-600">
                        {job.title}
                      </h1>
                      <p className="text-sm">{job.recruiterName}</p>
                    </div>
                    <div className="mt-5 mb-3 flex justify-between bg-slate-100">
                      <div className="p-2">
                        <CurrencyInput
                          className="w-min bg-slate-100"
                          prefix="VND "
                          allowNegativeValue={false}
                          disabled
                          defaultValue={job.price}
                        />
                      </div>
                      <div className="p-2">
                        Hạn nhận hồ sơ:{" "}
                        {dayjs(job.duration).format("DD/MM/YYYY").toString()}
                      </div>
                    </div>
                    <div className="mb-3 text-desc">{job.description}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {job.skills.map((skill) => (
                          <div
                            key={skill.skillId}
                            className="badge badge-success text-white"
                          >
                            {skill.skillName}
                          </div>
                        ))}
                      </div>
                      {/* <div>{job.offers} chào giá</div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
        <div className="flex w-full justify-center mt-3">
          <div onClick={toAllJob} className="btn btn-info text-white">
            Xem tất cả công việc
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-3">
        <div className="text-4xl mt-2 mb-6 fvn-nunito text-black">
          <b>Giới thiệu về chúng tôi</b>
        </div>
      </div>
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-80" src={fastSvg} alt="stonk" />
          </div>
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                Kết nối <b>nhanh chóng</b>, <br />
                <b>Rút ngắn thời gian</b> tìm nhân sự
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              FreelanceVN kết nối bạn với Freelancer/Cộng tác viên trên lãnh thổ
              Việt Nam và quốc tế. Công việc của bạn sẽ nhanh chóng được giải
              quyết với chất lượng cao.
            </p>
          </div>
        </div>
      </div>

      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className=" w-1/2 ml-10">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                Tìm việc <b>dễ dàng, nhanh chóng</b>
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              Đến với FreelanceVN bạn sẽ tìm được vô vàn những công việc thú vị.
              Chúng tôi đem đến cho bạn những công việc dựa trên kỹ năng, sở
              thích phù hợp với từng cá nhân, đối tượng.
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <img className="w-72 scale-150" src={convenientSvg} alt="stonk" />
          </div>
        </div>
      </div>
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-72 scale-150" src={feedbackSvg} alt="stonk" />
          </div>
          <div className=" w-1/2 ml-10">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                Bảo mật <b>thông tin cá nhân</b>, <br />
                của từng khách hàng
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              Khách hàng có thể đánh giá Freelancer sau khi hoàn thành công
              việc. Điều này có ảnh hưởng đến sự uy tín của Freelancer. Thông
              tin cá nhân và công việc của bạn luôn được bảo mật theo chính sách
              bảo mật của FreelanceVN
            </p>
          </div>
        </div>
      </div>

      <div className="md:mx-7 pt-12 pb-16 my-10">
        <div className="pb-6 flex justify-between items-center">
          <h1 className="text-4xl text-black fvn-nunito font-bold ">
            Danh sách Freelancer
          </h1>
          <a
            className="text-blue-500 pl-1 fvn-open-sans tracking-wide"
            href="/all-freelancers"
          >
            Xem thêm &gt;
          </a>
        </div>
        <div className="carousel w-full">
          <Swiper
            className="!px-7"
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {freelancerQuery.isLoading ? (
              <div>Loading...</div>
            ) : (
              freelancerQuery.data &&
              freelancerQuery.data.data.map((freelancer) => {
                return (
                  <SwiperSlide key={freelancer.id}>
                    <div
                      className="card card-compact bg-base-100 shadow-md mb-4 w-full"
                      onClick={() => navigate(`/profile/${freelancer.id}`)}
                    >
                      <figure>
                        <img
                          className="h-[220px] w-full object-cover"
                          src={freelancer.avatar ?? defaultAvatar}
                          alt=""
                        />
                      </figure>
                      <div className="inline-flex pl-4">
                        {/* <div className="flex items-center avatar">
                          <div className="w-14 rounded-full mr-3">
                            <img src="https://placekitten.com/1200/1000" alt="" />
                          </div>
                        </div> */}
                        <div className="card-body">
                          <h2 className="card-title !text-lg truncate">
                            {freelancer.name}
                          </h2>
                          {/* <p>{freelancer.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      </div>

      <div className="flex w-full justify-center mt-3">
        <div className="text-4xl mt-2 mb-6 fvn-nunito text-black">
          <b>Quy trình hoạt động</b>
        </div>
      </div>
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-96" src={loginsucSvg} alt="handskae" />
          </div>
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                <b>Chào mừng</b>
                <br />
                bạn đến với <b>FreelanceVN</b>
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              Đội ngũ FreelanceVN rất hân hạnh vì bạn đã truy cập, tìm kiếm đến
              chúng tôi. Hãy đăng nhập để sử dụng thêm những tính năng nâng cao,
              mở rộng nhé.
            </p>
          </div>
        </div>
      </div>
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                <b>Đăng nhập</b> vào tài khoản
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              Sau khi truy cập thành công vào FreelanceVN. Để sử dụng thêm những
              tính năng hữu ích, nâng cao bạn cần phải truy cập vào hệ thống của
              chúng tôi thông qua tài khoản nội bộ của Đại Học FPT.
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <img className="w-80 scale-125" src={loginSvg} alt="handskae" />
          </div>
        </div>
      </div>

      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-80 scale-150" src={recruiterSvg} alt="handskae" />
          </div>
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                <b>Đăng tuyển</b> công việc
                <br />
                Tìm kiếm <b>Freelancer</b>
              </h1>
            </div>
            <p className="w-[30rem] text-l fvn-open-sans">
              Đối với những người đang tìm kiếm nhân lực để xử lý công việc hoặc
              một tác vụ nào đó. Bạn có thể tìm kiếm những Freelancer nằm trong
              hệ thống FreelanceVN. Hoặc đăng tuyển công việc của mình kèm theo
              những yêu cầu về kỹ năng, mô tả công việc để có thể
            </p>
          </div>
        </div>
      </div>

      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                <b>Tìm kiếm</b> công việc
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              Nếu là một Freelancer đang tìm kiếm một công việc phù hợp với kỹ
              năng, sở thích cá nhân. Bạn có thể tìm kiếm những bài đăng tuyển
              việc làm từ nhiều nhà tuyển dụng.
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <img
              className="w-80 scale-150"
              src={freelancerSvg}
              alt="handskae"
            />
          </div>
        </div>
      </div>

      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-80 scale-150" src={middlemanSvg} alt="handskae" />
          </div>
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                <b>Cầu nối</b> Freelancer
                <br />
                và nhà tuyển dụng
              </h1>
            </div>
            <p className="w-[30rem] text-xl fvn-open-sans">
              Chúng tôi sẽ là người trung gian đứng ra để kết nối Freelancer và
              nhà tuyển dụng. Đảm bảo thông tin cá nhân của từng khách hàng sẽ
              được bảo mật tuyệt đối. Cam kết đem đến những dịch vụ tốt nhất cho
              khách hàng.
            </p>
          </div>
        </div>
      </div>

      <input type="checkbox" id="sign-up-modal" className="modal-toggle" />
      <label htmlFor="sign-up-modal" className="modal cursor-pointer">
        <label className="modal-box relative flex flex-col items-center">
          <h1 className="text-2xl font-bold">Đăng ký tài khoản FreelanceVN</h1>
          <div className="py-4">
            <div className="btn btn-info text-white">
              Fake Sign In With Google
            </div>
          </div>
        </label>
      </label>
      <input type="checkbox" id="sign-in-modal" className="modal-toggle" />
      <label htmlFor="sign-in-modal" className="modal cursor-pointer">
        <label className="modal-box relative flex flex-col items-center">
          <h1 className="text-2xl font-bold">Đăng nhập vào FreelanceVN</h1>
          <div className="py-4">
            <div className="btn btn-info text-white">
              Fake Sign In With Google
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default LandingPage;
