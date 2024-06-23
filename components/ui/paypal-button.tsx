import { PayPalButtons } from '@paypal/react-paypal-js';
import { paymentApi } from '@/services/axios/paymentApi';
import { Response } from '@/types/response';

export default function PayPalCheckoutButton(props: any) {

  return <PayPalButtons 
    style={{ color: 'blue', tagline: false, layout: 'horizontal', height: 40 }}
    createOrder={async (data, actions) => {
      const payment = await paymentApi.createPayment();
      return payment?.data?.orderId!;
    }}
    onApprove={async (data, actions) => {
      const order = await paymentApi.executePayment({ orderId: data.orderID })
      console.log('order', order)
    }}
    onError={(error) => {
      console.log('error', error);
    }}
  />;
}
