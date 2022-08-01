import { useGetGenresQuery } from "@/App/Models/Genre/Genre";
import { useGetJobsQuery } from "@/App/Models/Job/Job";
import { useGetSkillsQuery } from "@/App/Models/Skill/Skill";
import CustomPagination from "@/Ui/Components/CustomPagination/CustomPagination";
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
  const [selectedGenre, setSelectedGenre] = useState();

  const [pageNo, setPageNo] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [flNameState, setFlNameState] = useState("");

  const jobQuery = useGetJobsQuery({
    pageNo,
    skills: selectedSkills.map((e) => e.skillId),
    genreId: selectedGenre,
    name: flNameState,
    status: "PUBLISHED",
  });
  const goToNewPage = (newPageNo) => {
    setPageNo(newPageNo);
  };

  const {
    data: genreData,
    error: genreError,
    isLoading: isGenreLoading,
  } = useGetGenresQuery();

  const skillQuery = useGetSkillsQuery();

  const navigate = useNavigate();

  const onFLNameChange = (bruh) => {
    setFlNameState(bruh.target.value);
  };

  const onSkillListChange = (skill) => {
    // const existingSkill = [...selectedSkills];
    // existingSkill.push(skill);
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((e) => e !== skill));
    } else setSelectedSkills([...selectedSkills, skill]);
    setPageNo(1);
  };

  const checkedBox = () => {
    setIsChecked(!isChecked);
  };

  const onSelectStatus = (event) => {
    const val = event.target.value;
    setSelectedStatus(val);
  };

  return (
    <div>
      {jobQuery.isLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="flex lg:mx-0 mx-7 gap-x-7">
          <div className="w-1/5 flex flex-col gap-y-4">
            <div className="card filter-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">Phân loại</h1>
                  {selectedGenre && (
                    <h1
                      onClick={() => {
                        setSelectedGenre();
                        setPageNo(1);
                      }}
                      className="text-red-400 cursor-pointer "
                    >
                      Huỷ
                      <i className="bi bi-x" />
                    </h1>
                  )}
                </div>
                {genreData &&
                  genreData.map((stt, idx) => (
                    <div key={idx} className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">{stt.genreName}</span>
                        <input
                          type="radio"
                          name="genre"
                          value={stt.id}
                          onChange={() => {
                            setSelectedGenre(stt.id);
                            setPageNo(1);
                          }}
                          checked={stt.id === selectedGenre}
                          // readOnly
                          className="radio radio-accent"
                        />
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            <div className="card filter-shadow">
              <div className="p-4">
                <h1 className="text-xl font-semibold">Kỹ năng</h1>
                {skillQuery.isLoading ? (
                  <div></div>
                ) : (
                  <div className="form-control">
                    {skillQuery.data &&
                      skillQuery.data.map((skill) => (
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
                <p className="font-semibold text-2xl">Tất cả công việc</p>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                onChange={onFLNameChange}
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
              {!(
                jobQuery.data &&
                jobQuery.data.data &&
                jobQuery.data.data.length > 0 &&
                jobQuery.data.data.filter((job) => job.jobStatus === 0).length >
                  0
              ) ? (
                <div className="p-3 text-2xl">Không tìm thấy công việc</div>
              ) : (
                jobQuery.data.data
                  .filter((job) => job.jobStatus === 0)
                  .map((job, idx) => (
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
                            <span className="badge badge-info text-white">
                              {job.genre?.genreName}
                            </span>
                          </div>
                          <div className="p-2">
                            Hạn nhận hồ sơ:{" "}
                            {dayjs(job.duration)
                              .format("DD/MM/YYYY")
                              .toString()}
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
                          <div>{job.noOfOffer ?? "0"} chào giá</div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* <div className="btn-group justify-center">
              <button
                onClick={() => goToNewPage(jobQuery.data.pageNo - 1)}
                className={`btn btn-secondary ${
                  jobQuery.data.pageNo === 1 ? "btn-disabled" : ""
                }`}
              >
                «
              </button>
              <button className="btn btn-secondary cursor-default text-white">
                Trang {jobQuery.data.pageNo} trên {jobQuery.data.totalPage}
              </button>
              <button
                onClick={() => goToNewPage(jobQuery.data.pageNo + 1)}
                className={`btn btn-secondary ${
                  jobQuery.data.pageNo === jobQuery.data.totalPage
                    ? "btn-disabled"
                    : ""
                }`}
              >
                »
              </button>
            </div> */}
            <CustomPagination
              prevPage={() => goToNewPage(jobQuery.data.pageNo - 1)}
              nextPage={() => goToNewPage(jobQuery.data.pageNo + 1)}
              pageNo={jobQuery.data.pageNo}
              totalPage={jobQuery.data.totalPage}
              hasNextPage={jobQuery.data.hasNextPage}
              hasPrevPage={jobQuery.data.hasPreviousPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
