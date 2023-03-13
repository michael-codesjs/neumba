## **Cognito**
Serverless microservice in the **authentication(supporting)** sub-domain.
## **Installation**
Install all dependencies by running the following command in your terminal from the root directory.
```shell
yarn install
```

## **Deploying**
In the **./application** folder, run the following command terminal.
```shell
npx sls deploy
```

## Destroying
In the **./application** folder, run the following command.
```shell
npx sls remove
```

## Testing
Refer to the `package.json` for specific tests. Run the following command to run every test in this service.
```shell
yarn test
```