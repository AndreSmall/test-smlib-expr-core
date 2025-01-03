import { sample1 as surveyQuestions } from "../logic/sample-data/questions";
import { sample1 as responseData } from '../logic/sample-data/responses';
import { contactAndQuestion } from "../logic/sample-data/contactAndQuestion";
import loadAndEvaluate from "./loadAndEvaluate";
import { ExpressionCoreQuestionType, ExpressionOperandType, LogicalExpressionType } from "@sm/smlib.expr.core";

const conditions = contactAndQuestion.map((item) => item.condition) as (LogicalExpressionType|ExpressionOperandType)[]

export default function randomIterations(numberOfTests: number) {
    const randomizedConditions = createRandomizedArray(conditions, numberOfTests);

    // see the length of the randomized array
    // console.log(randomizedConditions.join('').length);

    for(const ruleCondition of randomizedConditions) {
        loadAndEvaluate(ruleCondition, surveyQuestions as ExpressionCoreQuestionType[], responseData)
    }
}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createRandomizedArray<T>(baseArray: T[], length: number): T[] {
    let resultArray: T[] = [];

    while (resultArray.length < length) {
        const shuffledArray = shuffleArray([...baseArray]);
        resultArray = resultArray.concat(shuffledArray);
    }

    return resultArray.slice(0, length);
}

