import { withLambdaStandard } from "@shared";
import { PreSignUpTriggerHandler } from "aws-lambda";

/** 'preSignUp' lambda function handler. */
const handler: PreSignUpTriggerHandler = async event => {

    event.response.autoConfirmUser = true

    // auto-verify email & phone-number.
    if (event.request.userAttributes.email) event.response.autoVerifyEmail = true;
    if (event.request.userAttributes.phone_number) event.response.autoVerifyPhone = true;

    return event;

};

/** 'preSignUp' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler);