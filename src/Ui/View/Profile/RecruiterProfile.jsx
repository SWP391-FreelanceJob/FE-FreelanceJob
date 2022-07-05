import { getFreelancerById } from "@/Api/Service/Freelancer";
import { useGetRecruiterQuery } from "@/App/Models/Recruiter/Recruiter";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultAva from "@/App/Assets/png/default.webp";
import "./Profile.css";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  if (isNaN(id)) {
    navigate("/not-found");
  }

  // const [loadedFreelancer, setLoadedFreelancer] = useState({});
  // const [isLoadingFreelancer, setIsLoadingFreelancer] = useState(true);

  const recruiterQuery = useGetRecruiterQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {recruiterQuery.isLoading ? (
        <LoadingOverlay />
      ) : (
        <div>
          <div className="flex">
            <div className="w-2/3 flex flex-col">
              <div className="flex w-full">
                <div className="w-1/5 flex flex-col items-center lg:mr-0 mr-3">
                  <div className="avatar">
                    <div className="rounded-full">
                      <img
                        className="usr-avatar"
                        src={recruiterQuery.data.avatar ?? defaultAva}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="mt-5">
                    <div className="flex">
                      <h1 className="text-xl font-semibold mb-3 mr-2">
                        {recruiterQuery.data.fullname}
                      </h1>
                      {/* <button
                        className="btn btn-sm upd-btn text-white"
                        onClick={() => navigate("/setting/profile")}
                      >
                        Cập nhật thông tin
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Giới thiệu bản thân
                </h1>
                <div className="ml-1">
                  {recruiterQuery.data.description &&
                  recruiterQuery.data.description.length > 0
                    ? recruiterQuery.data.description
                    : "Chưa có giới thiệu"}
                </div>
              </div>
              <div className="py-2">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Những công việc đã đăng
                </h1>
                <div className="inline-flex gap-3 flex-nowrap overflow-auto portfo-overflow">
                  {recruiterQuery.data.jobs &&
                  recruiterQuery.data.jobs.length > 0
                    ? recruiterQuery.data.jobs.map((e) => {
                        return (
                          <div
                            key={e.jobId}
                            className="card card-compact bg-base-100 shadow-md mb-4 w-1/3 min-w-[30%]"
                          >
                            {/* <figure>
                          <img
                            className="w-full object-cover"
                            src={e.imageUrl}
                            alt=""
                          />
                        </figure> */}
                            <div className="inline-flex pl-1">
                              <div className="card-body">
                                <h2 className="text-base">{e.title}</h2>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : "Chưa có công việc nào được đăng"}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col">
              <div className="card card-compact all-shadow px-8 py-5 mb-2">
                <h1 className="text-xl font-bold pb-3">Thông tin liên lạc</h1>
                <p className="mb-2 text-sm">
                  <i className="bi bi-envelope font"></i>{" "}
                  {recruiterQuery.data.email}
                </p>
                <p className="text-sm ">
                  <i className="bi bi-phone"></i> {recruiterQuery.data.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterProfile;
