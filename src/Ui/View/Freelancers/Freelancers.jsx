import { useGetFreelancersQuery } from "@/App/Models/Freelancer/Freelancer";
import { useGetSkillsQuery } from "@/App/Models/Skill/Skill";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import CustomRating from "@/Ui/Components/Rating/ReadOnlyRating";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import { getAllFreelancers } from "../../../Api/Service/Freelancer/index";

import "./Freelancers.css";

const Freelancers = () => {
  const listOfStatus = [
    { status: "Tất cả", value: "0" },
    { status: "Đã xác thực", value: "1" },
    { status: "Chưa xác thực", value: "2" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("0");
  /**
   * @type {[IFreelancer[],Function]} loadedFreelancer
   */
  const [loadedFreelancers, setLoadedFreelancers] = useState([{}]);

  const [isLoadingFreelancers, setIsLoadingFreelancers] = useState(true);

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetFreelancersQuery();
  // const {data: skillData, error: skillError, isLoading: isLoadingSkill} = useGetSkillsQuery();
  // const skillQuery = useGetSkillsQuery("",{selectFromResult: (data) => console.log(data)});
  const skillQuery = useGetSkillsQuery();

  // useEffect(() => {
  //   loadInitialFreelancers();
  // }, []);

  const loadInitialFreelancers = async () => {
    setIsLoadingFreelancers(true);
    const result = await getAllFreelancers();
    setLoadedFreelancers(result);
    setIsLoadingFreelancers(false);
  };

  const listOfJobs = [
    {
      name: "Nguyễn Văn A",
      recruiter_name: "Di Di",
      price_from: "2.000.000",
      price_to: "3.500.000",
      offer_deadline: "3 ngày 23 giờ",
      description:
        "Yêu cầu: tối ưu hoá SEO, response time < 10ms, UI/UX hợp mắt, dễ sử dụng, có API cho bên thứ 3, Server Side Rendering, ưu tiên sử dụng NextJS ",
      skills: ["Javascript", "C#", "SQL"],
      offers: 23,
      rating: 4.23,
      jobDone: 100,
    },
    {
      name: "Nguyễn Thị B",
      recruiter_name: "Minh Huấn Lành",
      price_from: "8.000.000",
      price_to: "10.000.000",
      offer_deadline: "3 ngày 23 giờ",
      description:
        "Phần mềm có chức năng đăng ký tài khoản trên giả lập LDplayer - Có fake IP sử dụng dịch vụ có API tích hợp - Thuê số điện thoại, nhận OTP có API - Đăng ký tài khoản, xuất định dạng account theo yêu cầu.",
      skills: ["C#", "Python"],
      offers: 2,
      rating: 3.5,
      jobDone: 20,
    },
    {
      name: "Nguyễn Hoàng C",
      recruiter_name: "Minh Huấn Lành",
      price_from: "8.000.000",
      price_to: "10.000.000",
      offer_deadline: "3 ngày 23 giờ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugiat aperiam quos quasi accusantium sapiente praesentium iure quidem odit laudantium beatae voluptatibus fugit obcaecati autem voluptas, perferendis excepturi impedit temporibus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quo neque cum aliquam, iusto provident quae porro repellendus qui quas eligendi consectetur iste labore, dolor aliquid dolorem ducimus obcaecati. Magnam.",
      skills: ["C#", "Python"],
      offers: 2,
      rating: 2.7,
      jobDone: 10,
    },
  ];

  // const listOfSkills = [
  //   "Java",
  //   "C# & .NET",
  //   "SQL",
  //   "Flutter",
  //   "iOS",
  //   "Android",
  //   "Python",
  // ];

  /**
   *
   * @param {HTMLElement} event
   */
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
                {skillQuery.isLoading ? <div>Loading skill...</div> : 
                <div className="form-control">
                  {skillQuery.data.map((skill) => (
                    <label key={skill.skillId} className="label cursor-pointer">
                      <span className="label-text">{skill.skillName}</span>
                      <input
                        type="checkbox"
                        readOnly
                        className="checkbox checkbox-accent"
                      />
                    </label>
                  ))}
                </div>}
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
                        readOnly
                        className="radio radio-accent"
                        checked={stt.value === selectedStatus}
                        value={stt.value}
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
                <p className="font-semibold text-2xl">Tất cả freelancer</p>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Tìm freelancer...."
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
              {data.data.map((job, idx) => (
                <div
                  key={idx}
                  className="job-card cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${job.id}`);
                  }}
                >
                  <div className="px-5">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="flex avatar">
                          <div className="w-14 rounded-full mr-3">
                            <img src={job.avatar} alt="" />
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <h1 className="mb-1 text-xl font-semibold">
                            {job.name}
                          </h1>
                          <p className="text-sm">{job.shortDescription}</p>
                        </div>
                      </div>
                      <div className="btn btn-sm btn-outline bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 text-white">
                        <i className="bi bi-telephone-fill mr-2" /> Liên hệ
                      </div>
                    </div>
                    <div className="mt-5 mb-3 flex justify-between bg-slate-100">
                      <div className="flex">
                        {/* <div className="pl-2 py-2">{job.roleAtWork}</div> */}
                        {/* <div className="divider divider-horizontal mx-2 my-2" /> */}
                        <div className="pl-2 py-2">{job.roleAtWork}</div>
                      </div>
                      <div className="flex items-center mr-3">
                        <CustomRating name={idx} rating={job.rating} />
                        {/* <Rating
                        emptySymbol="bi bi-star text-orange-300"
                        fullSymbol="bi bi-star-fill text-orange-400"
                        fractions={3}
                      /> */}
                        {/* <div className="divider divider-horizontal mx-2 my-2" />
                      <p className="">Đã làm: {job.projects.length} dự án</p> */}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {job.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="badge badge-success text-white"
                          >
                            {skill.skillName}
                          </div>
                        ))}
                      </div>
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

export default Freelancers;
