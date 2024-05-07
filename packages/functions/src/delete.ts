import { Table } from "sst/node/table";
import handler from "@memento/core/handler";
import dynamoDb from "@memento/core/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            userID: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, //ID of the author
            noteID: event?.pathParameters?.id, //ID of the note from the path
        },
    };

    await dynamoDb.delete(params);

    return JSON.stringify({ status: true });
});