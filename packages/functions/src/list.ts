import { Table } from "sst/node/table";
import handler from "@memento/core/handler";
import dynamoDb from "@memento/core/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        //KeyConditionExpression defines the condition for the query
        //"userID = :userID" only returns items with matching userID
        //The partition key
        KeyConditionExpression: "userID = :userID",
        //ExpressionAttributeValues defines the value in the condition
        //":userID": defines userID to be the ID of the author
        ExpressionAttributeValues: {
            ":userID": event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
        },
    };

    const result = await dynamoDb.query(params);

    //Return the matching list of items in the response body
    return JSON.stringify(result.Items);
});