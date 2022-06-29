import "./ManageJob.css";
import CurrencyInput from "react-currency-input-field";
import { useOutletContext } from "react-router-dom";

export default function DoneJob() {
  const [_1, _2, jobData] = useOutletContext();

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
                <td>{val.title}</td>
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
                <td>{val.jobStatus}</td>
                <td>
                  <span className="flex gap-5">
                    <i className="bi bi-eye text-lg text-black cursor-pointer"></i>
                    <i className="bi bi-star-fill text-lg text-yellow-300 cursor-pointer"></i>
                  </span>
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
