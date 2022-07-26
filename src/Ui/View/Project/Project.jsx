import { useGetProjectByProjectIdQuery } from "@/App/Models/Project/Project";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvatar from "@/App/Assets/png/default.webp";
import "./Project.css";
import ReactTextareaAutosize from "react-textarea-autosize";

const Project = () => {
  const listOfSkills = [
    "Java",
    "C# & .NET",
    "SQL",
    "Flutter",
    "iOS",
    "Android",
    "Python",
  ];

  const navigate = useNavigate();
  const { id } = useParams();

  const projectQuery = useGetProjectByProjectIdQuery(id);

  return projectQuery.isLoading ? (
    <LoadingOverlay />
  ) : (
    <div className="flex">
      <div className="w-1/3 mr-3">
        <div className="card card-compact all-shadow px-8 py-5 mb-2 items-center">
          <div className="avatar justify-center mb-3">
            <div className="rounded-full">
              <img
                className="usr-avatar"
                src={projectQuery.data.freelancer.imageUrl ?? defaultAvatar}
                alt=""
              />
            </div>
          </div>
          <div className="font-semibold text-xl">
            {projectQuery.data.freelancer.freelancerName}
          </div>
          <p className="my-2 text-slate-400">
            {projectQuery.data.freelancer.shortDescription}
          </p>

          <div
            onClick={() =>
              navigate(`/profile/${projectQuery.data.freelancer.freelancerId}`)
            }
            className="btn btn-sm btn-secondary mt-2 text-white"
          >
            Xem hồ sơ
          </div>
        </div>
      </div>
      <div className="w-2/3 mx-3">
        <h1 className="mb-1 font-semibold text-2xl">
          {projectQuery.data.name}
        </h1>
        <div className="flex gap-2 mb-2 flex-wrap ">
          {projectQuery.data.skills.map((e) => (
            <div
              key={e.skillId}
              className="badge badge-info badge-outline text-white"
            >
              {e.skillName}
            </div>
          ))}
          {/* <div className="badge badge-info badge-outline text-white">SQL</div> */}
        </div>
        <img
          className="min-w h-[40%]"
          src={projectQuery.data.imageUrl}
          alt=""
        />
        <ReactTextareaAutosize
          name="project-content"
          className="w-full min-h-fit pl-2 bg-white whitespace-pre-line resize-none"
          id=""
          disabled
          rows={1}
          defaultValue={projectQuery.data.description}
        />
      </div>
    </div>
  );
};

export default Project;
