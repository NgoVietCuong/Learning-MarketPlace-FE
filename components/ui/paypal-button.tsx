import { PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalCheckoutButton(props: any) {
  return <PayPalButtons 
    style={{ color: 'blue', tagline: false, layout: 'horizontal', height: 40 }}
    createOrder={(data, actions) => {
      return actions.order.create({
        intent: 'CAPTURE',
        purchase_units: [{
          description: 'ahihi',
          amount: {
            currency_code: 'USD',
            value: '100',
          },
        }],
      });
    }}
    onApprove={async (data, actions) => {
      console.log("mlem mlem")
      const order = await actions.order!.capture();
      console.log('order', order);
    }}
    onError={(error) => {
      console.log('error', error);
    }}
  />;
}
