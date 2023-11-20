import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb"
import { Construct } from "constructs"

type TableProps = {
  tableName: string
}

const createTable = (scope: Construct, props: TableProps) => {
  const table = new Table(scope, props.tableName, {
    billingMode: BillingMode.PAY_PER_REQUEST,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING
    }
  })

  return table
}

export {
  createTable
}

