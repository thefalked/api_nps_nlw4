import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UsersController } from './controllers/UsersController';

const router = Router();

const userController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);
router.get("/users", userController.index);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.index);

router.post("/sendMail", sendMailController.execute);
router.get("/sendMail", sendMailController.index);

router.get("/answer/:note", sendMailController.index);

export { router };
