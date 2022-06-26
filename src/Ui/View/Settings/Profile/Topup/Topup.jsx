import { topup } from "@/Api/Service/Topup/Topup";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import "./Topup.css";

const Topup = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const topupFn = async () => {
    if (amount == "" || parseInt(amount) < 10000) {
      notyf.error("Số tiền nạp phải lớn hơn 10.000₫");
      return;
    }
    const result = await topup({
      username: "Ayame",
      userId: "1",
      amount: parseInt(amount),
    });
    console.log(result);
    if (result) {
      window.location.href = result.url;
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <label className="label justify-center">
          <span className="label-text text-xl">Nạp tiền vào tài khoản</span>
        </label>
        <CurrencyInput
          className="w-1/3 input-bordered input-secondary border-[1px] p-2 rounded-sm"
          allowNegativeValue={false}
          placeholder="Nhập số tiền bạn muốn nạp"
          maxLength={100000000}
          value={amount}
          onValueChange={(value, name) => {
            if (value < 100000000) setAmount(value);
          }}
        />
        <div className="text-xs text-slate-400 leading-relaxed">
          1. Thanh toán sẽ được thực hiện thông qua cổng ZaloPay.
          <br />
          2. Hiện tại Freelancevn chỉ hỗ trợ thẻ ghi nợ nội địa (ATM)
          <br />
          3. Số tiền nạp tối thiểu là 10 ngàn đồng và tối đa là 10 triệu đồng.
        </div>
        <button onClick={topupFn} className="btn btn-sm btn-info text-white">
          Nạp tiền
        </button>
      </div>
    </div>
  );
};

export default Topup;
