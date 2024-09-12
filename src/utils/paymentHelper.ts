function calculateTotalAmount<T extends number>(totalSeat: T, chargePerSeat: T, serviceCharge: T): number {
  return (totalSeat * chargePerSeat) + (totalSeat + serviceCharge)
}

export {
  calculateTotalAmount
}