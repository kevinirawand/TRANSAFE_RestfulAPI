import TestController from './user-controller';
import BaseRoutes from '../../base_claseses/base-routes';
import authToken from '../../middlewares/auth-token-middleware';

class UserRoutes extends BaseRoutes {
   public routes(): void {
      this.router.get('/', [authToken], TestController.index);
      this.router.post('/create', TestController.create);
      this.router.get('/show/:id', TestController.show);
      this.router.put('/update/:id', TestController.update);
      this.router.delete('/delete/:id', TestController.delete);
   }
}

export default new UserRoutes().router;
