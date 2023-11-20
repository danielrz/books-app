import * as cdk from 'aws-cdk-lib';
import { AuthorizationType, GraphqlApi, SchemaFile } from "aws-cdk-lib/aws-appsync"
import { Table } from "aws-cdk-lib/aws-dynamodb"
import { Construct } from "constructs"

type AppSyncApiProps = {
  apiNamne: string,
  table: Table,
  cognito: cdk.aws_cognito.UserPool
}

const createAppSyncApi = (scope: Construct, props: AppSyncApiProps) => {
  const api = new GraphqlApi(scope, props.apiNamne, {
    name: props.apiNamne,
    schema: SchemaFile.fromAsset("graphql/schema.graphql"),
    authorizationConfig: {
      defaultAuthorization: {
        authorizationType: AuthorizationType.USER_POOL,
        userPoolConfig: {
          userPool: props.cognito,
        },
      },
      additionalAuthorizationModes: [
        {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: "GraphQLBooksApiKey",
            description: "Books API Key",
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      ],
    },
    xrayEnabled: true,
  })

  const booksDs = api.addDynamoDbDataSource('BooksTableDs', props.table);

  return api

}

export {
  createAppSyncApi
}