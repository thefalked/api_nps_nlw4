import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from "path";

import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveyUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id: id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User dosn't exists.",
      });
    }

    const survey = await surveyRepository.findOne({ id });

    if (!survey) {
      return res.status(404).json({
        error: "Survey dosn't exists.",
      });
    }

    const surveysUsersAlreadyExist = await surveyUsersRepository.findOne({
      where: [
        {
          user_id: user.id,
        },
        {
          value: null,
        }
      ],
      relations: ["user", "survey"],
    })

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      user,
      survey,
      link: process.env.URL_MAIL,
    }

    if (surveysUsersAlreadyExist) {
      await SendMailService.execute(email, survey.title, variables, npsPath);

      return res.status(200).json(surveysUsersAlreadyExist);
    }

    const surveyUser = await surveyUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    });

    await surveyUsersRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.status(200).json(surveyUser);
  }

  async index(req: Request, res: Response) {
    const surveysUserRepository = getCustomRepository(SurveyUsersRepository);

    const surveysUsers = await surveysUserRepository.find();

    return res.status(200).json(surveysUsers);
  }
}

export { SendMailController };
