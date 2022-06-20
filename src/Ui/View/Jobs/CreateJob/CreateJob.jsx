import CurrencyInput from "react-currency-input-field";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import local from "date-fns/locale/vi";

import { useState } from "react";

import MultipleSelect from "@/Ui/Components/MultipleSelect/MultipleSelect";
import "./CreateJob.css";

const CreateJob = () => {
  registerLocale("vi", local);
  const [selectedDate, setSelectedDate] = useState();

  return (
    <div className="w-[700px] mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">Đăng việc tuyển freelancer</h1>
        <div className="flex w-full mt-5">
          <div className="w-1/6 text-center mt-3">
            <i className="bi bi-folder2-open create-job-icon icon-colour" />
          </div>
          <div className="w-5/6">
            <h1 className="text-xl font-semibold">Thông tin công việc</h1>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Tên công việc</span>
              </label>
              <input
                type="text"
                placeholder="VD: Thiết kế trang web bán hàng"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mô tả công việc</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="VD: Các giao diện website cần thiết kế như trang chủ, xem hàng, thanh toán..."
              ></textarea>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Kỹ năng cần thiết</span>
              </label>
              <MultipleSelect />
            </div>
          </div>
        </div>
        <div className="flex w-full mt-5">
          <div className="w-1/6 text-center mt-3">
            <i className="bi bi-cash-stack create-job-icon icon-colour" />
          </div>
          <div className="w-5/6">
            <h1 className="text-xl font-semibold">Thông tin ngân sách</h1>
            <div className="form-control">
              <label className="label pl-0">
                <span className="label-text">Ngân sách dự tính</span>
              </label>
              <div className="flex w-full gap-x-4">
                <div className="flex">
                  <CurrencyInput
                    id="input-example"
                    allowNegativeValue={false}
                    className="input input-bordered border-r-0 rounded-tr-none rounded-br-none"
                    name="gia-thau"
                    placeholder="Từ"
                    decimalsLimit={2}
                    maxLength={100000000}
                    // onValueChange={(value, name) => console.log(value, name)}
                  />
                  <span className="border-t-[1px] border-b-[1px] border-r-[1px] pt-3 vnd-border pr-2">
                    VND
                  </span>
                </div>

                <div className="flex">
                  <CurrencyInput
                    id="input-example"
                    allowNegativeValue={false}
                    className="input input-bordered border-r-0 rounded-tr-none rounded-br-none"
                    name="gia-thau"
                    placeholder="Đến"
                    decimalsLimit={2}
                    maxLength={100000000}
                    // onValueChange={(value, name) => console.log(value, name)}
                  />
                  <span className="border-t-[1px] border-b-[1px] border-r-[1px] pt-3 vnd-border pr-2">
                    VND
                  </span>
                </div>
              </div>
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Hạn chót chào giá</span>
              </label>
              <DatePicker
                locale="vi"
                selected={selectedDate}
                onChangeRaw={(e) => e.preventDefault()}
                dateFormat="EEEE, dd/MM/yyyy"
                minDate={new Date()}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                className="w-full border-gray-300 focus-visible:outline-none mr-2 input input-bordered "
                allowSameDay={false}
              />
            </div>
          </div>
        </div>
        <div className="btn btn-secondary btn-md mt-3 text-white">Đăng việc</div>
      </div>
    </div>
  );
};

export default CreateJob;
