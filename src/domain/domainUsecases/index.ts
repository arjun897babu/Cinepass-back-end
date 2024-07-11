export interface IResponse {
  status: string;
  message: string;
  redirectURL?: string;
  data?:any[]
}