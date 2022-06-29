import { useGetOffersByJobIdQuery, useUpdateOfferStatusByIdMutation } from "@/App/Models/Offer/Offer";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import defaultAvatar from "@/App/Assets/png/default.webp";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import _ from "lodash";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewOffer.css";
import { useDispatch } from "react-redux";
import { setLoading } from "@/App/Models/GlobalLoading/LoadingSlice";

const ViewOffer = () => {
  dayjs.locale("vi");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { jid } = useParams();

  const [updateOfferStatus] = useUpdateOfferStatusByIdMutation();

  const onAcceptOffer = async (offerId) => {
    dispatch(setLoading(true));
    const result = await updateOfferStatus({
      offerId: offerId,
      offerStatusReq: {status: "ACCEPTED",
      jobId: jid}
    });
    if (result.data) {
      notyf.success("Nhận chào giá thành công");
    }
    dispatch(setLoading(false));
    window.location.reload();
  }

  const offerQuery = useGetOffersByJobIdQuery(jid);

  return offerQuery.isLoading ? (
    <LoadingOverlay />
  ) : (
    <div className="flex flex-col w-[1200px] mx-auto gap-5">
      <h1 className="text-3xl font-bold mb-4">
        Quản lý chào giá
      </h1>
      <h2 className="text-xl font-bold mb-4">Tên công việc: {offerQuery.data.title}</h2>
      {_.isEmpty(offerQuery.data.offers) ? <div>Chưa có freelancer nào nhận làm việc này.</div> : <></>}
      {offerQuery.data.offers
        .filter((offer) => offer.status === "ACCEPTED" && !_.isNil(offer.freelancer))
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
                      <h1 className="text-sm">
                        {offer.experience}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Kế hoạch thực hiện công việc
                      </h1>
                      <h1 className="text-sm">
                        {offer.planning}
                      </h1>
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
                            src={_.isNil(offer.freelancer.avatar) ? defaultAvatar : offer.freelancer.avatar}
                            alt=""
                          />
                        </div>
                      </div>
                      <ReadOnlyRating name={0} rating={4} />
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
        .filter((offer) => offer.status === "REJECTED" && !_.isNil(offer.freelancer))
        .map((offer) => (
          <div key={offer.offerId} className="card card-compact all-shadow border-[1px] rounded-md border-red-600">
            <div className="flex pb-2">
              <div className="w-2/3">
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">
                      Giới thiệu kinh nghiệm và kỹ năng
                    </h1>
                    <h1 className="text-sm">
                      {offer.experience}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pl-2">
                    <h1 className="text-base font-semibold">
                      Kế hoạch thực hiện công việc
                    </h1>
                    <h1 className="text-sm">
                      {offer.planning}
                    </h1>
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
                          src={_.isNil(offer.freelancer.avatar) ? defaultAvatar : offer.freelancer.avatar}
                          alt=""
                        />
                      </div>
                    </div>
                    <ReadOnlyRating name={0} rating={4} />
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
        .filter((offer) => offer.status === "OFFERING" && !_.isNil(offer.freelancer))
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
                      <h1 className="text-sm">
                        {offer.experience}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 pl-2">
                      <h1 className="text-base font-semibold">
                        Kế hoạch thực hiện công việc
                      </h1>
                      <h1 className="text-sm">
                        {offer.planning}
                      </h1>
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
                            src={_.isNil(offer.freelancer.avatar) ? defaultAvatar : offer.freelancer.avatar}
                            alt=""
                          />
                        </div>
                      </div>
                      <ReadOnlyRating name={0} rating={4} />
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
                        <div onClick={() => onAcceptOffer(offer.offerId)} className="btn btn-secondary text-white">
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
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="btn red-btn w-52 text-white"
      >
        Quay về
      </div>
    </div>
  );
};

export default ViewOffer;
