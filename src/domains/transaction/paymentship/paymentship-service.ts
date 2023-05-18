import midtransClient from 'midtrans-client';
import 'dotenv/config';

class PaymentshipService {
   public createSnap = async (payloads: any): Promise<any> => {
      // Create Snap API instance
      let snap = new midtransClient.Snap({
         // Set to true if you want Production Environment (accept real transaction).
         isProduction: process.env.NODE_ENV == 'development' ? false : true,
         serverKey: process.env.SERVER_KEY,
      });

      let parameter = {
         transaction_details: {
            order_id: payloads.transaction_id,
            gross_amount: payloads.amount,
         },
         credit_card: {
            secure: true,
         },
         user_details: {
            username: payloads.username,
            email: payloads.email,
            phone: payloads.phone_number,
         },
      };

      const transaction = await snap.createTransaction(parameter);

      console.info(transaction);

      return transaction;
   };

   public httpWebhook = () => {}

}

export default new PaymentshipService();
