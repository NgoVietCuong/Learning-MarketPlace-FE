export interface Response<Data = {}> {
  statusCode: number;
  message: string;
  data?: Data;
  error?: string;
}

export interface UploadResponse {
  error?: {
    message: string;
  },
  secure_url?: string;
}