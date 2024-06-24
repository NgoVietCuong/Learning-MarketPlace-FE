import { axiosClient } from '.';
import { Response } from '@/types/response';
import { ExecutePaymentBody } from '@/types/request';
import { CreatePayment, OnboardMerchant } from '@/types/schema';

export const paymentApi = {
  onboardMerchant: (): Promise<Response<OnboardMerchant>> => axiosClient.post('/payment/onboard'),
  createPayment: (): Promise<Response<CreatePayment>> => axiosClient.post('/payment/create'),
  executePayment: (body: ExecutePaymentBody): Promise<Response> => axiosClient.post('/payment/execute', body),
}