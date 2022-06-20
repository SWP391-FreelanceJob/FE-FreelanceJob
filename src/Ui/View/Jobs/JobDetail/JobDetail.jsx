import "./JobDetail.css";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";
import { getJobById } from "@/Api/Service/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  /**
   * @type {[IJob,Function]}
   */
  const [loadedJob, setLoadedJob] = useState({});
  const [isLoadingJob, setIsLoadingJob] = useState(true);

  useEffect(() => {
    loadInitialJob();
  }, []);

  const loadInitialJob = async () => {
    setIsLoadingJob(true);
    const result = await getJobById(id);
    setLoadedJob(result);
    setIsLoadingJob(false);
  };
  return (
    <div>
      {isLoadingJob ? (
        <LoadingOverlay />
      ) : (
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-2/3 flex flex-col">
              <div className="flex w-full">
                <div className="w-3/4">
                  <div className="">
                    <div className="flex">
                      <h1 className="text-2xl font-semibold mb-3 mr-2">
                        {loadedJob.shortDescription}
                      </h1>
                    </div>
                    <p className="text-base mb-3">
                      Khách hàng:{" "}
                      <b className="text-blue-500">{loadedJob.recruiterName}</b>
                    </p>
                    <div className="flex">
                      <p className="mr-3">Kỹ năng:</p>
                      <div className="flex gap-2 mb-2 pt-1">
                        {loadedJob.skills.map((e) => (
                          <div
                            key={e.skillId}
                            className="badge badge-info badge-outline text-white"
                          >
                            {e.skillName}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <h1 className="text-xl text-black mb-2 font-semibold">
                  Thông tin công việc
                </h1>
                <div className="ml-1">{loadedJob.description}</div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col">
              <div className="card card-compact all-shadow px-8 py-5 mb-3">
                <h1 className="text-xl font-bold pb-3">Thông tin dự án</h1>
                <dl className="flex flex-col gap-1">
                  <div className="flex">
                    <dt className="w-1/2 text-slate-400">Ngày đăng</dt>
                    <dd className="w-1/2">
                      {dayjs(loadedJob.createdDate).format(
                        "DD/MM/YYYY HH:MM:SS"
                      )}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/2 text-slate-400">Hạn chót chào giá</dt>
                    <dd className="w-1/2">
                      {dayjs(loadedJob.duration).format("DD/MM/YYYY HH:MM:SS")}
                    </dd>
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
                    <dd className="w-1/2">{loadedJob.noOfOffer}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/2 text-slate-400">Trung bình</dt>
                    <dd className="w-1/2">
                      <CurrencyInput
                        className="w-min bg-slate-100"
                        prefix="VND "
                        allowNegativeValue={false}
                        disabled
                        defaultValue={loadedJob.offerInfo.avg}
                      />
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/2 text-slate-400">Thấp nhất</dt>
                    <dd className="w-1/2">
                      <CurrencyInput
                        className="w-min bg-slate-100"
                        prefix="VND "
                        allowNegativeValue={false}
                        disabled
                        defaultValue={loadedJob.offerInfo.lowest}
                      />
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-1/2 text-slate-400">Cao nhất</dt>
                    <dd className="w-1/2">
                      <CurrencyInput
                        className="w-min bg-slate-100"
                        prefix="VND "
                        allowNegativeValue={false}
                        disabled
                        defaultValue={loadedJob.offerInfo.highest}
                      />
                    </dd>
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
                  Bạn có những kinh nghiệm và kỹ năng nào phù hợp với dự án
                  này?*
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
            <div className="offer-btn btn btn-sm mt-3 ">Gửi chào giá</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
