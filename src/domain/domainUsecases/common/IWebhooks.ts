interface IWebhook {
  execute: (payload: Buffer, signature: string | string[] ) => Promise<{ received: boolean }>
}

export {
  IWebhook
}