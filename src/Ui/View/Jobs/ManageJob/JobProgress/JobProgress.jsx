import "./JobProgress.css";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";
import { getJobById } from "@/Api/Service/Job";
import LoadingOverlay from "@/Ui/Components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import "dayjs/locale/vi";

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
        <div className="flex flex-col gap-y-3">
          <div className="flex">
            <div className="w-1/3 flex flex-col">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default JobProgress;
