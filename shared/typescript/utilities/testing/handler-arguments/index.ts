// import { Alarm } from "./alarm";
// mport { Appsync } from "./appsync";
// import { Stream } from "./dynamoDb-stream";
// import { User } from "./user";

class HandlerArgumentsUtility {

	private constructor() {}
	static readonly instance = new HandlerArgumentsUtility();
	
	// readonly appsync = Appsync;
	// readonly stream = Stream;
	// readonly user = User;
	// alarm = Alarm
  
}

export const HandlerArguments = HandlerArgumentsUtility.instance;