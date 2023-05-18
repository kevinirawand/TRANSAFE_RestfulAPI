import BaseRoutes from '../../../base_claseses/base-routes';
import tryCatch from '../../../utils/tryCatcher';
import paymentshipController from './paymentship-controller';

class PaymentshipRoutes extends BaseRoutes {
   public routes(): void {
      this.router.post(
         '/:transaction_id/paymentship',
         tryCatch(paymentshipController.createSnapTransaction),
      );

      this.router.post(
         '/paymentship/webhookHandling',
         tryCatch(paymentshipController.webhooksPaymentship),
      );
   }
}

export default new PaymentshipRoutes().router;
