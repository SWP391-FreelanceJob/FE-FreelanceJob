import { getFreelancerById } from "@/Api/Service/Freelancer";
import { useGetFreelancerByIdQuery } from "@/App/Models/Freelancer/Freelancer";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultFile from "@/App/Assets/png/file.jpg";
import defaultAva from "@/App/Assets/png/default.webp";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  // const [loadedFreelancer, setLoadedFreelancer] = useState({});
  // const [isLoadingFreelancer, setIsLoadingFreelancer] = useState(true);

  const freelancerQuery = useGetFreelancerByIdQuery(id);

  return (
    <>
      {freelancerQuery.isLoading ? (
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
                        src={freelancerQuery.data.avatar ?? defaultAva}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="mt-5">
                    <div className="flex">
                      <h1 className="text-xl font-semibold mb-3 mr-2">
                        {freelancerQuery.data.name}
                      </h1>
                      {/* <button
                        className="btn btn-sm upd-btn text-white"
                        onClick={() => navigate("/setting/profile")}
                      >
                        Cập nhật thông tin
                      </button> */}
                    </div>
                    <p className="text-sm mb-3">
                      <i className="bi bi-bag"></i>{" "}
                      {freelancerQuery.data.roleAtWork}
                    </p>
                    {/* <p className="text-sm mb-4">
                    <i className="bi bi-geo-alt"></i> Vương quốc Anh
                  </p> */}
                    <div className="flex gap-2 mb-2">
                      {freelancerQuery.data.skills.map((e) => {
                        return (
                          <div
                            key={e.skillId}
                            className="badge badge-info badge-outline text-white"
                          >
                            {e.skillName}
                          </div>
                        );
                      })}
                      {/* <div className="badge badge-info badge-outline text-white">
                      SQL
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Giới thiệu bản thân
                </h1>
                <div className="ml-1">{freelancerQuery.data.description ?? "Chưa có giới thiệu"}</div>
              </div>
              <div className="py-2">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Hồ sơ năng lực
                </h1>
                <div className="inline-flex gap-3 flex-nowrap overflow-auto portfo-overflow">
                  {freelancerQuery.data.projects.map((e,idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={() => navigate(`/project/${e.id}`)}
                        className="card card-compact bg-base-100 shadow-md mb-4 w-1/3 min-w-[30%] hover:cursor-pointer"
                      >
                        <figure>
                          {e.imageUrl && e.imageUrl.length > 0 ? (
                            <img
                              className="w-full object-cover"
                              src={e.imageUrl ?? defaultFile}
                              alt=""
                            />
                          ) : (
                            <img src={defaultFile} className="w-24 object-cover" />
                          )}
                        </figure>
                        <div className="inline-flex pl-1">
                          <div className="card-body">
                            <h2 className="text-base line-clamp-3">{e.description}</h2>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col">
              <div className="card card-compact all-shadow px-8 py-5 mb-2">
                <h1 className="text-xl font-bold pb-3">Thông tin liên lạc</h1>
                <p className="mb-2 text-sm">
                  <i className="bi bi-envelope font"></i>{" "}
                  {freelancerQuery.data.email}
                </p>
                <p className="text-sm ">
                  <i className="bi bi-phone"></i> {freelancerQuery.data.phone}
                </p>
              </div>
              {/* <div className="m-7">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Dự án đã làm
                </h1>
                <p className="text-sm">Chưa làm dự án nào!</p>
              </div>
              <div className="m-7">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Kinh nghiệm
                </h1>
                <p className="text-sm">
                  <b>Mới đi làm</b> (Dưới 2 năm làm việc)
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
