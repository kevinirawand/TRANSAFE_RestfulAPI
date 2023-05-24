import { Request, Response } from 'express';
import IController from '../../interfaces/controller-interface';
import UserService from './user-service';

class UserController implements IController {
   async index(req: Request, res: Response): Promise<Response> {
      const users = await UserService.getAll();

      return res.status(200).json({
         code: 'SUCCESS_GET_ALL_USERS',
         status: 'OK',
         data: {
            message: 'TESTING FROM STAGING',
            users,
         },
      });
   }

   async create(req: Request, res: Response): Promise<Response> {
      await UserService.create(req.body);

      return res.status(200).json({
         code: 'SUCCESS_CREATE_USER',
         status: 'OK',
         data: {
            message: 'User created!',
         },
      });
   }

   async show(req: Request, res: Response): Promise<Response> {
      const user = await UserService.findById(
         parseInt(req.params.user_id || ''),
      );

      return res.status(200).json({
         code: 'SUCCESS_GET_USER',
         status: 'OK',
         data: {
            user,
         },
      });
   }

   async update(req: Request, res: Response): Promise<Response> {
      await UserService.update(parseInt(req.params.user_id || ''), req.body);

      return res.status(200).json({
         code: 'SUCCESS_UPDATE_USER',
         status: 'OK',
         data: {
            message: 'User Updated',
         },
      });
   }

   async delete(req: Request, res: Response): Promise<Response> {
      await UserService.delete(parseInt(req.params.user_id || ''));
      return res.status(200).json({
         code: 'SUCCESS_DELETE_USER',
         status: 'OK',
         data: {
            message: 'User Deleted',
         },
      });
   }
}

export default new UserController();
