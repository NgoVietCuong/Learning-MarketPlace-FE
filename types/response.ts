export type Response<Data = {}> = {
  statusCode: number;
  message: string | string[];
  data?: Data;
  error?: string;
}

export type UploadResponse = {
  error?: {
    message: string;
  },
  secure_url?: string;
  playback_url?: string;
  duration?: number;
}