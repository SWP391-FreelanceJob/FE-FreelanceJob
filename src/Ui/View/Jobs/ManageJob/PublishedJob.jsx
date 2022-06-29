import "./ManageJob.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useOutletContext } from "react-router-dom";

const PublishedJob = () => {
  const navigate = useNavigate();
  const [jobData, _1, _2] = useOutletContext();
  // const jobs = [
  //   { name: "Cy Ganderton", price: "10000000", status: "Đã đăng" },
  //   {
  //     name: "Quality Control Specialist",
  //     price: "20000000",
  //     status: "Đã đăng",
  //   },
  //   { name: "Brice Swyre", price: "3000000", status: "Đã đăng" },
  // ];
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
                <td>{val.title}</td>
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
                <td>{val.jobStatus === 0 ? 'Đã đăng':''}</td>
                <td>
                  <span className="flex gap-5">
                    <i
                      onClick={() => navigate(`/offer/${val.id}`)}
                      className="bi bi-eye text-lg text-black cursor-pointer"
                    ></i>
                    <i className="bi bi-trash text-lg text-red-500 cursor-pointer"></i>
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
    </div>
  );
};

export default PublishedJob;
