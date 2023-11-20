import * as cdk from 'aws-cdk-lib';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { AccountRecovery, OAuthScope, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { createTable as createBookTable } from './tables/booksTable';
import { createAppSyncApi } from './api/appsync';

export class BooksCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognito = new UserPool(this, "BooksUserPool", {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: false,
      },
      standardAttributes: {
        email: {
          required: true,
        },
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const userPoolClient = new UserPoolClient(this, "BooksClient", {
      userPool: cognito,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      generateSecret: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID, OAuthScope.PROFILE],
        callbackUrls: ["http://localhost:3000"],
      },
    });

    const booksDynamoDBTable = createBookTable(this, {
      tableName: 'BookTable'
    })

    const booksDataSource = createAppSyncApi(this, {
      apiNamne: 'books-graphqlApi',
      table: booksDynamoDBTable,
      cognito: cognito
    })

    // const graphqlApi = new GraphqlApi(this, "BooksApi", {
    //   name: "books-graphqlApi",
    //   schema: SchemaFile.fromAsset("graphql/schema.graphql"),
    //   authorizationConfig: {
    //     defaultAuthorization: {
    //       authorizationType: AuthorizationType.USER_POOL,
    //       userPoolConfig: {
    //         userPool: cognito,
    //       },
    //     },
    //     additionalAuthorizationModes: [
    //       {
    //         authorizationType: AuthorizationType.API_KEY,
    //         apiKeyConfig: {
    //           name: "GraphQLBooksApiKey",
    //           description: "Books API Key",
    //           expires: cdk.Expiration.after(cdk.Duration.days(365)),
    //         },
    //       },
    //     ],
    //   },
    //   xrayEnabled: true,
    // })

    // const booksTable = createBookTable(this, {
    //   tableName: 'BookTable'
    // })

    // const booksDs = graphqlApi.addDynamoDbDataSource('BooksTableDs', booksTable);

    // graphqlApi.createResolver('GetBookResolver', {
    //   typeName: 'Query',
    //   fieldName: 'getBooks',
    //   dataSource: booksDs,
    //   requestMappingTemplate: MappingTemplate.fromFile(
    //     "graphql/vtl/dynamoGetItem.request.vtl"
    //   ),
    //   responseMappingTemplate: MappingTemplate.fromFile(
    //     "graphql/vtl/dynamo.response.vtl"
    //   ),
    // })

    new CfnOutput(this, "UserPoolId", {
      value: cognito.userPoolId || "",
    });

    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId || "",
    });

    new CfnOutput(this, "GraphQLBooksURL", {
      value: booksDataSource.graphqlUrl,
    });

    new CfnOutput(this, "GraphQLBooksApiKey", {
      value: booksDataSource.apiKey || "",
    });
  }
}
