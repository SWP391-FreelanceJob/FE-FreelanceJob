import "./ManageJob.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useOutletContext } from "react-router-dom";
import Rating from "react-rating";
import { useRateJobMutation } from "@/App/Models/Rating/Rating";
import { useSelector } from "react-redux";
import { notyf } from "@/App/Utils/NotyfSetting";

export default function DoneJob() {
  const [_1, _2, jobData] = useOutletContext();

  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [rateJob, { isRateJobLoading, isRateJobError }] = useRateJobMutation();
  const handleRatingClick = async (ratingVal, jobId) => {
    const result = await rateJob({
      jobId: jobId,
      accountId: userInfo.accountId,
      rating: ratingVal,
    });
    if (!isRateJobError) notyf.success("Đánh giá thành công.");
    else notyf.error("Đánh giá thất bại.");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tên việc</th>
            <th>Ngân sách</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {jobData === undefined || jobData.length === 0 ? (
            <></>
          ) : (
            jobData.map((val, idx) => (
              <tr className="hover job-table" key={val.id}>
                <td
                  onClick={() => navigate(`/job/${val.id}`)}
                  className="cursor-pointer"
                >
                  {val.title}
                </td>
                <td>
                  <CurrencyInput
                    disabled
                    allowNegativeValue={false}
                    name="gia-thau"
                    className="bg-white currency"
                    decimalsLimit={2}
                    defaultValue={val.price}
                    // onValueChange={(value, name) => console.log(value, name)}
                  />
                </td>
                <td>{val.jobStatus === 2 ? "Đã hoàn thành" : ""}</td>
                <td className="flex flex-col">
                  {/* <span className="flex gap-5">
                    <i className="bi bi-eye text-lg text-black cursor-pointer"></i>
                    <i className="bi bi-star-fill text-lg text-yellow-300 cursor-pointer"></i>
                  </span> */}
                  <div>
                    <p>Nhà tuyển dụng đánh giá:</p>{" "}
                    <Rating
                      initialRating={val.recruiterRating}
                      onClick={(ratingVal) =>
                        handleRatingClick(ratingVal, val.id)
                      }
                      fullSymbol="bi bi-star-fill text-orange-400"
                      emptySymbol="bi bi-star text-orange-300"
                    />
                  </div>
                  <br />
                  <div>
                    <p>Freelancer đánh giá:</p>{" "}
                    <Rating
                      readonly
                      initialRating={val.freelancerRating}
                      fullSymbol="bi bi-star-fill text-orange-400"
                      emptySymbol="bi bi-star text-orange-300"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {jobData === undefined || jobData.length === 0 ? (
        <div className="w-full mt-2 text-center">
          Chưa có công việc nào đã hoàn tất.
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
