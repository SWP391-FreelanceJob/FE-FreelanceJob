import "./JobProgress.css";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";
import { getJobById } from "@/Api/Service/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import "dayjs/locale/vi";
import {
  useGetMessageByAccountIdJobIdQuery,
  useGetMessageByIdQuery,
  useGetMessageByJobIdQuery,
  useGetMessageByTargetQuery,
  useSentMessageMutation,
} from "@/App/Models/Message/Message";
import ReactTextareaAutosize from "react-textarea-autosize";
import defaultAva from "@/App/Assets/png/default.webp";
import { useGetJobByIdQuery } from "@/App/Models/Job/Job";
import { JobStatusFromInt } from "@/App/Constant";
import { useSelector } from "react-redux";
import { useGetOfferByJobIdAndFreelancerIdQuery } from "@/App/Models/Offer/Offer";
import { useForm } from "react-hook-form";
import CustomDropzone from "@/Ui/Components/CustomDropzone/CustomDropzone";
import { mqttClient } from "@/App/Utils/Mqtt";

const JobProgress = () => {
  dayjs.locale("vi");

  const [isCantChat, setIsCantChat] = useState(false);
  const [selectedAccId, setSelectedAccId] = useState();
  const [selectedOfferInfo, setSelectedOfferInfo] = useState();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  const offerTooltip = "Thông tin chào giá của freelancer hiện tại";

  const navigate = useNavigate();
  let { id } = useParams();

  const userState = useSelector((state) => state.user);

  mqttClient.subscribe("/msg/" + userState.accountId);

  const isRecruiter = userState.role === "recruiter";

  const {
    data: jobData,
    error: jobError,
    isLoading: jobLoading,
  } = useGetJobByIdQuery(id);

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

  const {
    data: msgInfData,
    error: msgInfError,
    isLoading: msgInfLoading,
  } = useGetMessageByAccountIdJobIdQuery({
    accountId: userState.accountId,
    jobId: id,
  });

  const {
    data: msgData,
    error: msgError,
    isLoading: msgLoading,
    isFetching: msgFetching,
    refetch,
  } = useGetMessageByTargetQuery(
    {
      targetAccountId: selectedAccId,
      sourceAccountId: userState.accountId,
      jobId: id,
    },
    {
      skip: !selectedAccId,
    }
  );

  const [sendMsg] = useSentMessageMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  mqttClient.onMessageArrived = (message) => {
    console.log(message.payloadString);
    if (selectedAccId) {
      refetch();
    }
  };

  useEffect(() => {
    if (isNaN(id)) {
      navigate("/not-found");
    }

    if (!isRecruiter) {
      if (offerError && offerError.code == 404) {
        navigate("/forbidden");
      }

      if (
        jobData &&
        offerData &&
        jobData.status != 0 &&
        offerData.status != "ACCEPTED"
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
    if (selectedOfferInfo && selectedOfferInfo.status != "ACCEPTED") {
      setIsCantChat(true);
    }
  }, [selectedAccId]);

  /**
   * @type {[IJob,Function]}
   */

  // const {
  //   data: msgData,
  //   error: msgError,
  //   isLoading: msgLoading,
  // } = useGetMessageByJobIdQuery(id);

  const getFLinfo = (msgInfo) => {
    setSelectedAccId(msgInfo.targetUser.accId);
    setSelectedOfferInfo(msgInfo.currentOffer);
    setSelectedMessages(msgInfo.messages);
  };

  const onSend = async (data) => {
    const msgData = {
      fromAccountId: userState.accountId,
      toAccountId: selectedAccId,
      jobId: id,
      content: data.content,
      attachFileUrl: selectedAttachment,
      sentTime: new Date(),
    };
    console.log(msgData);

    const resp = await sendMsg(msgData);
    console.log(resp);
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
                  <button className="btn btn-sm btn-outline btn-primary hover:!text-white">
                    Hoàn tất
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline btn-primary hover:!text-white">
                    Yêu cầu hoàn tất
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

            {msgLoading || msgFetching ? (
              <div>Đang tải tin nhắn</div>
            ) : (
              <div
                className={`${
                  userState.role === "recruiter" ? "w-4/5" : "w-full"
                } flex-col flex gap-2`}
              >
                {!isCantChat && msgData && msgData.length > 0 && (
                  <form onSubmit={handleSubmit(onSend)}>
                    <div className="flex flex-col all-shadow rounded-md p-2 bg-slate-200">
                      <p className="text-lg font-semibold mb-2">Lời nhắn</p>
                      <ReactTextareaAutosize
                        id=""
                        maxRows={13}
                        className={`${
                          errors.content ? "border-red-500 " : ""
                        }bg-white rounded-sm min-h-[100px] mb-3`}
                        {...register("content", { required: true })}
                      />
                      {errors.content && (
                        <p className="text-red-400 text-xs">
                          Lời nhắn không được để trống
                        </p>
                      )}
                      <div className="flex justify-between">
                        <CustomDropzone
                          maxSize={2097152} //2MB
                          multiple={false}
                          filter={{
                            "image/jpeg": [],
                            "image/png": [],
                            "image/gif": [],
                            "image/jpg": [],
                          }}
                          acceptedFile={(file) => {
                            // setSelectedAvatar(file);
                            // if (file.length > 0)
                            //   setPreviewAvatarLink(URL.createObjectURL(file[0]));
                          }}
                          customClass="flex"
                          noDrag={true}
                        />
                        <button className="btn btn-sm btn-primary text-white">
                          Gửi
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                <table className="chat-table w-full">
                  <thead>
                    <tr>
                      <th>Người gửi</th>
                      <th>Lời nhắn</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {msgData &&
                      msgData.length > 0 &&
                      msgData.map((msg, idx) => (
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
                          <td className="h-full">
                            <ReactTextareaAutosize
                              name="message-content"
                              className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                              id=""
                              disabled
                              rows={5}
                              value={msg.content}
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
                      ))}
                  </tbody>
                </table>
              </div>
            )}
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
      <input type="checkbox" id="offer-detail-modal" className="modal-toggle" />
      {(offerData || selectedOfferInfo) && (
        <label htmlFor="offer-detail-modal" className="modal cursor-pointer">
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
                value={offerData?.status ?? selectedOfferInfo?.status}
              />
            </div>
            <div className="modal-action">
              <label
                htmlFor="offer-detail-modal"
                className="btn btn-sm btn-outline"
              >
                Đã hiểu
              </label>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

export default JobProgress;
