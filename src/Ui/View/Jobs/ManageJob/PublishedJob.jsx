import "./ManageJob.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useDeleteJobMutation } from "@/App/Models/Job/Job";

const PublishedJob = () => {
  const [jobToDelete, setJobToDelete] = useState();

  const navigate = useNavigate();
  const [jobData, _1, _2] = useOutletContext();

  const [delJob] = useDeleteJobMutation();
  // const jobs = [
  //   { name: "Cy Ganderton", price: "10000000", status: "Đã đăng" },
  //   {
  //     name: "Quality Control Specialist",
  //     price: "20000000",
  //     status: "Đã đăng",
  //   },
  //   { name: "Brice Swyre", price: "3000000", status: "Đã đăng" },
  // ];

  const deleteJob = async () => {
    console.log("delete offer: ", jobToDelete);
    const resp = await delJob(jobToDelete);
    if (resp.error) {
      notyf.error(resp.error.messages[0].err_msg);
    } else {
      notyf.success("Xóa việc thành công");
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
        {jobData === undefined || jobData.length === 0 ? (
          <></>
        ) : (
          <tbody>
            {jobData.map((val, idx) => (
              <tr className="hover job-table" key={idx}>
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
                    prefix="VND "
                    name="gia-thau"
                    className="bg-white currency"
                    decimalsLimit={2}
                    defaultValue={val.price}
                    // onValueChange={(value, name) => console.log(value, name)}
                  />
                </td>
                <td>{val.jobStatus === 0 ? "Đã đăng" : ""}</td>
                <td>
                  <span className="flex gap-5">
                    <i
                      onClick={() => navigate(`/offer/${val.id}`)}
                      className="bi bi-eye text-lg text-black cursor-pointer"
                    ></i>
                    <i
                      onClick={() => navigate(`/edit-job`, { state: val })}
                      className="bi bi-pencil text-lg text-yellow-600 cursor-pointer"
                    ></i>
                    <i
                      onClick={() => navigate(`/job-progress/${val.id}`)}
                      className="bi bi-chat-dots-fill text-lg text-blue-600 cursor-pointer"
                    />
                    <label
                      onClick={() => setJobToDelete(val.id)}
                      htmlFor="confirm-modal"
                      className="bi bi-trash text-lg text-red-500 cursor-pointer"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {jobData === undefined || jobData.length === 0 ? (
        <div className="w-full mt-2 text-center">Bạn chưa đăng việc nào.</div>
      ) : (
        <></>
      )}
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Bạn có chắc?</h3>
          <p className="py-4">
            Xoá việc này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xoá?
          </p>
          <div className="modal-action">
            <label
              onClick={deleteJob}
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

export default PublishedJob;
