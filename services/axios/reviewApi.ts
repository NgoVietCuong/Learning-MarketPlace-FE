import { axiosClient } from ".";
import { CreateReviewBody, UpdateReviewBody } from "@/types/request";
import { Response } from "@/types/response";

export const reviewApi = {
  createReview: (body: CreateReviewBody): Promise<Response> => axiosClient.post('/review', body),
  updateReview: (reviewId: number, body: UpdateReviewBody): Promise<Response> => axiosClient.patch(`/review/${reviewId}`, body)
}