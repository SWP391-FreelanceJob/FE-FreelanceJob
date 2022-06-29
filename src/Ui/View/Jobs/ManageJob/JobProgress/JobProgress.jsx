import "./JobProgress.css";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";
import { getJobById } from "@/Api/Service/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import "dayjs/locale/vi";
import { useGetMessageByIdQuery } from "@/App/Models/Message/Message";
import ReactTextareaAutosize from "react-textarea-autosize";

const JobProgress = () => {
  dayjs.locale("vi");
  const listOfSkills = [
    "Java",
    "C# & .NET",
    "SQL",
    "Flutter",
    "iOS",
    "Android",
    "Python",
  ];

  const navigate = useNavigate();
  let { id } = useParams();

  /**
   * @type {[IJob,Function]}
   */
  const [loadedJob, setLoadedJob] = useState({});
  const [isLoadingJob, setIsLoadingJob] = useState(true);

  const {
    data: msgData,
    error: msgError,
    isLoading: msgLoading,
  } = useGetMessageByIdQuery("1");

  useEffect(() => {
    // loadInitialJob();
  }, []);

  const loadInitialJob = async () => {
    setIsLoadingJob(true);
    const result = await getJobById(id);
    setLoadedJob(result);
    setIsLoadingJob(false);
  };
  return (
    <div>
      {!isLoadingJob ? (
        <LoadingOverlay />
      ) : (
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">*insert tên việc*</h1>
            <div className="flex gap-2 items-center">
              <button className="btn btn-sm btn-outline btn-primary hover:!text-white">
                Hoàn tất
              </button>
              <span>
                Trạng thái: <span className="text-emerald-500">Đang làm</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-accent text-white">
              Thông tin công việc
            </button>
            <button className="btn btn-sm btn-info text-white">
              Thông tin chào giá
            </button>
          </div>
          {/* <div việcsName="flex gap-x-4"> */}
          {/* <div className="flex flex-col w-1/3 gap-3">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Thông tin công việc:</h1>
                <div className="flex flex-col card card-compact all-shadow px-8 py-5">
                  <div className="flex w-full">
                    <div className="w-3/4">
                      <div className="">
                        <div className="flex">
                          <h1 className="text-2xl font-semibold mb-3 mr-2">
                            {loadedJob.title}
                          </h1>
                        </div>
                        <p className="text-base mb-3">
                          Khách hàng:{" "}
                          <b className="text-blue-500">
                            {loadedJob.recruiterName}
                          </b>
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
                      Mô tả công việc
                    </h1>
                    <div className="ml-1">{loadedJob.description}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Thông tin chào giá:</h1>
                <div className="flex flex-col card card-compact all-shadow px-8 py-5">
                  <div className="py-2">
                    <h1 className="text-xl font-semibold mb-2">
                      Kinh nghiệm và kỹ năng:
                    </h1>
                    <p className="ml-1">{loadedJob.recruiterName}</p>
                  </div>
                  <div className="py-2">
                    <h1 className="text-xl text-black mb-2 font-semibold">
                      Kế hoạch:
                    </h1>
                    <div className="ml-1">{loadedJob.description}</div>
                  </div>
                  <div className="py-2">
                    <h1 className="text-xl text-black mb-2 font-semibold">
                      Thời gian thực hiện:
                    </h1>
                    <div className="ml-1">{loadedJob.description}</div>
                  </div>
                </div>
              </div>
            </div> */}
          {/* <div className="w-2/3"> */}
          <div className="w-full min-h-screen flex py-2 pl-2">
            <div className="w-1/5">
              <div className="hover:bg-slate-200 p-3 cursor-pointer active:bg-slate-300 bg-slate-100 rounded-sm">
                <p className="">Phạm Hoàng Duy</p>
              </div>
              <div className="hover:bg-slate-200 p-3 cursor-pointer active:bg-slate-300">
                <p className="text-slate-300">Quách Chánh Đại Thanh Thiên</p>
              </div>
            </div>
            <div className="divider divider-horizontal" />
            <div className="w-4/5 flex-col flex gap-2">
              <div className="flex flex-col all-shadow rounded-md p-2 bg-slate-200">
                <p className="text-lg font-semibold mb-2">Lời nhắn</p>
                <ReactTextareaAutosize
                  name="messaging"
                  id=""
                  maxRows={13}
                  className="bg-white rounded-sm min-h-[100px] mb-3"
                />
                <div className="flex justify-between">
                  <p className="link link-secondary">Đính kèm tệm tin</p>
                  <button className="btn btn-sm btn-primary text-white">
                    Gửi
                  </button>
                </div>
              </div>
              <table className="chat-table w-full">
                <thead>
                  <tr>
                    <th>Người gửi</th>
                    <th>Lời nhắn</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {msgData &&
                    msgData.map((msg) => (
                      <tr>
                        <td>
                          <div>
                            {msg.fromAccount.recruiter
                              ? msg.fromAccount.recruiter.fullname
                              : msg.fromAccount.freelancer.fullname}
                            <img
                              src={
                                msg.fromAccount.avatar ??
                                "https://cdn.donmai.us/sample/ea/ab/__nakiri_ayame_hololive_drawn_by_haruhitooo__sample-eaab4cd56f2a051c2dd1b32d606f2aa8.jpg"
                              }
                              className="w-20"
                              alt="usr-avatar"
                            />
                          </div>
                        </td>
                        <td className="h-full">
                          <ReactTextareaAutosize
                            name="message-content"
                            className="w-full min-h-fit bg-white whitespace-pre-line resize-none"
                            id=""
                            disabled
                            rows={5}
                            defaultValue={msg.content}
                          />
                        </td>
                        <td>
                          <div>
                            {dayjs(msg.sentTime)
                              .format("DD/MM/YYYY HH:mm")
                              .toString()}
                          </div>
                          {/* <div>{dayjs().format("HH:mm").toString()}</div> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
        </div>
        // </div>
      )}
    </div>
  );
};

export default JobProgress;
