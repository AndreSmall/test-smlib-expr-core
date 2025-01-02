// import SurveyLogic from '@sm/survey-logic'
// import { load, createResponseContext, evaluate  } from '@sm/smlib.expr.core'

import runPerformanceTests from "@/app/logic";

self.onmessage = (e) => {
    console.log('Message received from main script', e);
    // console.log('Expr core', ExprCore)

    // const parsedConditions = ExprCore.load(conditions)

    // const responseContext = ExprCore.createResponseContext({}, surveyQuestions as never, responseData)
    // // console.log(parsedConditions)
    // // console.log(responseContext)

    // console.log(ExprCore.evaluate(parsedConditions, responseContext))
    runPerformanceTests(10, 10);
};