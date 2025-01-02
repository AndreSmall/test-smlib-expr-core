import { load, createResponseContext, evaluate, CoreExpressionsType, ExpressionCoreQuestionType, QuestionResponsesType } from '@sm/smlib.expr.core'

export default function loadAndEvaluate(conditions:CoreExpressionsType, surveyQuestions: ExpressionCoreQuestionType[], responseData: QuestionResponsesType[]) {
    const parsedConditions = load([conditions])

    const responseContext = createResponseContext({}, surveyQuestions, responseData)

    return evaluate(parsedConditions, responseContext)
}