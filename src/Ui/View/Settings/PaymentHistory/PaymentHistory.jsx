import { useGetPaymentHistoryByIdQuery } from "@/App/Models/Payment/Payment";
import "./PaymentHistory.css";

import dayjs from "dayjs";
import "dayjs/locale/vi";
import CurrencyInput from "react-currency-input-field";

const PaymentHistory = () => {
  dayjs.locale("vi");
  const { data, error, isLoading } = useGetPaymentHistoryByIdQuery("1", {
    refetchOnFocus: true,
    pollingInterval: 10000,
  });
  const getStatus = (status) => {
    switch (status) {
      case "SUCCESS":
        return (
          <div className="text-green-500">
            Hoàn thành <i className="bi bi-check-circle-fill " />
          </div>
        );
      case "FAILED":
        return (
          <div className="text-red-500">
            Thất bại <i className="bi bi-x-circle-fill" />
          </div>
        );
      default:
        return (
          <div className="">
            Đang xử lý <i className="bi bi-arrow-repeat" />
          </div>
        );
    }
  };

  const getDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY HH:mm").toString();
  };

  return (
    <div className="ml-3">
      <div className="overflow-x-auto">
        {isLoading ? (
          "Loading..."
        ) : (
          <table className="table w-full payment-table">
            <thead>
              <tr>
                <th>Mã giao dịch</th>
                <th>Loại giao dịch</th>
                <th>Thông tin giao dịch</th>
                <th>Trạng thái</th>
                <th>Số tiền</th>
                <th>Ngày giao dịch</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((trans) => (
                  <tr key={trans.transactionCode}>
                    <td>{trans.transactionCode}</td>
                    <td>{trans.transactionName}</td>
                    <td>{trans.description}</td>
                    <td>{getStatus(trans.status)}</td>
                    <td>
                      <CurrencyInput
                        className="bg-white"
                        allowNegativeValue={false}
                        disabled
                        defaultValue={trans.amount}
                      />
                    </td>
                    <td>{getDate(trans.transactionDate)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
