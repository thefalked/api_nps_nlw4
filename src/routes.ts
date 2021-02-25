import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UsersController } from './controllers/UsersController';

const router = Router();

const userController = new UsersController(); 
const surveysController = new SurveysController(); 

router.post("/users", userController.create);
router.get("/users", userController.index);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.index);

export { router };
