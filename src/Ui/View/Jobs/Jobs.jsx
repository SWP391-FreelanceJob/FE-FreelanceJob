import { getAllJobs } from "@/Api/Service/Job";
import { useGetJobsQuery } from "@/App/Models/Job/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";

import "./Jobs.css";

const Jobs = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("0");

  /**
   * @type {[IJob[],Function]}
   */
  const [loadedJobs, setLoadedJobs] = useState([{}]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  // useEffect(() => {
  //   loadInitialJobs();
  // }, []);

  const loadInitialJobs = async () => {
    setIsLoadingJobs(true);
    const result = await getAllJobs();
    console.log(result);
    setLoadedJobs(result.data);
    setIsLoadingJobs(false);
  };

  const navigate = useNavigate();
  const { data, error, isLoading } = useGetJobsQuery();

  const listOfJobs = [
    {
      name: "Làm trang web bán hàng",
      recruiter_name: "Di Di",
      price_from: "2.000.000",
      price_to: "3.500.000",
      offer_deadline: "3 ngày 23 giờ",
      description:
        "Yêu cầu: tối ưu hoá SEO, response time < 10ms, UI/UX hợp mắt, dễ sử dụng, có API cho bên thứ 3, Server Side Rendering, ưu tiên sử dụng NextJS ",
      skills: ["Javascript", "C#", "SQL"],
      offers: 23,
    },
    {
      name: "Phần mềm đăng ký tài khoản đa luồng trên giả lập LDplayer",
      recruiter_name: "Minh Huấn Lành",
      price_from: "8.000.000",
      price_to: "10.000.000",
      offer_deadline: "3 ngày 23 giờ",
      description:
        "Phần mềm có chức năng đăng ký tài khoản trên giả lập LDplayer - Có fake IP sử dụng dịch vụ có API tích hợp - Thuê số điện thoại, nhận OTP có API - Đăng ký tài khoản, xuất định dạng account theo yêu cầu.",
      skills: ["C#", "Python"],
      offers: 2,
    },
    {
      name: "Phần mềm đăng ký tài khoản đa luồng trên giả lập LDplayer",
      recruiter_name: "Minh Huấn Lành",
      price_from: "8.000.000",
      price_to: "10.000.000",
      offer_deadline: "3 ngày 23 giờ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugiat aperiam quos quasi accusantium sapiente praesentium iure quidem odit laudantium beatae voluptatibus fugit obcaecati autem voluptas, perferendis excepturi impedit temporibus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quo neque cum aliquam, iusto provident quae porro repellendus qui quas eligendi consectetur iste labore, dolor aliquid dolorem ducimus obcaecati. Magnam.",
      skills: ["C#", "Python"],
      offers: 2,
    },
  ];

  const listOfSkills = [
    "Java",
    "C# & .NET",
    "SQL",
    "Flutter",
    "iOS",
    "Android",
    "Python",
  ];

  const listOfStatus = [
    { status: "Nhận chào giá", value: "0" },
    { status: "Đã hoàn thành", value: "1" },
    { status: "Chưa xác thực", value: "2" },
  ];

  const checkedBox = () => {
    setIsChecked(!isChecked);
  };

  const onSelectStatus = (event) => {
    const val = event.target.value;
    setSelectedStatus(val);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="flex lg:mx-0 mx-7 gap-x-7">
          <div className="w-1/5 flex flex-col gap-y-4">
            <div className="card filter-shadow">
              <div className="p-4">
                <h1 className="text-xl font-semibold">Kỹ năng</h1>
                <div className="form-control">
                  {listOfSkills.map((skill, idx) => (
                    <label key={idx} className="label cursor-pointer">
                      <span className="label-text">{skill}</span>
                      <input
                        type="checkbox"
                        readOnly
                        className="checkbox checkbox-accent"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="card filter-shadow">
              <div className="p-4">
                <h1 className="text-xl font-semibold">Trạng thái</h1>
                {listOfStatus.map((stt, idx) => (
                  <div key={idx} className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">{stt.status}</span>
                      <input
                        type="radio"
                        name="stt"
                        value={stt.value}
                        checked={stt.value === selectedStatus}
                        readOnly
                        className="radio radio-accent"
                        onClick={onSelectStatus}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-4/5 flex flex-col gap-2">
            <div className="">
              <div className="!border-b-slate-200 cursor-default">
                <p className="font-semibold text-2xl">Tất cả công việc</p>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Tìm các công việc...."
                className="input input-bordered tracking-wider w-full"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full border-2 rounded-lg">
              {data.map((job, idx) => (
                <div
                  key={idx}
                  className="job-card cursor-pointer"
                  onClick={() => navigate("/job/1")}
                >
                  <div className="px-5">
                    <div className="overflow-hidden">
                      <h1 className="mb-1 text-2xl text-blue-600">
                        {job.title}
                      </h1>
                      <p className="text-sm">{job.recruiter_name}</p>
                    </div>
                    <div className="mt-5 mb-3 flex justify-between bg-slate-100">
                      <div className="p-2">
                        {/* {job.price_from} đ - {job.price_to} đ */}
                        <span className="w-min">
                          <CurrencyInput
                          className="w-min bg-slate-100"
                          prefix="VND "
                            allowNegativeValue={false}
                            disabled
                            defaultValue={job.price}
                          />
                        </span>
                      </div>
                      <div className="p-2">
                        Hạn nhận hồ sơ: {dayjs(job.duration).format('DD/MM/YYYY').toString()}
                      </div>
                    </div>
                    <div className="mb-3 text-desc">{job.description}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {_.isNil(job.skills) ? (
                          <span></span>
                        ) : (
                          job.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="badge badge-success text-white"
                            >
                              {skill.skillName}
                            </div>
                            // <div>{skill.skillName}</div>
                          ))
                        )}
                      </div>
                      <div>{job.offers} chào giá</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
