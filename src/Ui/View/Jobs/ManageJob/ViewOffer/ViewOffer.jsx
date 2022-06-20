import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import "./ViewOffer.css";

const ViewOffer = () => {
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
    <div className="flex flex-col w-[1200px] mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Chào giá của việc *insert tên*
      </h1>
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
                    <span key={idx} className="text-blue-400">
                      {skill + ", "}{" "}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex justify-end flex-grow">
                <div className="btn btn-accent text-white mr-3 mt-2">
                  Liên hệ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOffer;
