import { uploadAvatarToFirebaseGetDownloadUrl } from "@/Api/Service/Firebase/FBStorage";
import {
  useGetProjectByProjectIdQuery,
  useUpdateProjectMutation,
} from "@/App/Models/Project/Project";
import { notyf } from "@/App/Utils/NotyfSetting";
import CustomDropzone from "@/Ui/Components/CustomDropzone/CustomDropzone";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";
import _ from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useStorage } from "reactfire";
import "../ManageProject.css";

const EditProject = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);
  let { id } = useParams();

  const projectQuery = useGetProjectByProjectIdQuery(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedAvatar, setSelectedAvatar] = useState();
  const [previewAvatarLink, setPreviewAvatarLink] = useState();
  const storage = useStorage();

  const [updateProject, { isLoading, isSuccess }] = useUpdateProjectMutation();

  const onSubmitUpdateProject = async (data) => {
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
      skills: data.skillIds.map((skill) => skill.skillId),
    };
    console.log(projectData);
    const result = await updateProject({ projectId: id, project: projectData });
    if (result.data) {
      // navigate(`/job/${result.data.id}`);
      notyf.success("Chỉnh sửa hồ sơ năng lực thành công.");
      navigate(-1);
      reset();
    }
  };

  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;

  return projectQuery.isLoading ? (
    <LoadingOverlay />
  ) : (
    <div className="flex flex-col w-[1000px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="border-2 border-red-400 w-20 px-2 rounded-lg bg-red-400 text-white mb-4"
      >
        Quay về
      </button>
      <form onSubmit={handleSubmit(onSubmitUpdateProject)}>
        <div className="form-control gap-3">
          <div className="form-input">
            <span>
              Hình sản phẩm <span className="text-red-500">*</span>
            </span>
            <div>
              <div className="avatar">
                {selectedAvatar && previewAvatarLink && (
                  <div className="w-24 rounded-xl">
                    <img src={`${previewAvatarLink}`} />
                  </div>
                )}
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
                {...register("name", { required: true })}
                defaultValue={projectQuery.data.name}
                placeholder="Dự án web bán hàng,..."
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
                placeholder="Giới thiệu về bản thân"
                defaultValue={projectQuery.data.description}
                {...register("description", { required: true })}
              />
            </div>
          </div>
          <div className="form-input">
            <span>
              Kỹ năng <span className="text-red-500">*</span>
            </span>
            <div className="w-full flex-grow">
              <Controller
                defaultValue={projectQuery.data.skills}
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
        <div className="flex gap-2 justify-center">
          <button className="btn secondary-btn text-white btn-sm mt-3">
            Lưu và quay về
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
