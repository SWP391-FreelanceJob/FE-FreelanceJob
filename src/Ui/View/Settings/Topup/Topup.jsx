import { topup } from "@/Api/Service/Topup/Topup";
import { useGetBalanceByIdQuery } from "@/App/Models/Payment/Payment";
import { notyf } from "@/App/Utils/NotyfSetting";
import { useEffect } from "react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Topup.css";

const Topup = () => {
  const [amount, setAmount] = useState("");
  const [isGettingZPLink, setIsGettingZPLink] = useState(false);
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { data, error, isLoading } = useGetBalanceByIdQuery(
    userState.accountId,
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );

  const topupFn = async () => {
    if (amount == "" || parseInt(amount) < 10000) {
      notyf.error("Số tiền nạp phải lớn hơn 10.000₫");
      return;
    }
    setIsGettingZPLink(true);
    const result = await topup({
      username: userState.fullName,
      userId: userState.accountId,
      amount: parseInt(amount),
    });
    if (result) {
      window.location.href = result.url;
      setIsGettingZPLink(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <label className="label">
          <span className="label-text text-xl">Nạp tiền vào tài khoản</span>
        </label>
        <label className="label">
          <span className="label-text flex-col">
            <p>Số tiền trong tài khoản:</p>
            {isLoading ? (
              "Đang tải..."
            ) : (
              <CurrencyInput
                className="bg-white"
                prefix="VND "
                allowNegativeValue={false}
                disabled
                defaultValue={data.balance}
              />
            )}
          </span>
        </label>
        <CurrencyInput
          className="w-1/3 input-bordered input-secondary border-[1px] p-2 rounded-sm"
          allowNegativeValue={false}
          placeholder="Nhập số tiền bạn muốn nạp"
          maxLength={100000000}
          disabled={isGettingZPLink}
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
        <button
          onClick={topupFn}
          className="btn btn-sm btn-info text-white"
          disabled={isGettingZPLink}
        >
          {isGettingZPLink ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Nạp tiền
            </>
          ) : (
            "Nạp tiền"
          )}
        </button>
      </div>
    </div>
  );
};

export default Topup;
