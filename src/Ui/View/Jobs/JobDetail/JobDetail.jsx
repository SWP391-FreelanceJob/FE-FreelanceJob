import "./JobDetail.css";
import CurrencyInput from "react-currency-input-field";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";

const JobDetail = () => {
  const listOfSkills = [
    "Java",
    "C# & .NET",
    "SQL",
    "Flutter",
    "iOS",
    "Android",
    "Python",
  ];

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex">
        <div className="w-2/3 flex flex-col">
          <div className="flex w-full">
            <div className="w-3/4">
              <div className="">
                <div className="flex">
                  <h1 className="text-2xl font-semibold mb-3 mr-2">
                    Cần thiết kế website bán tài liệu kiểu như tailieu.vn
                  </h1>
                </div>
                <p className="text-base mb-3">
                  Khách hàng: <b className="text-blue-500">Amelia</b>
                </p>
                <div className="flex">
                  <p className="mr-3">Kỹ năng:</p>
                  <div className="flex gap-2 mb-2 pt-1">
                    <div className="badge badge-info badge-outline text-white">
                      .NET
                    </div>
                    <div className="badge badge-info badge-outline text-white">
                      SQL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-2">
            <h1 className="text-xl text-black mb-2 font-semibold">
              Thông tin công việc
            </h1>
            <div className="ml-1">
              Cần thiết kế website bán tài liệu kiểu như tailieu.vn
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col">
          <div className="card card-compact all-shadow px-8 py-5 mb-3">
            <h1 className="text-xl font-bold pb-3">Thông tin dự án</h1>
            <dl className="flex flex-col gap-1">
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Ngày đăng</dt>
                <dd className="w-1/2">31/05/2022, 16:41</dd>
              </div>
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Hạn chót chào giá</dt>
                <dd className="w-1/2">27 ngày 19 giờ</dd>
              </div>
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Ngân sách</dt>
                <dd className="w-1/2">3.000.000đ - 5.000.000đ</dd>
              </div>
            </dl>
          </div>
          <div className="card card-compact all-shadow px-8 py-5 mb-3">
            <h1 className="text-xl font-bold pb-3">Thông tin chào giá</h1>
            <dl className="flex flex-col gap-1">
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Chào giá</dt>
                <dd className="w-1/2">69</dd>
              </div>
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Trung bình</dt>
                <dd className="w-1/2">4.230.000đ</dd>
              </div>
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Thấp nhất</dt>
                <dd className="w-1/2">2.000.000đ</dd>
              </div>
              <div className="flex">
                <dt className="w-1/2 text-slate-400">Cao nhất</dt>
                <dd className="w-1/2">5.000.000đ</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="card card-compact all-shadow px-8 py-5">
        <h1 className="text-xl font-bold pb-2">Chào giá</h1>
        <div className="flex gap-3">
          <div className="form-control w-1/2">
            <label className="label pl-0">
              <span className="label-text">Đề xuất chi phí*</span>
            </label>
            <div className="flex">
              {/* <input
                    type="text"
                    placeholder="Chi phí thực nhận"
                    className="input input-bordered w-full max-w-xs border-r-0 rounded-tr-none rounded-br-none"
                  /> */}
              <CurrencyInput
                id="input-example"
                allowNegativeValue={false}
                className="input input-bordered w-full border-r-0 rounded-tr-none rounded-br-none"
                name="gia-thau"
                placeholder="Chi phí thực nhận"
                decimalsLimit={2}
                // onValueChange={(value, name) => console.log(value, name)}
              />
              <span className="border-t-[1px] border-b-[1px] border-r-[1px] pt-3 vnd-border pr-2">
                VND
              </span>
            </div>
          </div>
          <div className="form-control w-1/2">
            <label className="label pl-0">
              <span className="label-text">Dự kiến hoàn thành trong*</span>
            </label>
            <select
              defaultValue="complete-time"
              className="select select-bordered focus:outline-0"
            >
              <option disabled value="complete-time">
                Thời gian hoàn thành
              </option>
              <option>1 Ngày</option>
              <option>2 Ngày</option>
              <option>3 Ngày</option>
              <option>5 Ngày</option>
              <option>10 Ngày</option>
              <option>1 Tuần</option>
              <option>2 Tuần</option>
              <option>3 Tuần</option>
              <option>5 Tuần</option>
            </select>
          </div>
        </div>
        <div className="form-control">
          <label className="label pl-0">
            <span className="label-text">
              Bạn có những kinh nghiệm và kỹ năng nào phù hợp với dự án này?*
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Kinh nghiệm"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label pl-0">
            <span className="label-text">
              Bạn dự định thực hiện dự án này như thế nào?*
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Dự định"
          ></textarea>
        </div>
        <div className="offer-btn btn btn-sm mt-3 text-white">Gửi chào giá</div>
      </div>
      <div className="px-8 py-5">
        <h1 className="text-xl font-bold pb-2">Danh sách chào giá</h1>
        <div className="card card-compact all-shadow border-[1px] rounded-md">
          <div className="flex pb-2">
            <div className="w-1/6 flex flex-col items-center">
              <div className="avatar justify-center my-2">
                <div className="rounded-full">
                  <img
                    className="usr-avatar !w-24"
                    src="https://i.pravatar.cc/1000"
                    alt=""
                  />
                </div>
              </div>
              <ReadOnlyRating name={0} rating={4} />
            </div>
            <div className="w-5/6">
              <div className="flex">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl text-blue-600 mt-2">Tên FL</h1>
                  <h1 className="text-base text-slate-500 mb-2">
                    Short Description
                  </h1>
                  {/* <h1 className="text-xl text-blue-600 mt-2">Tên FL</h1> */}
                  <span>
                    Kỹ năng: &nbsp;
                    {listOfSkills.map((skill, idx) => (
                      <span key={idx} className="text-blue-400">{skill + ", "} </span>
                    ))}
                  </span>
                </div>
                <div className="flex justify-end flex-grow">
                  <div className="btn btn-accent text-white mr-3 mt-2">Liên hệ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
