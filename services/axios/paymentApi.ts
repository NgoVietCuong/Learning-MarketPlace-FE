import { axiosClient } from '.';
import { Response } from '@/types/response';
import { ExecutePaymentBody, OnboardMerchantBody } from '@/types/request';
import { CreatePayment, OnboardMerchant } from '@/types/schema';

export const paymentApi = {
  createPayment: (): Promise<Response<CreatePayment>> => axiosClient.post('/payment/create'),
  executePayment: (body: ExecutePaymentBody): Promise<Response> => axiosClient.post('/payment/execute', body),
  onboardMerchant: (body: OnboardMerchantBody): Promise<Response<OnboardMerchant>> => axiosClient.post('/payment/onboard', body),
}