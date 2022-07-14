import "./JobDetail.css";
import CurrencyInput from "react-currency-input-field";
import { forwardRef, useEffect, useState } from "react";
import { getJobById } from "@/Api/Service/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import "dayjs/locale/vi";
import { useGetJobByIdQuery } from "@/App/Models/Job/Job";
import {
  useCreateOfferByJobIdMutation,
  useGetOfferByJobIdAndFreelancerIdQuery,
  useGetOffersByJobIdQuery,
  useUpdateOfferByIdMutation,
} from "@/App/Models/Offer/Offer";
import defaultAvatar from "@/App/Assets/png/default.webp";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useGetBalanceByIdQuery } from "@/App/Models/Payment/Payment";
import { setLoading } from "@/App/Models/GlobalLoading/LoadingSlice";
import TextareaAutosize from "react-textarea-autosize";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useGetGenresQuery } from "@/App/Models/Genre/Genre";

// const JobEdit = forwardRef(({},ref) => {

// });

const JobDetail = () => {
  dayjs.locale("vi");

  const navigate = useNavigate();
  let { id } = useParams();

  if (_.isNaN(id)) navigate("/not-found");

  const [isEditOffer, setIsEditOffer] = useState(false);

  const userState = useSelector((state) => state.user);
  const isRecruiter = userState.role === "recruiter";
  const dispatch = useDispatch();

  const jobQuery = useGetJobByIdQuery(id, { refetchOnMountOrArgChange: true });
  const offerQuery = useGetOffersByJobIdQuery(id);
  const balanceQuery = useGetBalanceByIdQuery(userState.accountId);
  const {
    data: offerData,
    error: offerError,
    isLoading: isGetOfferLoading,
  } = useGetOfferByJobIdAndFreelancerIdQuery(
    {
      jobId: id,
      freelancerId: userState.userId,
    },
    { skip: isRecruiter }
  );

  const [createOffer] = useCreateOfferByJobIdMutation();
  const [updateOffer] = useUpdateOfferByIdMutation();

  const onSubmit = async (data) => {
    data = { ...data, freelancerId: userState.userId };
    dispatch(setLoading(true));

    if (!isEditOffer) {
      const result = await createOffer({ jobId: id, offer: data });

      dispatch(setLoading(false));
      console.log(result);
      if (result.error) {
        notyf.error(result.error.messages[0].err_msg);
      }
      if (result.data) {
        notyf.success("Tạo chào giá thành công");
      }
    } else {
      const result = await updateOffer({
        offerId: offerData.offerId,
        offer: data,
      });
      if (result.data) {
        notyf.success("Cập nhật chào giá thành công");
      }
      dispatch(setLoading(false));
      setIsEditOffer(false);
      console.log(result);
    }
  };

  const getOfferBudgetError = (errors) => {
    if (errors.offerPrice) {
      switch (errors.offerPrice.type) {
        case "min":
          return (
            <p className="text-red-400 text-xs">
              Giá chào phải lớn hơn 100 ngàn VND
            </p>
          );
        case "max":
          return (
            <p className="text-red-400 text-xs">
              Giá chào không thể lớn hơn ngân sách dự tính
            </p>
          );
        default:
          return (
            <p className="text-red-400 text-xs">
              Vui lòng điền chi phí dự tính
            </p>
          );
      }
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {jobQuery.isLoading ? (
        <LoadingOverlay />
      ) : (
        jobQuery.data && (
          <div className="flex flex-col gap-y-3">
            <div className="flex">
              <div className="w-2/3 flex flex-col">
                <div className="flex w-full">
                  <div className="w-3/4">
                    <div className="">
                      <div className="flex">
                        <h1 className="text-2xl font-semibold mb-3 mr-2">
                          {jobQuery.data.title}
                        </h1>
                        {isRecruiter &&
                          userState.userId == jobQuery.data.recruiterId &&
                          jobQuery.data.jobStatus == 0 && (
                            <button
                              onClick={() =>
                                navigate("/edit-job", { state: jobQuery.data })
                              }
                              className="btn btn-sm btn-primary text-white"
                            >
                              Sửa công việc
                            </button>
                          )}
                      </div>
                      <p className="text-base mb-3">
                        Khách hàng:{" "}
                        <b
                          onClick={() =>
                            navigate(
                              `/recruiter-profile/${jobQuery.data.recruiterId}`
                            )
                          }
                          className="text-blue-500"
                        >
                          {jobQuery.data.recruiterName}
                        </b>
                      </p>
                      <div className="flex">
                        <p className="mr-3">Kỹ năng:</p>
                        <div className="flex gap-2 mb-2 pt-1">
                          {jobQuery.data.skills.map((e, idx) => (
                            <div
                              key={idx}
                              className="badge badge-success badge-outline text-white"
                            >
                              {e.skillName}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex">
                        <p className="mr-3">Phân loại</p>
                        <div className="flex gap-2 mb-2 pt-1">
                          {jobQuery.data && (
                            <div className="badge badge-info text-white">
                              {jobQuery.data.genre?.genreName}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <h1 className="text-xl text-black mb-2 font-semibold">
                    Thông tin công việc
                  </h1>
                  <div className="ml-1">
                    {userState.isLogin ? (
                      <TextareaAutosize
                        name="jobDescription"
                        className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                        defaultValue={jobQuery.data.description}
                        disabled
                      />
                    ) : (
                      <div className="card card-compact all-shadow w-1/2 p-3 justify-center gap-2">
                        <div className="text-xl font-bold w-full text-center">
                          Vui lòng đăng nhập để xem chi tiết
                        </div>
                        <button
                          onClick={() => {
                            navigate("/sign-in");
                          }}
                          className="flex items-center justify-center gap-2 active:scale-[.98] 
                          active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-2
                          rounded-xl text-gray-700 font-semibold text-base border-2 border-gray-100 "
                        >
                          Đến trang đăng nhập/đăng ký
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex flex-col">
                <div className="card card-compact all-shadow px-8 py-5 mb-3">
                  <h1 className="text-xl font-bold pb-3">Thông tin dự án</h1>
                  <dl className="flex flex-col gap-1">
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">Ngày đăng</dt>
                      <dd className="w-1/2">
                        {dayjs(jobQuery.data.createdDate).format("DD/MM/YYYY")}
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">
                        Hạn chót chào giá
                      </dt>
                      <dd className="w-1/2">
                        {dayjs().to(jobQuery.data.duration)}
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">Ngân sách</dt>
                      <dd className="w-1/2">
                        {/* This mean lower than (<) and a spacebar */}
                        {/* &lt;{"\u00A0"} */}
                        <CurrencyInput
                          className="w-min bg-white"
                          prefix="VND "
                          allowNegativeValue={false}
                          disabled
                          defaultValue={jobQuery.data.price}
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="card card-compact all-shadow px-8 py-5 mb-3">
                  <h1 className="text-xl font-bold pb-3">Thông tin chào giá</h1>
                  <dl className="flex flex-col gap-1">
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">Chào giá</dt>
                      <dd className="w-1/2">{jobQuery.data.offers.length}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">Trung bình</dt>
                      <dd className="w-1/2">
                        <CurrencyInput
                          className="w-min bg-white"
                          prefix="VND "
                          allowNegativeValue={false}
                          disabled
                          defaultValue={jobQuery.data.offerInfo.avg}
                        />
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">Thấp nhất</dt>
                      <dd className="w-1/2">
                        <CurrencyInput
                          className="w-min bg-white"
                          prefix="VND "
                          allowNegativeValue={false}
                          disabled
                          defaultValue={jobQuery.data.offerInfo.lowest}
                        />
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/2 text-slate-400">Cao nhất</dt>
                      <dd className="w-1/2">
                        <CurrencyInput
                          className="w-min bg-white"
                          prefix="VND "
                          allowNegativeValue={false}
                          disabled
                          defaultValue={jobQuery.data.offerInfo.highest}
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            {userState.role === "freelancer" && (
              <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                <div className="card card-compact all-shadow px-8 py-5">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold pb-2">Chào giá</h1>
                    {offerData &&
                      (!isEditOffer ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditOffer(true);
                          }}
                          className="btn btn-sm btn-outline btn-accent hover:!text-white"
                        >
                          Sửa chào giá
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            reset(offerData);
                            setIsEditOffer(false);
                          }}
                          className="btn btn-sm btn-outline offer-btn hover:!text-white text-white"
                        >
                          Huỷ
                        </button>
                      ))}
                  </div>
                  <div className="flex gap-3">
                    <div className="form-control w-1/2">
                      <label className="label pl-0">
                        <span className="label-text">Đề xuất chi phí*</span>
                      </label>
                      <div className="flex">
                        <Controller
                          name="offerPrice"
                          control={control}
                          // - 1 to eliminate equal case
                          rules={{
                            required: true,
                            max: jobQuery.data.price - 1,
                            min: 100000,
                          }}
                          defaultValue={offerData ? offerData.offerPrice : 0}
                          render={({ field }) => (
                            <>
                              <CurrencyInput
                                id="input-example"
                                allowNegativeValue={false}
                                className={`${
                                  errors.offerPrice ? "border-red-500 " : ""
                                }input input-bordered w-full border-r-0 rounded-tr-none rounded-br-none`}
                                name="gia-thau"
                                placeholder="Chi phí thực nhận"
                                value={field.value}
                                disabled={offerData && !isEditOffer}
                                decimalsLimit={2}
                                onValueChange={(value, name) =>
                                  field.onChange(value)
                                }
                              />
                              <span
                                disabled={offerData && !isEditOffer}
                                className={`${
                                  errors.offerPrice ? "border-red-500 " : ""
                                }border-t-[1px] border-b-[1px] border-r-[1px] pt-3 vnd-border pr-2`}
                              >
                                VND
                              </span>
                            </>
                          )}
                        />
                      </div>
                      {getOfferBudgetError(errors)}
                    </div>
                    <div className="form-control w-1/2">
                      <label className="label pl-0">
                        <span className="label-text">
                          Dự kiến hoàn thành trong*
                        </span>
                      </label>
                      <select
                        defaultValue={
                          offerData ? offerData.timeToComplete : "complete-time"
                        }
                        disabled={offerData && !isEditOffer}
                        className={`${
                          errors.timeToComplete ? "border-red-500 " : ""
                        }select select-bordered focus:outline-0`}
                        {...register("timeToComplete", {
                          validate: (value) => value !== "complete-time",
                        })}
                      >
                        <option disabled value="complete-time">
                          Thời gian hoàn thành
                        </option>
                        <option>1 Ngày</option>
                        <option>2 Ngày</option>
                        <option>3 Ngày</option>
                        <option>5 Ngày</option>
                        <option>10 Ngày</option>
                        <option>1 Tuần</option>
                        <option>2 Tuần</option>
                        <option>3 Tuần</option>
                        <option>5 Tuần</option>
                      </select>
                      {errors.timeToComplete && (
                        <p className="text-red-400 text-xs">
                          Vui lòng chọn thời gian hoàn thành
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label pl-0">
                      <span className="label-text">
                        Bạn có những kinh nghiệm và kỹ năng nào phù hợp với dự
                        án này?*
                      </span>
                    </label>
                    <TextareaAutosize
                      disabled={offerData && !isEditOffer}
                      className={`${
                        errors.experience ? "border-red-500 " : ""
                      }textarea textarea-bordered h-24`}
                      placeholder="Kinh nghiệm"
                      defaultValue={offerData ? offerData.experience : ""}
                      {...register("experience", { required: true })}
                    />
                    {errors.experience && (
                      <p className="text-red-400 text-xs">
                        Vui lòng nhập kinh nghiệm làm việc của bạn
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label pl-0">
                      <span className="label-text">
                        Bạn dự định thực hiện dự án này như thế nào?*
                      </span>
                    </label>
                    <TextareaAutosize
                      disabled={offerData && !isEditOffer}
                      className={`${
                        errors.planning ? "border-red-500 " : ""
                      }textarea textarea-bordered h-24`}
                      placeholder="Dự định"
                      defaultValue={offerData ? offerData.planning : ""}
                      {...register("planning", { required: true })}
                    />
                    {errors.planning && (
                      <p className="text-red-400 text-xs">
                        Vui lòng nhập kế hoạch thực hiện dự án
                      </p>
                    )}
                  </div>
                  <div className="flex w-full justify-center">
                    <input
                      type="submit"
                      value={offerData ? "Cập nhật" : "Đăng chào giá"}
                      disabled={
                        balanceQuery.data.balance < 500000 ||
                        (offerData && !isEditOffer)
                      }
                      className={`${
                        offerData ? "btn-accent" : "offer-btn"
                      } btn btn-sm mt-3 text-white w-1/4`}
                    />
                  </div>
                </div>
                {balanceQuery.data.balance < 500000 && (
                  <div className="absolute overlay-bg rounded-xl z-50 top-0 right-0 left-0 bottom-0 h-full w-full">
                    <div className="flex justify-center items-center h-full">
                      <p className="text-2xl text-white">
                        Bạn cần có ít nhất 500.000 VND trong tài khoản để có thể
                        gửi chào giá
                      </p>
                    </div>
                  </div>
                )}
              </form>
            )}
            <div className="px-8 py-5">
              <h1 className="text-xl font-bold pb-2">Danh sách chào giá</h1>
              <div className="flex flex-col gap-2">
                {offerQuery.isLoading ? (
                  <div></div>
                ) : _.isEmpty(offerQuery.data.offers) ? (
                  <p>Không có chào giá nào</p>
                ) : (
                  offerQuery.data.offers.map(
                    (offer, idx) =>
                      offer.freelancer && (
                        <div
                          key={idx}
                          onClick={() =>
                            navigate(
                              `/profile/${offer.freelancer.freelancerId}`
                            )
                          }
                          className={`card card-compact all-shadow border-[1px] rounded-md cursor-pointer ${
                            offer.freelancer === null ? "bg-red-400" : ""
                          }`}
                        >
                          <div className="flex pb-2" key={idx}>
                            <div className="w-1/6 flex flex-col items-center">
                              <div className="avatar justify-center my-2">
                                <div className="rounded-full">
                                  <img
                                    className="usr-avatar !w-24"
                                    src={
                                      offer.freelancer === null ||
                                      offer.freelancer.avatar === null
                                        ? defaultAvatar
                                        : offer.freelancer.avatar
                                    }
                                    alt="avatar"
                                  />
                                </div>
                              </div>
                              <ReadOnlyRating name={0} rating={4} />
                            </div>
                            <div className="w-5/6">
                              <div className="flex">
                                <div className="flex flex-col gap-2">
                                  <h1 className="text-xl text-blue-600 mt-2">
                                    {offer.freelancer === null
                                      ? "Freelancer không hợp lệ"
                                      : offer.freelancer.fullname}
                                  </h1>
                                  <h1 className="text-base text-slate-500 mb-2">
                                    {_.isNil(offer.planning) ||
                                    offer.planning.length <= 0
                                      ? "Kế hoạch: ---"
                                      : `Kế hoạch: ${offer.planning}`}
                                  </h1>
                                  {/* <h1 className="text-xl text-blue-600 mt-2">Tên FL</h1> */}
                                  <span>
                                    {_.isEmpty(offer.freelancer.skills)
                                      ? "Kỹ năng: ---"
                                      : "Kỹ năng: "}
                                    {offer.freelancer.skills.map(
                                      (skill, index) => (
                                        <span
                                          key={index}
                                          className="text-blue-400"
                                        >
                                          {`${skill.skillName}${
                                            index !==
                                            offer.freelancer.skills.length - 1
                                              ? ", "
                                              : ""
                                          }`}
                                        </span>
                                      )
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default JobDetail;
