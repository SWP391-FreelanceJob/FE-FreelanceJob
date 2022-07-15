export const Constant = {
  ERROR_PLACEHOLDER: "placeholder",
};
// export enum ROLE {
//   Admin = "Admin",
//   User = "User",
// }

export const TokenConstant = {
  JW_TOKEN: "jwToken",
  REFRESH_TOKEN: "refreshToken",
}

export const Status = {
  SUCCESS: "Thành công",
  FAILED: "Thất bại",
};

export const OfferStatus = {
  OFFERING: "Đang chào giá",
  ACCEPTED: "Đã được chấp nhận",
  REJECTED: "Đã bị từ chối"
}

export const JobStatusFromInt = {
  0: "Chưa xác nhận",
  1: "Đang thực hiện",
  2: "Đã hoàn thành",
  3: "Việc bị khoá",
  4: "Yêu cầu hoàn thành"
}

export const JobStatus = {
  PUBLISHED: "Chưa xác nhận",
  ACCEPTED: "Đang thực hiện",
  DONE: "Đã hoàn thành",
  BANNED: "Việc bị khoá",
  REQUEST_FOR_COMPLETE: "Yêu cầu hoàn thành"
}

export const AppoinmentStatus = {
  "CONFIRM":"0",
  "COMPLETE":"1",
  "CLIENT_CANCEL":'2',
  "CLINIC_CANCEL":"3",
  "CLIENT_NOT_COME":"4",
}