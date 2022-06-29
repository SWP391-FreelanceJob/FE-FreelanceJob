import "./ManageOffer.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { OfferStatus } from "@/App/Constant";
import {
  useDeleteOfferByIdMutation,
  useGetOffersByFreelancerIdQuery,
} from "@/App/Models/Offer/Offer";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useSelector } from "react-redux";

const OfferingOffer = () => {
  const [offerToDelete, setOfferToDelete] = useState();

  const [delOffer] = useDeleteOfferByIdMutation();

  const userState = useSelector((state) => state.user);

  const {
    data: offersList,
    isLoading,
    error,
  } = useGetOffersByFreelancerIdQuery(userState.userId, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data: data?.filter((offer) => offer.status === "OFFERING"),
      error,
      isLoading,
    }),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  const navigate = useNavigate();

  const deleteOffer = async () => {
    console.log("delete offer: ", offerToDelete);
    const resp = await delOffer(offerToDelete);
    if (resp.error) {
      notyf.error(resp.error.messages[0].err_msg);
    } else {
      notyf.success("Xóa chào giá thành công");
    }
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
                  <span className="flex gap-5">
                    <i
                      onClick={() => navigate(`/job/${val.jobId}`)}
                      className="bi bi-eye text-lg text-black cursor-pointer"
                    />

                    <label
                      onClick={() => setOfferToDelete(val.offerId)}
                      htmlFor="confirm-modal"
                      className="bi bi-trash text-lg text-red-500 cursor-pointer"
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Bạn có chắc?</h3>
          <p className="py-4">
            Xoá việc này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xoá?
          </p>
          <div className="modal-action">
            <label
              onClick={deleteOffer}
              htmlFor="confirm-modal"
              className="btn btn-sm text-white hover:!text-white btn-outline btn-accent"
            >
              Chấp nhận xoá
            </label>
            <label
              htmlFor="confirm-modal"
              className="btn btn-sm offer-btn text-white"
            >
              Huỷ và quay về
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingOffer;
