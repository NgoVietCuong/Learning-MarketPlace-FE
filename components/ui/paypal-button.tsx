import { PayPalButtons } from '@paypal/react-paypal-js';
import { useToast } from './use-toast';
import { paymentApi } from '@/services/axios/paymentApi';

interface PaypalCheckoutButtonProps {
  courseId: number;
  mutate: any;
}

export default function PayPalCheckoutButton({ courseId, mutate }: PaypalCheckoutButtonProps) {
  const { toast } = useToast();

  return <PayPalButtons 
    style={{ color: 'blue', tagline: false, layout: 'horizontal', height: 40 }}
    createOrder={async (data, actions) => {
      const payment = await paymentApi.createPayment({ courseId });
      return payment?.data?.orderId!;
    }}
    onApprove={async (data, actions) => {
      const orderResponse = await paymentApi.executePayment({ orderId: data.orderID });
      if (orderResponse.error) {
        console.log(orderResponse.message)
        let errorMessage;
        const messages = orderResponse.message;
        if (typeof messages === 'string') errorMessage = messages;
        else errorMessage = messages[0];

        toast({
          variant: 'destructive',
          description: errorMessage,
        });
      } else {
        toast({
          variant: 'success',
          description: `Purchased course successfully!`,
        });
        mutate();
      }
    }}
    onError={(error) => {
      toast({
        variant: 'destructive',
        description: 'Failed to purchase course!',
      });
    }}
  />;
}
