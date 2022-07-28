import "./ManageOffer.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OfferStatus } from "@/App/Constant";
import { useGetOffersByFreelancerIdQuery } from "@/App/Models/Offer/Offer";
import { useSelector } from "react-redux";

export default function RejectedOffer() {
  const userState = useSelector((state) => state.user);

  const {
    data: offersList,
    isLoading,
    error,
  } = useGetOffersByFreelancerIdQuery(userState.userId, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data: data?.filter((offer) => offer.status === "REJECTED"),
      error,
      isLoading,
    }),
    refetchOnFocus: true,
  });

  const navigate = useNavigate();

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
                  />
                </td>
                <td>{OfferStatus[val.status]}</td>
                <td>
                  {/* <span className="flex gap-5">
                    <i className="bi bi-eye text-lg text-black cursor-pointer"></i>
                  </span> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
