import { useGetFreelancersQuery } from "@/App/Models/Freelancer/Freelancer";
import { useGetSkillsQuery } from "@/App/Models/Skill/Skill";
import CustomPagination from "@/Ui/Components/CustomPagination/CustomPagination";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import CustomRating from "@/Ui/Components/Rating/ReadOnlyRating";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import { getAllFreelancers } from "../../../Api/Service/Freelancer/index";

import defaultAva from "@/App/Assets/png/default.webp";

import "./Freelancers.css";

const Freelancers = () => {
  const listOfStatus = [
    { status: "Tất cả", value: "0" },
    { status: "Đã xác thực", value: "1" },
    { status: "Chưa xác thực", value: "2" },
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("0");
  // /**
  //  * @type {[IFreelancer[],Function]} loadedFreelancer
  //  */
  // const [loadedFreelancers, setLoadedFreelancers] = useState([{}]);

  // const [isLoadingFreelancers, setIsLoadingFreelancers] = useState(true);
  const [flNameState, setFlNameState] = useState("");
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const { data, error, isLoading } = useGetFreelancersQuery({pageNo, skills: selectedSkills.map(e => e.skillId), name: flNameState});
  // const {data: skillData, error: skillError, isLoading: isLoadingSkill} = useGetSkillsQuery();
  // const skillQuery = useGetSkillsQuery("",{selectFromResult: (data) => console.log(data)});
  const skillQuery = useGetSkillsQuery();

  const onFLNameChange = (bruh) => {
    setFlNameState(bruh.target.value);
  }

  const onSkillListChange = (skill) => {
    // const existingSkill = [...selectedSkills];
    // existingSkill.push(skill);
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(e => e !== skill));
    } else setSelectedSkills([...selectedSkills, skill]);
  };

  const goToNewPage = (newPageNo) => {
    // jobQuery = useGetJobsQuery({ pageNo: newPageNo });
    setPageNo(newPageNo);
  };

  // useEffect(() => {
  //   loadInitialFreelancers();
  // }, []);

  // const loadInitialFreelancers = async () => {
  //   setIsLoadingFreelancers(true);
  //   const result = await getAllFreelancers();
  //   setLoadedFreelancers(result);
  //   setIsLoadingFreelancers(false);
  // };

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
                {skillQuery.isLoading ? (
                  <div>Loading skill...</div>
                ) : (
                  <div className="form-control">
                    {skillQuery.data.map((skill) => (
                      <label
                        key={skill.skillId}
                        className="label cursor-pointer"
                      >
                        <span className="label-text">{skill.skillName}</span>
                        <input
                          onChange={() => onSkillListChange(skill)}
                          type="checkbox"
                          readOnly
                          className="checkbox checkbox-accent"
                        />
                      </label>
                    ))}
                  </div>
                )}
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
                onChange={onFLNameChange}
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
                            <img src={job.avatar ?? defaultAva} alt="" />
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <h1 className="mb-1 text-xl font-semibold">
                            {job.name}
                          </h1>
                          <p className="text-sm">{job.shortDescription}</p>
                        </div>
                      </div>
                      {/* <div className="btn btn-sm btn-outline bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 text-white">
                        <i className="bi bi-telephone-fill mr-2" /> Liên hệ
                      </div> */}
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
            <CustomPagination
              prevPage={() => goToNewPage(data.pageNo - 1)}
              nextPage={() => goToNewPage(data.pageNo + 1)}
              hasNextPage={data.hasNextPage}
              hasPrevPage={data.hasPreviousPage}
              pageNo={data.pageNo}
              totalPage={data.totalPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Freelancers;
