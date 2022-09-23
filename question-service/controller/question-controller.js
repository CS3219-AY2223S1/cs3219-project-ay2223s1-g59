import QuestionModelSchema from "../model/question-model.js";

/*
export async function getQuestion(request, response) {
  try {
    const problems = await QuestionModelSchema.find();
    response.status(200).json(problems);
  } catch (error) {
    response.status(500).json(error);
  }
}
*/

export async function getEasyQuestion(request, response) {
  try {
    const numberOfProblems = await QuestionModelSchema.count({
      difficulty: "easy",
    });
    const toSkip = Math.floor(Math.random() * numberOfProblems);
    const question = await QuestionModelSchema.findOne({
      difficulty: "easy",
    }).skip(toSkip);
    response.status(200).json(question);
  } catch (error) {
    response.status(500).json(error);
  }
}

export async function getMediumQuestion(request, response) {
  try {
    const numberOfProblems = await QuestionModelSchema.count({
      difficulty: "medium",
    });
    const toSkip = Math.floor(Math.random() * numberOfProblems);
    const question = await QuestionModelSchema.findOne({
      difficulty: "medium",
    }).skip(toSkip);
    response.status(200).json(question);
  } catch (error) {
    response.status(500).json(error);
  }
}

export async function getHardQuestion(request, response) {
  try {
    const numberOfProblems = await QuestionModelSchema.count({
      difficulty: "hard",
    });
    const toSkip = Math.floor(Math.random() * numberOfProblems);
    const question = await QuestionModelSchema.findOne({
      difficulty: "hard",
    }).skip(toSkip);
    response.status(200).json(question);
  } catch (error) {
    response.status(500).json(error);
  }
}
