import "./ManageOffer.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useOutletContext } from "react-router-dom";
import { JobStatus, OfferStatus } from "@/App/Constant";
import { useGetOffersByFreelancerIdQuery } from "@/App/Models/Offer/Offer";
import { useSelector } from "react-redux";
import Rating from "react-rating";
import { useRateJobMutation } from "@/App/Models/Rating/Rating";
import { notyf } from "@/App/Utils/NotyfSetting";

export default function AcceptedOffer() {
  const userState = useSelector((state) => state.user);
  const {
    data: offersList,
    isLoading,
    error,
    refetch,
  } = useGetOffersByFreelancerIdQuery(userState.userId, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data: data?.filter((offer) => offer.status === "ACCEPTED"),
      error,
      isLoading,
    }),
    refetchOnFocus: true,
  });
  const navigate = useNavigate();

  const [rateJob, { isRateJobLoading, isRateJobError }] = useRateJobMutation();
  const handleRatingClick = async (ratingVal, jobId) => {
    const result = await rateJob({
      jobId: jobId,
      accountId: userState.accountId,
      rating: ratingVal,
    });
    if (!isRateJobError) {
      refetch();
      notyf.success("Đánh giá thành công.");
    } else notyf.error("Đánh giá thất bại.");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tên việc</th>
            <th>Ngân sách</th>
            <th>Trạng thái</th>
            <th>Trạng thái công việc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {offersList &&
            offersList.map((val, idx) => (
              <tr className="hover job-table" key={val.offerId}>
                <td>{val.jobTitle}</td>
                <td>
                  <CurrencyInput
                    disabled
                    allowNegativeValue={false}
                    name="gia-thau"
                    className="bg-white currency"
                    decimalsLimit={2}
                    defaultValue={val.offerPrice}
                    // onValueChange={(value, name) => console.log(value, name)}
                  />
                </td>
                <td>{OfferStatus[val.status]}</td>
                <td
                  className={val.jobStatus === "DONE" ? "text-green-900" : ""}
                >
                  {JobStatus[val.jobStatus]}
                </td>
                <td>
                  <span className="flex gap-5">
                    <i
                      onClick={() => navigate(`/job-progress/${val.jobId}`)}
                      className="bi bi-eye text-lg text-black cursor-pointer"
                    ></i>
                  </span>
                  {val.jobStatus === "DONE" && (
                    <>
                      <div>
                        <p>Nhà tuyển dụng đánh giá:</p>{" "}
                        <Rating
                          readonly
                          initialRating={val.recruiterRating}
                          fullSymbol="bi bi-star-fill text-orange-400"
                          emptySymbol="bi bi-star text-orange-300"
                        />
                      </div>
                      <br />
                      <div>
                        <p>Freelancer đánh giá:</p>{" "}
                        <Rating
                          initialRating={val.freelancerRating}
                          readonly={val.jobStatus !== "DONE"}
                          onClick={(ratingVal) =>
                            handleRatingClick(ratingVal, val.jobId)
                          }
                          fullSymbol="bi bi-star-fill text-orange-400"
                          emptySymbol="bi bi-star text-orange-300"
                        />
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
