import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import welcomeSvg from "@/App/Assets/svg/freelance.svg";
import stonkSvg from "@/App/Assets/svg/stonk.svg";
import handshakeSvg from "@/App/Assets/svg/handshake.svg";

import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "@/App/Models/Job/Job";
import CurrencyInput from "react-currency-input-field";
import dayjs from "dayjs";
import { useGetFreelancersQuery } from "@/App/Models/Freelancer/Freelancer";

const LandingPage = () => {
  const navigate = useNavigate();

  const jobQuery = useGetJobsQuery({ pageNo: 1, pageSize: 3 });
  const freelancerQuery = useGetFreelancersQuery();

  const toAllJob = () => {
    navigate("all-jobs");
  };

  return (
    <>
      <div className="h-full mb-16">
        <div className="m-12 px-5s w-full flex">
          <div className="w-1/3 mt-10">
            <h1 className="pb-6 fvn-welcome-title text-blue-500">
              Make bright ideas happen
            </h1>
            <p className="pb-12 fvn-welcome-subtitle">
              Access global talent on the freelancer website trusted by over 1
              million businesses worldwide.
            </p>
            <button className="btn btn-outline btn-info">
              <a href="#browse-skill">Getting started</a>
            </button>
          </div>
          <div className="w-2/3">
            <img className="w-[800px]" src={welcomeSvg} alt="" />
          </div>
        </div>
      </div>
      <div className="mt-5 md:mx-7" id="browse-skill">
        <h1 className="font-bold text-4xl text-black font-nunito pb-2">
          Các công việc mới nhất
        </h1>
      </div>
      <div className="flex flex-wrap md:mx-7 mb-8">
        {jobQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="border-2 w-full rounded-lg">
            {jobQuery.data.data.map((job, idx) => (
              <div
                key={idx}
                className="job-card cursor-pointer"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="px-5">
                  <div className="overflow-hidden">
                    <h1 className="mb-1 text-2xl text-blue-600">{job.title}</h1>
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
                    <div>{job.offers} chào giá</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full justify-center mt-3">
          <div onClick={toAllJob} className="btn btn-info text-white">
            Xem tất cả công việc
          </div>
        </div>
      </div>
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-72" src={stonkSvg} alt="stonk" />
          </div>
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                Kết nối <b>nhanh chóng</b>, <br />
                <b>Rút ngắn thời gian</b> tìm nhân sự
              </h1>
            </div>
            <p className="w-[30rem] fvn-open-sans">
              FreelanceVN kết nối bạn với Freelancer/Cộng tác viên trên lãnh thổ
              Việt Nam và quốc tế. Công việc của bạn sẽ nhanh chóng được giải
              quyết với chất lượng cao.
            </p>
          </div>
        </div>
      </div>
      <div className="md:mx-7 pt-12 pb-16 my-10">
        <div className="pb-6 flex justify-between items-center">
          <h1 className="text-4xl text-black fvn-nunito font-bold ">
            Hồ sơ năng lực nổi bật
          </h1>
          <a className="text-blue-500 pl-1 fvn-open-sans tracking-wide" href="">
            Xem thêm >
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
              freelancerQuery.data.data.map((freelancer) => {
                return (
                  <SwiperSlide key={freelancer.id}>
                    <div className="card card-compact bg-base-100 shadow-md mb-4 w-full">
                      <figure>
                        <img
                          className="h-[220px] w-full object-cover"
                          src="https://placekitten.com/1200/1000"
                          alt=""
                        />
                      </figure>
                      <div className="inline-flex pl-4">
                        <div className="flex items-center avatar">
                          <div className="w-14 rounded-full mr-3">
                            <img src={freelancer.avatar} alt="" />
                          </div>
                        </div>
                        <div className="card-body">
                          <h2 className="card-title !text-lg truncate">
                            {freelancer.shortDescription}
                          </h2>
                          <p>{freelancer.name}</p>
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
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                Why businesses <br /> turn to <b>FreelanceVN</b>
              </h1>
            </div>
            <p className="w-[30rem] fvn-open-sans">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque,
              aut quo repellat animi illo perferendis adipisci temporibus
              accusamus, iure minima, explicabo mollitia. Quas amet voluptatem
              aspernatur quam repudiandae aperiam eius!
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <img className="w-96" src={handshakeSvg} alt="handskae" />
          </div>
        </div>
      </div>
      <div className="md:mx-7 bg-slate-100 py-16 rounded-md mb-4">
        <div className="container flex mx-auto p-5">
          <div className="w-1/2 flex justify-center">
            <img className="w-96" src={handshakeSvg} alt="handskae" />
          </div>
          <div className=" w-1/2">
            <div className="mt-16">
              <h1 className="text-4xl mt-2 mb-6 fvn-nunito text-black">
                Why businesses <br /> turn to <b>FreelanceVN</b>
              </h1>
            </div>
            <p className="w-[30rem] fvn-open-sans">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque,
              aut quo repellat animi illo perferendis adipisci temporibus
              accusamus, iure minima, explicabo mollitia. Quas amet voluptatem
              aspernatur quam repudiandae aperiam eius!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
