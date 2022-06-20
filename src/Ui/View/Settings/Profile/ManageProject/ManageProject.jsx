import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";
import { useNavigate } from "react-router-dom";
import "./ManageProject.css";

const ManageProject = () => {
  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Hồ sơ năng lực</h1>
        <div className="overflow-x-auto mb-5 max-h-96">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>
                  <span className="flex gap-5">
                    <i
                      onClick={() => navigate("/edit-project/1")}
                      className="bi bi-pencil text-lg text-emerald-500 cursor-pointer"
                    ></i>
                    <i className="bi bi-trash text-lg text-red-500 cursor-pointer"></i>
                  </span>
                </td>
              </tr>
              <tr className="hover">
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>
                  <span className="flex gap-5">
                    <i className="bi bi-pencil text-lg text-emerald-500 cursor-pointer"></i>
                    <i className="bi bi-trash text-lg text-red-500 cursor-pointer"></i>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>
                  <span className="flex gap-5">
                    <i className="bi bi-pencil text-lg text-emerald-500 cursor-pointer"></i>
                    <i className="bi bi-trash text-lg text-red-500 cursor-pointer"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Thêm hồ sơ</h1>
      <div className="flex flex-col w-[1000px] mx-auto">
        <div className="form-control gap-3">
          <div className="form-input">
            <span>
              Hình sản phẩm <span className="text-red-500">*</span>
            </span>
            <div>
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img src="https://i.pravatar.cc/300" />
                </div>
              </div>
              <div className="text-xs text-slate-400">
                1. Kích thước không quá 1MB
                <br />
                2. Định dạng hỗ trợ: jpg, jpeg, png, gif{" "}
              </div>
            </div>
          </div>
          <div className="form-input">
            <span>
              Tên sản phẩm <span className="text-red-500">*</span>
            </span>
            <div className="w-full flex-grow">
              <input
                type="text"
                placeholder="Lập trình C#,..."
                className="input input-bordered input-sm w-full"
              />
            </div>
          </div>

          <div className="form-input">
            <span>
              Giới thiệu về sản phẩm <span className="text-red-500">*</span>
            </span>
            <div className="tooltip w-full flex-grow" data-tip={introTooltip}>
              <textarea
                className="textarea textarea-bordered h-32 w-full"
                placeholder="Giới thiệu về bản thân"
              />
            </div>
          </div>
          <div className="form-input">
            <span>
              Kỹ năng <span className="text-red-500">*</span>
            </span>
            <div className="w-full flex-grow">
              <MultipleSelect />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn secondary-btn text-white btn-md mt-3">
            Thêm
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageProject;
