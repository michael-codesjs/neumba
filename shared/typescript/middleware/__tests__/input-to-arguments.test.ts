import middy from "@middy/core";
import { AppSyncResolverEvent, Context } from "aws-lambda";
import { Chance } from "chance";
import { inputToArguments } from "../input-to-arguments";

const chance = new Chance();

describe("InputToArguments", () => {

  const withMiddleware = (lambda: any) => middy(lambda).use(inputToArguments());

  type Arguments = {
    input: Record<string, any>
  }

  const getArguments = () => ({
    input: {
      [chance.string()]: chance.string(),
      [chance.string()]: chance.string(),
      [chance.string()]: chance.string(),
    }
  });

  it(".turns input to arguments", () => {

    // Arrange
    const lambdaArguments = getArguments();
    const lambda = (event: AppSyncResolverEvent<Arguments>) => expect(event.arguments).toStrictEqual(lambdaArguments.input);
    const event = { arguments: lambdaArguments } as AppSyncResolverEvent<Arguments>;
    
    // Act / Assert
    withMiddleware(lambda)(event, {} as Context);
  
  });

});