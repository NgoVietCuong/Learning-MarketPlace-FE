export interface Response<Data = {}> {
  statusCode: number;
  message: string;
  data?: Data;
  error?: string;
}