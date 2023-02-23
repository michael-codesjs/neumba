import chalk from "chalk";
import ora from "ora";
import { writeFileSync } from "fs";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

console.clear();

const ssmClient = new SSMClient({ region: process.env.AWS_REGION || "eu-central-1" });

// generates required enviroment variables for testing.
// exports values to a .env in ../

/** POJO of envioment variables and their respecitive SSM parameter paths. */
const VARIABLES = Object.freeze({
  ESTATE_DYANMODB_TABLE_NAME: "/neumba/dev/service/estate/storage/table/estate/name",
});

(async () => {

  const entries = Object.entries(VARIABLES);
  let envString = "";

  for (let x = 0; x < entries.length; x++) {

    const [variable, name] = entries[x];

    const spinner = ora(`Retrieving ${chalk.bold(variable)} value from SSM path ${chalk.blueBright(name)}.`);
    spinner.start();

    try {

      const getParameterCommand = new GetParameterCommand({
        Name: name,
        WithDecryption: true
      });

      const value = await ssmClient.send(getParameterCommand);

      envString += `${variable}=${value.Parameter.Value}\n`;

      spinner.succeed(`Retrieved ${chalk.bold(variable)} value from SSM path ${chalk.blueBright(name)}.`);
    
    } catch (error) {

      console.log("E:", error);

      spinner.fail(`Failed to retrieve ${chalk.bold(variable)} value from SSM path ${chalk.blueBright(name)}.`);

    }

    writeFileSync("../.env", envString, { encoding: "utf-8" }); // export .env to ../

    console.log(chalk.bold("\n The .env file has been exported to file to the root folder of the sub-domain\n"));

  }




})();