import ReadOnlyRating from "@/Ui/Components/Rating/ReadOnlyRating";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import "./ViewOffer.css";

const ViewOffer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[1200px] mx-auto gap-5">
      <h1 className="text-3xl font-bold mb-4">
        Chào giá của việc *insert tên*
      </h1>
      <div className="indicator">
        <span className="indicator-item badge bg-green-600 border-green-600">
          <i className="bi bi-check-lg text-xl text-white"></i>
        </span>
        <div className="card card-compact all-shadow border-[1px] rounded-md border-green-600">
          <div className="flex pb-2">
            <div className="w-2/3">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-2 pt-2 pl-2">
                  <h1 className="text-base font-semibold">
                    Giới thiệu kinh nghiệm và kỹ năng
                  </h1>
                  <h1 className="text-sm">
                    Chào bạn mình là sinh viên vừa tốt nghiệp Đại Học FPT với
                    chương trình ISIS.
                  </h1>
                </div>
                <div className="flex flex-col gap-2 pt-2 pl-2">
                  <h1 className="text-base font-semibold">
                    Kế hoạch thực hiện công việc
                  </h1>
                  <h1 className="text-sm">
                    Mình định hướng trong tương lai sẽ trở thành lập trình viên
                    chuyên nghiệp vì vậy những cơ hội được làm việc lập trình
                    như thế này sẽ giúp mình trau dồi kỹ năng cần thiết trong
                    tương lai
                  </h1>
                </div>
                <div className="flex flex-col gap-2 pt-2 pl-2">
                  <h1 className="text-base font-semibold">
                    Thời gian thực hiện công việc
                  </h1>
                  <h1 className="text-sm">
                    Mình sẽ thực hiện trong: *insert tuần*
                  </h1>
                </div>
              </div>
            </div>
            <div className="divider divider-horizontal" />
            <div className="flex w-1/3 flex-col gap-4">
              <div className="flex gap-x-3">
                <div className="flex flex-col items-center">
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
                <div className="flex flex-col gap-x-3">
                  <h1 className="text-xl text-blue-600 mt-2 mr-2">
                    Đại Thanh Thiên
                  </h1>
                  <h1 className="text-base text-slate-500 mb-2">
                    Short Description
                  </h1>
                  <div className="flex justify-start w-full gap-2">
                    <div className="btn btn-accent text-white">Liên hệ</div>
                    <div className="btn btn-secondary text-white">
                      Giao việc
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2 pl-2">
                <h1 className="text-base font-semibold">Chào giá</h1>
                <h1 className="text-sm">
                  <CurrencyInput
                    className="w-min bg-white"
                    prefix="VND "
                    allowNegativeValue={false}
                    disabled
                    defaultValue={6942000}
                  />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-compact all-shadow border-[1px] rounded-md border-red-600">
        <div className="flex pb-2">
          <div className="w-2/3">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-2 pt-2 pl-2">
                <h1 className="text-base font-semibold">
                  Giới thiệu kinh nghiệm và kỹ năng
                </h1>
                <h1 className="text-sm">
                  Chào bạn mình là sinh viên vừa tốt nghiệp Đại Học FPT với
                  chương trình ISIS.
                </h1>
              </div>
              <div className="flex flex-col gap-2 pt-2 pl-2">
                <h1 className="text-base font-semibold">
                  Kế hoạch thực hiện công việc
                </h1>
                <h1 className="text-sm">
                  Mình định hướng trong tương lai sẽ trở thành lập trình viên
                  chuyên nghiệp vì vậy những cơ hội được làm việc lập trình như
                  thế này sẽ giúp mình trau dồi kỹ năng cần thiết trong tương
                  lai
                </h1>
              </div>
              <div className="flex flex-col gap-2 pt-2 pl-2">
                <h1 className="text-base font-semibold">
                  Thời gian thực hiện công việc
                </h1>
                <h1 className="text-sm">
                  Mình sẽ thực hiện trong: *insert tuần*
                </h1>
              </div>
            </div>
          </div>
          <div className="divider divider-horizontal" />
          <div className="flex w-1/3 flex-col gap-4">
            <div className="flex gap-x-3">
              <div className="flex flex-col items-center">
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
              <div className="flex flex-col gap-x-3">
                <h1 className="text-xl text-blue-600 mt-2 mr-2">
                  Quách Chánh Đại Thanh Thiên
                </h1>
                <h1 className="text-base text-slate-500 mb-2">
                  Short Description
                </h1>
                <div className="flex w-full justify-start">
                  <div className="flex justify-start w-full gap-2">
                    <div className="btn btn-accent text-white">Liên hệ</div>
                    <div className="btn btn-secondary text-white">
                      Giao việc
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2 pl-2">
              <h1 className="text-base font-semibold">Chào giá</h1>
              <h1 className="text-sm">
                <CurrencyInput
                  className="w-min bg-white"
                  prefix="VND "
                  allowNegativeValue={false}
                  disabled
                  defaultValue={6942000}
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="btn red-btn w-52 text-white"
      >
        Quay về
      </div>
    </div>
  );
};

export default ViewOffer;
