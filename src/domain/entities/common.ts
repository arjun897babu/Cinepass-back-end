enum Status {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

enum ResponseStatus {
  SUCCESS = 'Success',
  ERROR = 'Error',
}



interface OTPEntity {
  email: string;
  otp: string;
  createdAt: Date
}

export {
  Status,
  OTPEntity,
  ResponseStatus
}

