import { Router } from 'express';

import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UsersController } from './controllers/UsersController';

const router = Router();

const userController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);
router.get("/users", userController.index);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.index);

router.post("/sendMail", sendMailController.execute);
router.get("/sendMail", sendMailController.index);

router.get("/answer/:note", answerController.receive);

router.get("/nps/:survey_id", npsController.calculate);

export { router };
