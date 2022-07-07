import { uploadAvatarToFirebaseGetDownloadUrl } from "@/Api/Service/Firebase/FBStorage";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsByFreelancerIdQuery,
  useGetProjectsQuery,
} from "@/App/Models/Project/Project";
import { notyf } from "@/App/Utils/NotyfSetting";
import CustomDropzone from "@/Ui/Components/CustomDropzone/CustomDropzone";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";
import _ from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStorage } from "reactfire";
import "./ManageProject.css";

const ManageProject = () => {
  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);

  const [selectedAvatar, setSelectedAvatar] = useState();
  const [previewAvatarLink, setPreviewAvatarLink] = useState();
  const [selectedProject, setSelectedProject] = useState({});

  // const [selectedSkills, setSelectedSkills] = useState([]);
  const projectQuery = useGetProjectsByFreelancerIdQuery({
    freelancerId: userInfo.userId,
  });

  const storage = useStorage();

  const [createProject, { isLoading, isSuccess }] = useCreateProjectMutation();
  const [deleteProject, { isLoadingDeletProject, isSuccessDeleteProject }] =
    useDeleteProjectMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitNewProject = async (data) => {
    if (selectedAvatar) {
      const avatarUrl = await uploadAvatarToFirebaseGetDownloadUrl(
        storage,
        _.uniqueId("project-"), // for unique
        selectedAvatar[0]
      );
      data.imageUrl = avatarUrl;
    }
    const projectData = {
      // prjId: data.projectId,
      freelancerId: userInfo.userId,
      description: data.description,
      name: data.name,
      imageUrl: data.imageUrl,
      skillIds: data.skillIds.map((skill) => skill.skillId),
    };
    console.log(projectData);
    const result = await createProject(projectData);
    if (result.data) {
      // navigate(`/job/${result.data.id}`);
      notyf.success("Thêm hồ sơ năng lực mới thành công.");
      reset();
    }
  };

  const onDeleteProject = async (projectId) => {
    await deleteProject(projectId);
    notyf.success("Xoá hồ sơ năng lực thành công.");
  };

  return projectQuery.isLoading ? (
    <LoadingOverlay />
  ) : (
    <>
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Hồ sơ năng lực</h1>
        <div className="overflow-x-auto mb-5 max-h-96">
          <table className="table max-w-full">
            <thead>
              <tr>
                <th className="w-[15%]">Tên công việc</th>
                <th className="w-[65%]">Mô tả</th>
                <th className="w-[15%]"></th>
                <th className="w-[10%]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {projectQuery.data.data.map((e) => (
                <tr key={e.prjId}>
                  <td>{e.name}</td>
                  <td className="max-w-[20rem] overflow-hidden text-ellipsis">
                    {e.description}
                  </td>
                  <td className="max-w-[20rem] min-w-[5rem]">
                    <img src={e.imageUrl} alt="" />
                  </td>
                  <td>
                    <span className="flex gap-5">
                      <i
                        onClick={() => navigate(`/edit-project/${e.prjId}`)}
                        className="bi bi-pencil text-lg text-emerald-500 cursor-pointer"
                      ></i>

                      <label htmlFor={`delete-project-confirmation-${e.prjId}`}>
                        <i
                          onClick={() => {
                            setSelectedProject(e);
                          }}
                          className="bi bi-trash text-lg text-red-500 cursor-pointer"
                        ></i>
                      </label>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {_.isEmpty(projectQuery.data.data) ? (
            <div className="w-full mt-2 text-center">
              Bạn chưa có hồ sơ năng lực nào.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* modal to ask freelancer for confirmation before deleting project */}
      <input
        type="checkbox"
        id={`delete-project-confirmation-${selectedProject.prjId}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Bạn có chắc chắn muốn xoá project {selectedProject.name}?
          </h3>
          <p className="py-4">Bạn <b>không thể</b> khôi phục project nếu bạn chọn xoá. Bạn có chắc chắn không?</p>
          <div className="modal-action">
            <label htmlFor={`delete-project-confirmation-${selectedProject.prjId}`} className="btn">
              Không xoá
            </label>
            <label
              onClick={() => {
                onDeleteProject(selectedProject.prjId);
              }}
              htmlFor={`delete-project-confirmation-${selectedProject.prjId}`}
              className="btn btn-error"
            >
              Xoá
            </label>
          </div>
        </div>
      </div>
      <hr />
      <h1 className="text-3xl font-bold mb-4">Thêm hồ sơ</h1>
      <form onSubmit={handleSubmit(onSubmitNewProject)}>
        <div className="flex flex-col w-[1000px] mx-auto">
          <div className="form-control gap-3">
            <div className="form-input">
              <span>
                Hình sản phẩm <span className="text-red-500">*</span>
              </span>
              <div>
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    {selectedAvatar && previewAvatarLink ? (
                      <img src={`${previewAvatarLink}`} />
                    ) : (
                      <img src={`${"https://i.pravatar.cc/300"} `} />
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  1. Kích thước không quá 2MB
                  <br />
                  2. Định dạng hỗ trợ: jpg, jpeg, png, gif{" "}
                </div>
                <CustomDropzone
                  maxSize={2097152} //2MB
                  multiple={false}
                  filter={{
                    "image/jpeg": [],
                    "image/png": [],
                    "image/gif": [],
                    "image/jpg": [],
                  }}
                  // acceptedFile={() => {}}
                  acceptedFile={(file) => {
                    setSelectedAvatar(file);
                    // console.log("File: ", file);
                    if (file.length > 0)
                      setPreviewAvatarLink(URL.createObjectURL(file[0]));
                  }}
                />
              </div>
            </div>
            <div className="form-input">
              <span>
                Tên sản phẩm <span className="text-red-500">*</span>
              </span>
              <div className="w-full flex-grow">
                <input
                  type="text"
                  placeholder="Lập trình C#,..."
                  {...register("name", { required: true })}
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>
            <div className="form-input">
              <span>
                Giới thiệu về sản phẩm <span className="text-red-500">*</span>
              </span>
              <div className="tooltip w-full flex-grow" data-tip={introTooltip}>
                <textarea
                  className="textarea textarea-bordered h-32 w-full"
                  {...register("description", { required: true })}
                  placeholder="Giới thiệu về sản phẩm"
                />
              </div>
            </div>
            <div className="form-input">
              <span>
                Kỹ năng <span className="text-red-500">*</span>
              </span>
              <div className="w-full flex-grow">
                {/* <MultipleSelect /> */}
                <Controller
                  name="skillIds"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultipleSelect
                      selectedSkills={field.value}
                      setSelectedSkills={(skill) => field.onChange(skill)}
                      // isError={errors.jobSkills}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="btn secondary-btn text-white btn-md mt-3">
              Thêm
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ManageProject;
