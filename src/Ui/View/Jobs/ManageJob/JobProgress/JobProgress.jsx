import "./JobProgress.css";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useRef, useState } from "react";
import { getJobById } from "@/Api/Service/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useGetMessageByAccountIdJobIdQuery,
  useGetMessageByIdQuery,
  useGetMessageByJobIdQuery,
  useGetMessageByTargetQuery,
  useSentMessageMutation,
} from "@/App/Models/Message/Message";
import ReactTextareaAutosize from "react-textarea-autosize";
import defaultAva from "@/App/Assets/png/default.webp";
import {
  useCompleteJobMutation,
  useGetJobByIdQuery,
  useRequestToCompleteJobMutation,
} from "@/App/Models/Job/Job";
import { JobStatusFromInt, OfferStatus } from "@/App/Constant";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetOfferByJobIdAndFreelancerIdQuery,
  useUpdateOfferStatusByIdMutation,
} from "@/App/Models/Offer/Offer";
import { useForm } from "react-hook-form";
import CustomDropzone from "@/Ui/Components/CustomDropzone/CustomDropzone";
import useMqttState from "@/App/Utils/Mqtt/useMqttState";
import useSubscription from "@/App/Utils/Mqtt/useSubscription";
import _ from "lodash";
import { setLoading } from "@/App/Models/GlobalLoading/LoadingSlice";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useGetBalanceByIdQuery } from "@/App/Models/Payment/Payment";
import {
  uploadAttachmentToFirebaseGetDownloadUrl,
  uploadAvatarToFirebaseGetDownloadUrl,
} from "@/Api/Service/Firebase/FBStorage";
import { useStorage } from "reactfire";
import { ref } from "firebase/storage";
import Rating from "react-rating";
import { useRateJobMutation } from "@/App/Models/Rating/Rating";

const JobProgress = () => {
  dayjs.locale("vi");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [isCantChat, setIsCantChat] = useState(false);
  const [isRejectedFL, setisRejectedFL] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [selectedAccId, setSelectedAccId] = useState();

  const [selectedOfferInfo, setSelectedOfferInfo] = useState();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState([]);

  const [prevMqttMsg, setPrevMqttMsg] = useState(null);

  const storage = useStorage();

  const modalBtnRef = useRef(null);
  const ratingBtnRef = useRef(null);

  const offerTooltip = "Thông tin chào giá của freelancer hiện tại";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  if (isNaN(id)) {
    navigate("/not-found");
  }

  const userState = useSelector((state) => state.user);

  // mqttClient.subscribe("/msg/" + userState.accountId);
  const { message } = useSubscription("/msg/" + userState.accountId + "/" + id);

  const isRecruiter = userState.role === "recruiter";

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
    refetch: balanceRefetch,
  } = useGetBalanceByIdQuery(userState.accountId);

  const {
    data: jobData,
    error: jobError,
    isLoading: jobLoading,
    refetch: jobRefetch,
  } = useGetJobByIdQuery(id);

  const {
    data: offerData,
    error: offerError,
    isLoading: isGetOfferLoading,
    refetch: offerRefetch,
  } = useGetOfferByJobIdAndFreelancerIdQuery(
    {
      jobId: id,
      freelancerId: userState.userId,
    },
    { skip: isRecruiter }
  );

  const {
    data: msgInfData,
    error: msgInfError,
    isLoading: msgInfLoading,
    refetch,
  } = useGetMessageByAccountIdJobIdQuery({
    accountId: userState.accountId,
    jobId: id,
  });

  // const {
  //   data: msgData,
  //   error: msgError,
  //   isLoading: msgLoading,
  //   isFetching: msgFetching,
  //   refetch,
  // } = useGetMessageByTargetQuery(
  //   {
  //     targetAccountId: selectedAccId,
  //     sourceAccountId: userState.accountId,
  //     jobId: id,
  //   },
  //   {
  //     skip: !selectedAccId || isRejectedFL,
  //   }
  // );

  const [sendMsg] = useSentMessageMutation();
  const [updateOfferStatus] = useUpdateOfferStatusByIdMutation();
  const [requestComplete] = useRequestToCompleteJobMutation();
  const [confirmComplete] = useCompleteJobMutation();
  const [rateJob, { isRateJobLoading, isRateJobError }] = useRateJobMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // console.log("Mqtt msg: ", message);
    if (message) {
      const msgObj = JSON.parse(message.message);
      if (!isRecruiter) {
        // Prevent Duplicate if any
        setSelectedMessages(_.unionBy(selectedMessages, [msgObj], "messageId"));
        if (msgObj.messageType == "NOTIFICATION") {
          jobRefetch();
          balanceRefetch();
        }
      } else {
        // console.log(msgObj);
        if (selectedAccId) {
          if (msgObj.fromAccount.accId == selectedAccId) {
            // Prevent Duplicate if any
            setSelectedMessages(
              _.unionBy(selectedMessages, [msgObj], "messageId")
            );
          } else {
            refetch();
          }
        } else {
          refetch();
        }
        if (msgObj.messageType == "NOTIFICATION") {
          jobRefetch();
          balanceRefetch();
        }
      }
      // refetch();
    }
  }, [message]);

  useEffect(() => {
    if (!isRecruiter && msgInfData && msgInfData.length > 0) {
      setSelectedMessages(msgInfData[0].messages);
      setSelectedAccId(msgInfData[0].targetUser.accId);
    }
  }, [msgInfData]);

  useEffect(() => {
    if (isNaN(id)) {
      navigate("/not-found");
    }

    if (jobData && jobData.jobStatus == 2) {
      setIsCantChat(true);
      setIsDone(true);
    }

    if (!isRecruiter) {
      if (offerError && offerError.code == 404) {
        navigate("/forbidden");
      }

      if (
        jobData &&
        offerData &&
        jobData.jobStatus != 0 &&
        offerData.status == "REJECTED"
      ) {
        setIsCantChat(true);
      }
    } else {
      if (jobData && jobData.recruiterId != userState.userId) {
        navigate("/forbidden");
      }
    }
  }, [jobData, offerData]);

  useEffect(() => {
    setIsCantChat(false);
    setisRejectedFL(false);
    if (jobData && jobData.jobStatus == 2) {
      setIsCantChat(true);
      setIsDone(true);
    }
    if (selectedOfferInfo && selectedOfferInfo.status == "REJECTED") {
      setIsCantChat(true);
      setisRejectedFL(true);
    }
  }, [selectedAccId]);

  const getFLinfo = (msgInfo) => {
    if (selectedAccId != msgInfo.targetUser.accId)
      setSelectedAccId(msgInfo.targetUser.accId);
    setSelectedOfferInfo(msgInfo.currentOffer);
    setSelectedMessages(msgInfo.messages);
  };

  const onSend = async (data) => {
    let attachmentUrl = null;
    setIsSendingMsg(true);

    if (selectedAttachment.length > 0) {
      const file = selectedAttachment[0];

      attachmentUrl = await uploadAttachmentToFirebaseGetDownloadUrl(
        storage,
        userState.accountId,
        file
      );
    }

    const msgData = {
      fromAccountId: userState.accountId,
      toAccountId: selectedAccId,
      jobId: id,
      content: data.content,
      attachFileUrl: attachmentUrl,
      sentTime: new Date(),
    };
    console.log(msgData);

    const resp = await sendMsg(msgData);
    console.log(resp);
    if (resp.data) {
      setSelectedMessages([...selectedMessages, resp.data]);
    }
    if (resp.error) {
      notyf.error(resp.error.messages[0].err_msg);
    }
    reset();
    setSelectedAttachment([]);
    setIsSendingMsg(false);
  };

  const getNameFromUrl = (url) => {
    const refName = ref(storage, url);
    return refName.name;
  };

  const onAcceptOffer = async (offerId) => {
    // dispatch(setLoading(true));
    if (selectedOfferInfo) {
      const result = await updateOfferStatus({
        offerId: selectedOfferInfo.offerId,
        offerStatusReq: { status: "ACCEPTED", jobId: id },
      });
      if (result.data) {
        notyf.success("Nhận chào giá thành công");
      }
      // dispatch(setLoading(false));
      // window.location.reload();
      jobRefetch();
      offerRefetch();
      modalBtnRef.current.click();
    }
  };

  const onRequestToComplete = async () => {
    // Only FL can request to complete
    const data = {
      requesterAccountId: userState.accountId,
      theOtherChatterRecruiterId: jobData.recruiterId,
    };
    const result = await requestComplete({ jobId: id, data });
    if (!result.error) {
      notyf.success("Yêu cầu hoàn thành thành công");
      refetch();
    }
  };

  const onRemoveAttachment = () => {
    if (selectedAttachment.length > 0) {
      setSelectedAttachment([]);
    }
  };

  const onReview = async (ratingVal, jobId) => {
    console.log(ratingVal, jobId);
    const result = await rateJob({
      jobId: jobId,
      accountId: userState.accountId,
      rating: ratingVal,
    });
    ratingBtnRef.current.click();
    if (!isRateJobError) notyf.success("Đánh giá thành công.");
    else notyf.error("Đánh giá thất bại.");
  };

  const onCompleteJob = async () => {
    // Only FL can request to complete
    const currOffer = _.find(jobData.offers, { status: "ACCEPTED" });
    const data = {
      requesterAccountId: userState.accountId,
      offerId: currOffer.offerId,
    };
    console.log(data);
    const result = await confirmComplete({ jobId: id, data });
    if (!result.error) {
      notyf.success("Xác nhận thành công");
      refetch();
      balanceRefetch();
    } else {
      notyf.error(result.error.messages[0].err_msg);
    }
  };

  return (
    <div>
      {jobLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2 flex flex-wrap w-2/3">
              {jobData.title}
            </h1>
            {!isCantChat && (
              <div className="flex gap-2 items-center">
                {userState.role === "recruiter" ? (
                  <button
                    onClick={onCompleteJob}
                    disabled={jobData.jobStatus != 4}
                    className="btn btn-sm btn-outline btn-primary hover:!text-white"
                  >
                    Hoàn thành
                  </button>
                ) : (
                  <button
                    onClick={onRequestToComplete}
                    disabled={
                      jobData.jobStatus == 4 ||
                      jobData.jobStatus == 0 ||
                      jobData.jobStatus == 2
                    }
                    className="btn btn-sm btn-outline btn-primary hover:!text-white"
                  >
                    Yêu cầu hoàn thành
                  </button>
                )}
                <span>
                  Trạng thái:{" "}
                  <span
                    className={`${
                      jobData.jobStatus == 1
                        ? "text-blue-500"
                        : jobData.jobStatus == 2
                        ? "text-emerald-500"
                        : jobData.jobStatus == 3
                        ? "text-red-500"
                        : jobData.jobStatus == 4
                        ? "text-yellow-600"
                        : "text-slate-500"
                    }`}
                  >
                    {JobStatusFromInt[jobData.jobStatus]}
                  </span>
                </span>
              </div>
            )}
            {isCantChat && isDone && (
              <div className="flex gap-2 items-center">
                <label
                  htmlFor="rating-modal"
                  className="btn btn-sm btn-outline yellow-btn !text-slate-600"
                >
                  Đánh giá
                </label>
                <span>
                  Trạng thái:{" "}
                  <span
                    className={`${
                      jobData.jobStatus == 1
                        ? "text-blue-500"
                        : jobData.jobStatus == 2
                        ? "text-emerald-500"
                        : jobData.jobStatus == 3
                        ? "text-red-500"
                        : jobData.jobStatus == 4
                        ? "text-yellow-600"
                        : "text-slate-500"
                    }`}
                  >
                    {JobStatusFromInt[jobData.jobStatus]}
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <label
              htmlFor="job-detail-modal"
              className="btn btn-sm btn-accent text-white"
            >
              Thông tin công việc
            </label>
            <div className="tooltip" data-tip={offerTooltip}>
              <label
                htmlFor="offer-detail-modal"
                className="btn btn-sm btn-info text-white"
              >
                Thông tin chào giá
              </label>
            </div>
          </div>
          <div className="w-full min-h-screen flex py-2 pl-2">
            {isRecruiter && (
              <>
                <div className="w-1/5 flex flex-col gap-2">
                  {msgInfData &&
                    msgInfData.map((msgInfo, idx) => (
                      <div
                        key={idx}
                        onClick={() => getFLinfo(msgInfo)}
                        className={`${
                          selectedAccId == msgInfo.targetUser.accId
                            ? "bg-slate-100 "
                            : ""
                        } ${
                          msgInfo.currentOffer.status == "REJECTED"
                            ? "text-slate-300 "
                            : ""
                        } hover:bg-slate-200 p-3 cursor-pointer active:bg-slate-300 rounded-sm`}
                      >
                        <p className="">
                          {msgInfo.targetUser.freelancer.fullname}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="divider divider-horizontal" />
              </>
            )}
            <div
              className={`${
                userState.role === "recruiter" ? "w-4/5" : "w-full"
              } flex-col flex gap-2`}
            >
              {!isCantChat && selectedMessages.length > 0 && (
                <form onSubmit={handleSubmit(onSend)}>
                  <div className="flex flex-col all-shadow rounded-md p-2 bg-slate-200">
                    <p className="text-lg font-semibold mb-2">Lời nhắn</p>
                    <ReactTextareaAutosize
                      id=""
                      maxRows={13}
                      className={`${
                        errors.content ? "border-red-500 " : ""
                      }bg-white rounded-sm min-h-[100px] mb-3 p-2`}
                      {...register("content", { required: true })}
                    />
                    {errors.content && (
                      <p className="text-red-400 text-xs">
                        Lời nhắn không được để trống
                      </p>
                    )}
                    <div className="flex justify-between">
                      <div>
                        <CustomDropzone
                          maxSize={4194304} //4MB
                          multiple={false}
                          filter={{}}
                          acceptedFile={(file) => {
                            console.log(file);
                            setSelectedAttachment(
                              _.union(selectedAttachment, file)
                            );
                            // if (file.length > 0)
                            //   setPreviewAvatarLink(URL.createObjectURL(file[0]));
                          }}
                          customClass="flex"
                          noDrag={true}
                        />
                        {selectedAttachment &&
                          selectedAttachment.length > 0 &&
                          selectedAttachment.map((file, idx) => (
                            <div key={idx} className="flex items-center">
                              <i
                                onClick={onRemoveAttachment}
                                className="bi bi-x text-red-600 cursor-pointer"
                              />
                              {file.name}
                            </div>
                          ))}
                      </div>
                      <button
                        disabled={isSendingMsg}
                        className="btn btn-sm btn-primary text-white"
                      >
                        {isSendingMsg ? (
                          <>
                            {" "}
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Đang gửi
                          </>
                        ) : (
                          "Gửi"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {/* {msgLoading || msgFetching ? (
                <div>Đang tải tin nhắn</div>
              ) : (
                
              )} */}
              <table className="chat-table w-full">
                <thead>
                  <tr>
                    <th>Người gửi</th>
                    <th>Lời nhắn</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMessages.length > 0 &&
                    selectedMessages.map((msg, idx) =>
                      msg.messageType == "NOTIFICATION" ? (
                        <tr className="bg-[#ffcac7]" key={idx}>
                          <td className="!pb-1" colSpan={2}>
                            <ReactTextareaAutosize
                              name="message-content"
                              className="w-full min-h-fit pl-2
                              bg-[#ffcac7] text-black whitespace-pre-line resize-none"
                              id=""
                              disabled
                              rows={1}
                              defaultValue={msg.content}
                            />
                          </td>
                          <td>
                            <div>
                              {dayjs(msg.sentTime)
                                .format("DD/MM/YYYY HH:mm")
                                .toString()}
                            </div>
                            {/* <div>{dayjs().format("HH:mm").toString()}</div> */}
                          </td>
                        </tr>
                      ) : (
                        <tr key={idx}>
                          <td>
                            <div>
                              {msg.fromAccount.recruiter
                                ? msg.fromAccount.recruiter.fullname
                                : msg.fromAccount.freelancer.fullname}
                              <img
                                src={msg.fromAccount.avatar ?? defaultAva}
                                className="w-20"
                                alt="usr-avatar"
                              />
                            </div>
                          </td>
                          <td className="h-0">
                            <div className="h-full flex flex-col justify-between">
                              <ReactTextareaAutosize
                                name="message-content"
                                className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                                id=""
                                disabled
                                rows={5}
                                value={msg.content}
                              />
                              {msg.attachFileUrl && (
                                <a
                                  href={msg.attachFileUrl}
                                  download
                                  className="bg-slate-50 link link-secondary tooltip !text-left"
                                  data-tip="File đính kèm"
                                >
                                  <p className="p-2">
                                    {getNameFromUrl(msg.attachFileUrl)}
                                  </p>
                                </a>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              {dayjs(msg.sentTime)
                                .format("DD/MM/YYYY HH:mm")
                                .toString()}
                            </div>
                            {/* <div>{dayjs().format("HH:mm").toString()}</div> */}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
        </div>
        // </div>
      )}
      <input type="checkbox" id="job-detail-modal" className="modal-toggle" />
      {jobData && (
        <div className="modal">
          <div className="modal-box">
            <span>
              <div className="font-bold">Mô tả công việc:</div>
              <ReactTextareaAutosize
                className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                disabled
                defaultValue={jobData.description}
              />
            </span>
            <div className="my-4">
              <div className="font-bold">Kỹ năng cần có</div>
              <div className="flex gap-1 flex-wrap">
                {jobData.skills.map((e) => (
                  <div
                    key={e.skillId}
                    className="badge badge-info badge-outline text-white"
                  >
                    {e.skillName}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-action">
              <label
                htmlFor="job-detail-modal"
                className="btn btn-sm btn-outline"
              >
                Đã hiểu
              </label>
            </div>
          </div>
        </div>
      )}
      <input
        ref={modalBtnRef}
        type="checkbox"
        id="offer-detail-modal"
        className="modal-toggle"
      />
      {(offerData || selectedOfferInfo) && (
        <div className="modal">
          <div className="modal-box flex flex-col gap-1">
            <div>
              <div className="font-bold">Kinh nghiệm:</div>
              <ReactTextareaAutosize
                className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                disabled
                value={offerData?.experience ?? selectedOfferInfo?.experience}
              />
            </div>
            <div>
              <div className="font-bold">Dự định:</div>
              <ReactTextareaAutosize
                className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                disabled
                value={offerData?.planning ?? selectedOfferInfo?.planning}
              />
            </div>
            <div>
              <div className="font-bold">Thời gian làm dự kiến:</div>
              <ReactTextareaAutosize
                className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                disabled
                value={
                  offerData?.timeToComplete ?? selectedOfferInfo?.timeToComplete
                }
              />
            </div>
            <div>
              <div className="font-bold">Giá chào:</div>
              <CurrencyInput
                className="w-min bg-white"
                prefix="VND "
                allowNegativeValue={false}
                disabled
                value={offerData?.offerPrice ?? selectedOfferInfo?.offerPrice}
              />
            </div>
            <div>
              <div className="font-bold">Trạng thái:</div>
              <ReactTextareaAutosize
                className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                disabled
                value={
                  OfferStatus[offerData?.status ?? selectedOfferInfo?.status]
                }
              />
            </div>
            <div className="modal-action">
              {isRecruiter && (
                <div
                  className="tooltip"
                  data-tip="Tài khoản phải có ít nhất 500.000đ"
                >
                  <button
                    onClick={onAcceptOffer}
                    disabled={
                      (jobData && jobData.jobStatus != 0) ||
                      balanceData.balance < 500000
                    }
                    className="btn btn-sm btn-outline btn-primary hover:!text-white"
                  >
                    Giao việc
                  </button>
                </div>
              )}
              <label
                htmlFor="offer-detail-modal"
                className="btn btn-sm btn-outline"
              >
                Đã hiểu
              </label>
            </div>
          </div>
        </div>
      )}
      <input ref={ratingBtnRef} type="checkbox" id="rating-modal" className="modal-toggle" />
      {jobData && (
        <div className="modal">
          <div className="modal-box">
            <div className="my-4">
              <div className="font-bold">Đánh giá</div>
              <div className="flex gap-1 flex-wrap">
                <Rating
                  initialRating={
                    !isRecruiter
                      ? jobData.freelancerRating
                      : jobData.recruiterRating
                  }
                  onClick={(ratingVal) => onReview(ratingVal, jobData.id)}
                  fullSymbol="bi bi-star-fill text-orange-400"
                  emptySymbol="bi bi-star text-orange-300"
                />
              </div>
            </div>
            <div className="modal-action">
              <label htmlFor="rating-modal" className="btn btn-sm btn-outline">
                Xong
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobProgress;
