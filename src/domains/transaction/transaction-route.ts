import validateCredentials from '../../middlewares/validate-credentials-middleware';
import BaseRoutes from '../../base_claseses/base-routes';
import tryCatch from '../../utils/tryCatcher';
import transactionController from './transaction-controller';
import { createTransactionSchema } from './transaction-schema';
import authToken from '../../middlewares/auth-token-middleware';

class TransactionRoute extends BaseRoutes {
   public routes(): void {
      this.router.post(
         '/',
         [authToken, validateCredentials(createTransactionSchema)],
         tryCatch(transactionController.createTransaction),
      );
   }
}

export default new TransactionRoute().router;
