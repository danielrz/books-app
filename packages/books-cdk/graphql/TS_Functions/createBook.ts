import * as ddb from '@aws-appsync/utils/dynamodb'
import { Context, util } from '@aws-appsync/utils'
import { Book, CreateBookMutationVariables } from '../../API'

export function request(ctx: Context<CreateBookMutationVariables>) {
  return ddb.put({
    key: { id: util.autoId() },
    item: ctx.arguments.input,
  })
}

export function response(ctx: Context) {
  return ctx.result as Book
}