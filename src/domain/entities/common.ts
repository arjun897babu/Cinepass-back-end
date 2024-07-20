
enum ResponseStatus {
  SUCCESS = 'Success',
  ERROR = 'Error',
}

enum ApprovalStatus{
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

interface OTPEntity {
  email: string;
  otp: string;
  createdAt: Date
}

export {
  OTPEntity,
  ResponseStatus,
  ApprovalStatus
}

