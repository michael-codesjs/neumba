import { Ables, execAsync, Params } from "../../../scripts/utilities";
import chalk from "chalk";
import ora from "ora";

const ables = new Ables();

(async () => {

  const { region, stage } = await ables.get();

  let infrastructureWasDeployed: boolean = true;

  if (ables.isInfrastructure()) infrastructureWasDeployed = await deployInfrastructure({ region, stage });

  if (infrastructureWasDeployed && ables.isMicroservices()) {
    await deployMicroservices({ region, stage });
    console.log(`\n ${chalk.black("What to do next you ask? Run ")} ${chalk.bold.blueBright("yarn setup")} ${chalk.black(" to generate some enviroment variables so that you can test stuff.")}`)
  }

})();

async function deployInfrastructure(params: Pick<Params, "region" | "stage">) {

  const { region, stage } = params;

  const spinner = ora(`Deploying infrastructure to ${chalk.black(region)} in ${chalk.black(stage)}.`)
  spinner.start();

  const command = `cd infrastructure && terraform init && terraform apply -input=false -auto-approve --var "region=${region}" --var "stage=${stage}"`;

  const success = await execAsync(command, { stdio: "pipe" });

  if (success) {
    spinner.succeed(`Successfully deployed infrastructure to ${chalk.black(region)} in ${chalk.black(stage)}.`);
    return true;
  } else {
    spinner.fail(
      `Failed to deploy infrastructure to ${chalk.black(region)} in ${chalk.black(stage)}. Run ${chalk.blue(command)} to get a proper error response.`
    );
    return false;
  }
}
