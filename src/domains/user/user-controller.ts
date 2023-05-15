import { Request, Response } from 'express';
import IController from '../../interfaces/controller-interface';

let data: Array<any> = [
   {
      id: 1,
      name: 'Kevin',
      age: 19,
   },
   {
      id: 2,
      name: 'Iksan',
      age: 18,
   },
   {
      id: 3,
      name: 'Ahmed',
      age: 20,
   },
];

class TestController implements IController {
   index(req: Request, res: Response): Response {
      return res.json(req.app.locals.user);
   }

   create(req: Request, res: Response): Response {
      console.info(req.body);
      data.push(req.body);

      return res.json(data);
   }

   show(req: Request, res: Response): Response {
      return res.json(data.filter((d) => d.id == req.params.id));
   }

   update(req: Request, res: Response): Response {
      let user = data.find((d) => d.id == req.params.id);

      user.name = req.body.name;

      return res.json(data);
   }

   delete(req: Request, res: Response): Response {
      // delete data[parseInt(req.params.id) - 1];

      return res.json(data);
   }
}

export default new TestController();
