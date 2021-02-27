import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";

import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  async receive(req: Request, res: Response) {
    const { note } = req.params;
    const { su } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(su),
    });

    if (!surveyUser) {
      throw new AppError("Survey User dosn't exists.", 404)
    }

    surveyUser.value = Number(note);

    await surveysUsersRepository.save(surveyUser);

    return res.status(200).json(surveyUser);
  }
}

export { AnswerController };
