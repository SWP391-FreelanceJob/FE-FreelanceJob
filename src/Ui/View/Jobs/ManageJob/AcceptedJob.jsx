import "./ManageJob.css";
import CurrencyInput from "react-currency-input-field";

export default function AcceptedJob() {
  const jobs = [
    { name: "Cy Ganderton", price: "10000000", status: "Đang làm" },
    {
      name: "Quality Control Specialist",
      price: "20000000",
      status: "Đang làm",
    },
    { name: "Brice Swyre", price: "3000000", status: "Đang làm" },
  ];
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
          {jobs.map((val, idx) => (
            <tr className="hover job-table" key={idx}>
              <td>{val.name}</td>
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
              <td>{val.status}</td>
              <td>
                <span className="flex gap-5">
                  <i className="bi bi-eye text-lg text-black cursor-pointer"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}