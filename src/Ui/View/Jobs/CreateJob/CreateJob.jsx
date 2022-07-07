import CurrencyInput from "react-currency-input-field";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import local from "date-fns/locale/vi";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

import "./CreateJob.css";
import {
  setLoading,
  setNotLoading,
} from "@/App/Models/GlobalLoading/LoadingSlice";
import loadingSvg from "@/App/Assets/svg/loading_animated.svg";
import {
  useCreateNewJobMutation,
  useUpdateJobMutation,
} from "@/App/Models/Job/Job";
import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";
import { useEffect } from "react";
import dayjs from "dayjs";
import { notyf } from "@/App/Utils/NotyfSetting";

const CreateJob = () => {
  registerLocale("vi", local);

  const [selectedDate, setSelectedDate] = useState();

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const { state, pathname } = location;
  const [isEditingJob, setIsEditingJob] = useState(pathname == "/edit-job");

  const navigate = useNavigate();

  const [createJob, { isLoading, isSuccess }] = useCreateNewJobMutation();
  const [updateJob] = useUpdateJobMutation();

  const getJobBudgetError = (errors) => {
    if (errors.jobBudget) {
      switch (errors.jobBudget.type) {
        case "min":
          return (
            <p className="text-red-400 text-xs">
              Ngân sách không thể nhỏ hơn 100 ngàn VND
            </p>
          );
        case "max":
          return (
            <p className="text-red-400 text-xs">
              Ngân sách không thể lớn hơn 10 triệu VND
            </p>
          );
        default:
          return (
            <p className="text-red-400 text-xs">
              Vui lòng điền ngân sách dự tính
            </p>
          );
      }
    }
  };

  const onSubmit = async (data) => {
    const jobData = {
      title: data.jobName,
      description: data.jobDescription,
      price: data.jobBudget,
      duration: data.jobDeadline,
      skills: data.jobSkills.map((skill) => skill.skillId),
      recruiterId: userState.userId,
    };
    // console.log(jobData);
    if (isEditingJob) {
      jobData.jobId = state.id;
      const result = await updateJob({ jobId: state.id, job: jobData });
      if (result.data) {
        notyf.success("Cập nhật thành công");
        navigate(-1);
      } else {
        notyf.error("Cập nhật thất bại. Vui lòng thử lại sau!");
      }
    } else {
      const result = await createJob(jobData);
      if (result.data) {
        navigate(`/job/${result.data.id}`);
      }else{
        notyf.error("Tạo việc thất bại. Vui lòng thử lại sau!"); 
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-[700px] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Đăng việc tuyển freelancer</h1>
          <div className="flex w-full mt-5">
            <div className="w-1/6 text-center mt-3">
              <i className="bi bi-folder2-open create-job-icon icon-colour" />
            </div>
            <div className="w-5/6">
              <h1 className="text-xl font-semibold">Thông tin công việc</h1>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tên công việc</span>
                </label>
                <input
                  type="text"
                  placeholder="VD: Thiết kế trang web bán hàng"
                  defaultValue={state?.title}
                  {...register("jobName", { required: true })}
                  className={`${
                    errors.jobName ? "border-red-500 " : ""
                  }input input-bordered w-full`}
                />
                {errors.jobName && (
                  <p className="text-red-400 text-xs">
                    Tên công việc không được bỏ trống
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Mô tả công việc</span>
                </label>
                <textarea
                  className={`${
                    errors.jobDescription ? "border-red-500 " : ""
                  }textarea textarea-bordered h-24`}
                  defaultValue={state?.description}
                  placeholder="VD: Các giao diện website cần thiết kế như trang chủ, xem hàng, thanh toán..."
                  {...register("jobDescription", { required: true })}
                ></textarea>
                {errors.jobDescription && (
                  <p className="text-red-400 text-xs">
                    Mô tả không được bỏ trống
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Kỹ năng cần thiết</span>
                </label>
                <Controller
                  name="jobSkills"
                  control={control}
                  defaultValue={state?.skills}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultipleSelect
                      selectedSkills={field.value}
                      setSelectedSkills={(skill) => field.onChange(skill)}
                      isError={errors.jobSkills}
                    />
                  )}
                />
                {errors.jobSkills && (
                  <p className="text-red-400 text-xs">
                    Vui lòng chọn kỹ năng cần thiết
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full mt-5">
            <div className="w-1/6 text-center mt-3">
              <i className="bi bi-cash-stack create-job-icon icon-colour" />
            </div>
            <div className="w-5/6">
              <h1 className="text-xl font-semibold">Thông tin ngân sách</h1>
              <div className="flex gap-5">
                <div className="form-control">
                  <label className="label pl-0">
                    <span className="label-text">Ngân sách dự tính</span>
                  </label>
                  <div className="flex w-full gap-x-4">
                    <div className="flex">
                      <Controller
                        name="jobBudget"
                        control={control}
                        defaultValue={state?.price}
                        rules={{ required: true, min: 100000, max: 10000000 }}
                        render={({ field }) => (
                          <>
                            <CurrencyInput
                              id="input-example"
                              allowNegativeValue={false}
                              defaultValue={state?.price}
                              className={`${
                                errors.jobBudget ? "border-red-500 " : ""
                              }input input-bordered border-r-0 rounded-tr-none rounded-br-none`}
                              name="gia-thau"
                              placeholder="Từ"
                              decimalsLimit={2}
                              maxLength={100000000}
                              onValueChange={(value, name) =>
                                field.onChange(value)
                              }
                              value={field.value}
                            />
                            <span
                              className={`${
                                errors.jobBudget ? "border-red-500 " : ""
                              }border-t-[1px] border-b-[1px] border-r-[1px] pt-3 vnd-border pr-2`}
                            >
                              VND
                            </span>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  {getJobBudgetError(errors)}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Hạn chót chào giá</span>
                  </label>
                  <Controller
                    name="jobDeadline"
                    control={control}
                    defaultValue={state && dayjs(state?.duration).toDate()}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        locale="vi"
                        selected={field.value}
                        onChangeRaw={(e) => e.preventDefault()}
                        dateFormat="EEEE, dd/MM/yyyy"
                        minDate={new Date()}
                        onChange={(e) => field.onChange(e)}
                        className={`${
                          errors.jobDeadline ? "border-red-500 " : ""
                        }w-full border-gray-300 focus-visible:outline-none mr-2 input input-bordered`}
                        allowSameDay={false}
                      />
                    )}
                  />
                  {errors.jobDeadline && (
                    <p className="text-red-400 text-xs">
                      Vui lòng chọn hạn chót chào giá
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="submit"
              value={isEditingJob ? "Cập nhật công việc" : "Đăng việc"}
              className="btn btn-secondary btn-md mt-3 text-white"
            />
            {isEditingJob && (
              <input
                type="button"
                onClick={() => navigate(-1)}
                value="Hủy và quay về"
                className="btn offer-btn btn-md mt-3 text-white"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
