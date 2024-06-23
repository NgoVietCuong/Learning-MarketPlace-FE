import { axiosClient } from '.';
import { Response } from '@/types/response';
import { ExecutePaymentBody } from '@/types/request';
import { CreatePayment } from '@/types/schema';

export const paymentApi = {
  createPayment: (): Promise<Response<CreatePayment>> => axiosClient.post('/payment/create'),
  executePayment: (body: ExecutePaymentBody): Promise<Response> => axiosClient.post('/payment/execute', body),
}