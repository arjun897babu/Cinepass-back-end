interface IWebhook {
  execute: (payload: Buffer, signature: string) => Promise<{ received: boolean }>
}

export {
  IWebhook
}