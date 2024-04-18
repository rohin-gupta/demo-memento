import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
    //S3 bucket creation for file uploads
    const bucket = new Bucket(stack, "Uploads");
    //DynamoDB table creation
    const table = new Table(stack, "Notes", {
        fields: {
            userID: "string",
            noteID: "string",
        },
        primaryIndex: {partitionKey: "userID", sortKey: "noteID"},
    });

    return {
        bucket,
        table,
    };
}