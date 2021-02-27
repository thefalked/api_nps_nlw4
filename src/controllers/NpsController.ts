import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {

  /*
    Notes: 0 1 2 3 4 5 6 7 8 9 10 
    Detractors: 0 - 6
    Passives: 7 - 8
    Promoters: 9 - 10

    NPS Calc = (promoters - destractors) / (total_of_answers) * 100
  */
  async calculate(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter(
      surveyUser => surveyUser.value >= 0 && surveyUser.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      surveyUser => surveyUser.value >= 9 && surveyUser.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      surveyUser => surveyUser.value >= 7 && surveyUser.value <= 8
    ).length;

    const calculate = ((promoters - detractors) / surveysUsers.length) * 100

    return res.status(200).json({
      promoters,
      passive,
      detractors,
      total_of_answers: surveysUsers.length,
      NPS: Number(calculate.toFixed(2)),
    })
  }
}

export { NpsController };
