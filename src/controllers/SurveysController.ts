import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveyRepository = getCustomRepository(SurveysRepository)
    
    const survey = surveyRepository.create({
      title,
      description,
    });

    await surveyRepository.save(survey);

    return res.status(201).json(survey);
  }

  async index(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveyRepository.find();

    return res.status(200).json(surveys);
  }
}

export { SurveysController };
