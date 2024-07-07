enum Status {
  active = "active",
  blocked = "blocked",
}


interface OTPEntity {
  email: string;
  otp: string;
  createdAt: Date
}

export {
  Status,
  OTPEntity
}

