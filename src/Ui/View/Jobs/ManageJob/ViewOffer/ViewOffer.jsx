import {
  useGetOffersByJobIdQuery,
  useUpdateOfferStatusByIdMutation,
} from "@/App/Models/Offer/Offer";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import defaultAvatar from "@/App/Assets/png/default.webp";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import _ from "lodash";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewOffer.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/App/Models/GlobalLoading/LoadingSlice";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useSentMessageMutation } from "@/App/Models/Message/Message";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useGetBalanceByIdQuery } from "@/App/Models/Payment/Payment";

const ViewOffer = () => {
  dayjs.locale("vi");
  const introTooltip =
    "Để chấp nhận chào giá, bạn phải có hơn 500.000₫ trong tài khoản.";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedFLId, setSelectedFLId] = useState();

  let { jid } = useParams();

  const modalBtnRef = useRef();

  const userState = useSelector((state) => state.user);

  const [updateOfferStatus] = useUpdateOfferStatusByIdMutation();
  const [sendMsg] = useSentMessageMutation();
  const getBalanceQuery = useGetBalanceByIdQuery(userState.accountId);

  const onAcceptOffer = async (offerId) => {
    if (getBalanceQuery.data.balance >= 500000) {
      dispatch(setLoading(true));
      const result = await updateOfferStatus({
        offerId: offerId,
        offerStatusReq: { status: "ACCEPTED", jobId: jid },
      });
      if (result.data) {
        notyf.success("Nhận chào giá thành công");
      }
      dispatch(setLoading(false));
      window.location.reload();
    }
  };

  const onSend = async (data) => {
    const msgData = {
      fromAccountId: userState.accountId,
      toFreelanceId: selectedFLId,
      jobId: jid,
      content: data.content,
      attachFileUrl: null,
      sentTime: new Date(),
    };
    console.log(msgData);
    const result = await sendMsg(msgData);
    if (result.data) {
      notyf.success("Gửi tin nhắn thành công");
      navigate(`/job-progress/${jid}`);
    }
    modalBtnRef.current.click();
    reset();
  };

  const offerQuery = useGetOffersByJobIdQuery(jid);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return offerQuery.isLoading ? (
    <LoadingOverlay />
  ) : (
    <div className="flex flex-col w-[1200px] mx-auto gap-5">
      <h1 className="text-3xl font-bold mb-4">Quản lý chào giá</h1>
      <h2 className="text-xl font-bold mb-4">
        Tên công việc: {offerQuery.data.title}
      </h2>
      {_.isEmpty(offerQuery.data.offers) ? (
        <div>Chưa có freelancer nào nhận làm việc này.</div>
      ) : (
        <></>
      )}
      {offerQuery.data.offers
        .filter(
          (offer) => offer.status === "ACCEPTED" && !_.isNil(offer.freelancer)
        )
        .map((offer) => (
          <div className="indicator" key={offer.offerId}>
            <span className="indicator-item badge bg-green-600 border-green-600">
              <i className="bi bi-check-lg text-xl text-white"></i>
            </span>
            <div className="card card-compact w-full all-shadow border-[1px] rounded-md border-green-600">
              <div className="flex pb-2">
                <div className="w-2/3">
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Giới thiệu kinh nghiệm và kỹ năng
                      </h1>
                      <h1 className="text-sm">{offer.experience}</h1>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Kế hoạch thực hiện công việc
                      </h1>
                      <h1 className="text-sm">{offer.planning}</h1>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Thời gian thực hiện công việc
                      </h1>
                      <h1 className="text-sm">
                        Mình sẽ thực hiện trong: {offer.timeToComplete}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="divider divider-horizontal" />
                <div className="flex w-1/3 flex-col gap-4">
                  <div className="flex gap-x-3">
                    <div className="flex flex-col items-center">
                      <div className="avatar justify-center my-2">
                        <div className="rounded-full">
                          <img
                            className="usr-avatar !w-24"
                            src={
                              _.isNil(offer.freelancer.avatar)
                                ? defaultAvatar
                                : offer.freelancer.avatar
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      {/* <ReadOnlyRating
                        name={offer.freelancer.freelancerId}
                        rating={offer.freelancer.rating}
                      /> */}
                    </div>
                    <div className="flex flex-col gap-x-3">
                      <h1 className="text-xl text-blue-600 mt-2 mr-2">
                        {offer.freelancer.fullname}
                      </h1>
                      <h1 className="text-base text-slate-500 mb-2">
                        {offer.freelancer.shortDescription}
                      </h1>
                      <div className="flex justify-start w-full gap-2">
                        {/* <div className="btn btn-accent text-white">Liên hệ</div> */}
                        <div className="btn btn-secondary btn-disabled text-white">
                          Giao việc
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">Chào giá</h1>
                    <h1 className="text-sm">
                      <CurrencyInput
                        className="w-min bg-white"
                        prefix="VND "
                        allowNegativeValue={false}
                        disabled
                        defaultValue={offer.offerPrice}
                      />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {offerQuery.data.offers
        .filter(
          (offer) => offer.status === "REJECTED" && !_.isNil(offer.freelancer)
        )
        .map((offer) => (
          <div
            key={offer.offerId}
            className="card card-compact all-shadow border-[1px] rounded-md border-red-600"
          >
            <div className="flex pb-2">
              <div className="w-2/3">
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">
                      Giới thiệu kinh nghiệm và kỹ năng
                    </h1>
                    <h1 className="text-sm">{offer.experience}</h1>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">
                      Kế hoạch thực hiện công việc
                    </h1>
                    <h1 className="text-sm">{offer.planning}</h1>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">
                      Thời gian thực hiện công việc
                    </h1>
                    <h1 className="text-sm">
                      Mình sẽ thực hiện trong: {offer.timeToComplete}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="divider divider-horizontal" />
              <div className="flex w-1/3 flex-col gap-4">
                <div className="flex gap-x-3">
                  <div className="flex flex-col items-center">
                    <div className="avatar justify-center my-2">
                      <div className="rounded-full">
                        <img
                          className="usr-avatar !w-24"
                          src={
                            _.isNil(offer.freelancer.avatar)
                              ? defaultAvatar
                              : offer.freelancer.avatar
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    {/* <ReadOnlyRating
                      name={offer.freelancer.freelancerId}
                      rating={offer.freelancer.rating}
                    /> */}
                  </div>
                  <div className="flex flex-col gap-x-3">
                    <h1 className="text-xl text-blue-600 mt-2 mr-2">
                      {offer.freelancer.fullname}
                    </h1>
                    <h1 className="text-base text-slate-500 mb-2">
                      {offer.freelancer.shortDescription}
                    </h1>
                    <div className="flex w-full justify-start">
                      <div className="flex justify-start w-full gap-2">
                        {/* <div className="btn btn-accent text-white">Liên hệ</div> */}
                        <div className="btn btn-secondary btn-disabled text-white">
                          Giao việc
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2 pl-2">
                  <h1 className="text-base font-semibold">Chào giá</h1>
                  <h1 className="text-sm">
                    <CurrencyInput
                      className="w-min bg-white"
                      prefix="VND "
                      allowNegativeValue={false}
                      disabled
                      defaultValue={offer.offerPrice}
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      {offerQuery.data.offers
        .filter(
          (offer) => offer.status === "OFFERING" && !_.isNil(offer.freelancer)
        )
        .map((offer) => (
          <div className="indicator" key={offer.offerId}>
            {/* <span className="indicator-item badge bg-yellow-600 border-yellow-600">
              <i className="bi bi-check-lg text-xl text-white"></i>
            </span> */}
            <div className="card card-compact w-full all-shadow border-[1px] rounded-md border-yellow-600">
              <div className="flex pb-2">
                <div className="w-2/3">
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Giới thiệu kinh nghiệm và kỹ năng
                      </h1>
                      <h1 className="text-sm">{offer.experience}</h1>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Kế hoạch thực hiện công việc
                      </h1>
                      <h1 className="text-sm">{offer.planning}</h1>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Thời gian thực hiện công việc
                      </h1>
                      <h1 className="text-sm">
                        Mình sẽ thực hiện trong: {offer.timeToComplete}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="divider divider-horizontal" />
                <div className="flex w-1/3 flex-col gap-4">
                  <div className="flex gap-x-3">
                    <div className="flex flex-col items-center">
                      <div className="avatar justify-center my-2">
                        <div className="rounded-full">
                          <img
                            className="usr-avatar !w-24"
                            src={
                              _.isNil(offer.freelancer.avatar)
                                ? defaultAvatar
                                : offer.freelancer.avatar
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      {/* <ReadOnlyRating
                        name={offer.freelancer.freelancerId}
                        rating={offer.freelancer.rating}
                      /> */}
                    </div>
                    <div className="flex flex-col gap-x-3">
                      <h1 className="text-xl text-blue-600 mt-2 mr-2">
                        {offer.freelancer.fullname}
                      </h1>
                      <h1 className="text-base text-slate-500 mb-2">
                        {offer.freelancer.shortDescription}
                      </h1>
                      <div className="flex justify-start w-full gap-2">
                        <label
                          htmlFor="send-msg-modal"
                          onClick={() =>
                            setSelectedFLId(offer.freelancer.freelancerId)
                          }
                          className="btn btn-accent text-white"
                        >
                          Liên hệ
                        </label>
                        {getBalanceQuery.isLoading ? (
                          <></>
                        ) : (
                          <div className="tooltip" data-tip={introTooltip}>
                            <div
                              onClick={() => {
                                onAcceptOffer(offer.offerId);
                              }}
                              className={`btn btn-secondary text-white ${
                                getBalanceQuery.data.balance < 500000
                                  ? "btn-disabled"
                                  : ""
                              }`}
                              disabled={getBalanceQuery.data.balance < 500000}
                            >
                              Giao việc
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">Chào giá</h1>
                    <h1 className="text-sm">
                      <CurrencyInput
                        className="w-min bg-white"
                        prefix="VND "
                        allowNegativeValue={false}
                        disabled
                        defaultValue={offer.offerPrice}
                      />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="btn red-btn w-52 text-white"
      >
        Quay về
      </div>
      <input
        ref={modalBtnRef}
        type="checkbox"
        id="send-msg-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Gửi tin nhắn tới freelancer</h3>
          <form onSubmit={handleSubmit(onSend)}>
            <p className="py-4">
              <ReactTextareaAutosize
                name="message-content"
                className="w-full min-h-fit pl-2 bg-white whitespace-pre-line resize-none textarea textarea-bordered"
                id=""
                rows={5}
                {...register("content", { required: true })}
                // defaultValue={msg.content}
              />
            </p>
            <div className="modal-action">
              <label
                htmlFor="send-msg-modal"
                className="btn btn-sm offer-btn text-white"
              >
                Hủy
              </label>
              <button className="btn btn-sm btn-secondary text-white">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewOffer;
