## **Neumba - Real-estate & Estate Management.**
This repository contains everything that makes up the **nuemba** real-estate and estate managment platform.
### [**The Figma Prototype**](https://www.figma.com/proto/8fY3z6IapqSPoycTo2vKZM/The-Prototype-%26-Wireframes?page-id=0%3A1&node-id=101%3A4&viewport=575%2C416%2C0.25&scaling=scale-down&starting-point-node-id=101%3A4)
**INSTALLATION**
### **Terraform**
This project uses [**Terraform**](https://www.terraform.io/) to provision non-service related infrastructure to AWS. Install the CLI by following [**these**](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) instructions.
### **NodeJS/Typescript**
This project contains several NodeJS packages in one monorepo using tools like [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and [lerna](https://lerna.js.org/). Install dependencies of all packages by running the following command in the workspace directory, i.e the root project directory.

```shell
yarn install
```

You'll then have to build the **shared** packages. Do this by running the following command in the workspace directory. The shared package contains common functions, types & constants. 

```shell
yarn lerna build shared
```

If you intend to work on this, you're most likely to change the shared packages often. I advice you run the following command to have lerna build the shared packages everytime you make changes to them.

```shell
yarn lerna build shared --watch
```

## **Deploying & Destroying**

You should have an AWS Account and your credentials set on your local machine. I like to do so via the shared credentials file, you can do so too by following [**these**](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html) instructions. These credentials are used by Terraform and The Serverless Framework to deploy the infrastructure and microservices to your AWS account.

If you do not plan on using the default profile run the following command to select a different profile replacing `<profile_name>` with your desired profile name.

```shell
export AWS_PROFILE=<profile_name>
```

### **Deploying**
To deploy the infrastructure & microservices to AWS, run the following command.

```shell
yarn deploy
```

By default, it deploys to the **eu-central-1** region in the **dev** stage. To deploy to a different region and stage. Run the following command replacing `<region>` and `<stage>` with your desired region and stage.

```shell
yarn deploy --stage=<stage> --region=<region>
```