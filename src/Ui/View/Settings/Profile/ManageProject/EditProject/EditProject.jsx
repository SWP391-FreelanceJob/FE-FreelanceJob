import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";
import { useNavigate } from "react-router-dom";
import "../ManageProject.css";

const EditProject = () => {
  const navigate = useNavigate();
  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;

  return (
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
      <div className="flex gap-2 justify-center">
        <button className="btn secondary-btn text-white btn-sm mt-3">
          Lưu và quay về
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn red-btn text-white btn-sm mt-3"
        >
          Huỷ và quay về
        </button>
      </div>
    </div>
  );
};

export default EditProject;
