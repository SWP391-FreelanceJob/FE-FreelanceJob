import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";

export default function WorkExp() {
  const introTooltip = `Bản giới thiệu đầy đủ này sẽ giúp người xem hiểu rõ hơn về bạn, chuyên môn và cả những kinh nghiệm mà bạn có được.`;

  return (
    <>
      <div>
        <div className="form-control gap-3">
          <div className="form-input">
            <span>
              Giới thiệu ngắn <span className="text-red-500">*</span>
            </span>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Lập trình C#,..."
                className="input input-bordered input-sm w-full"
              />
              <div className="text-xs text-slate-400 p-1">
                VD: Lập trình viên PHP / Lập trình viên Java/ v.v...
              </div>
            </div>
          </div>
          <div className="form-input">
            <span>
              Giới thiệu bản thân <span className="text-red-500">*</span>
            </span>
            <div className="tooltip w-1/3" data-tip={introTooltip}>
              <textarea
                className="textarea textarea-bordered h-32 w-full"
                placeholder="Giới thiệu về bản thân"
              />
            </div>
          </div>
         
        </div>
      </div>
      <button className="btn secondary-btn text-white btn-sm mt-3">
        Lưu thay đổi
      </button>
    </>
  );
}
