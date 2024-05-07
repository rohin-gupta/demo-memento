import { Table } from "sst/node/table";
import handler from "@memento/core/handler"
import dynamoDb from "@memento/core/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body || "{}");

    const params = {
        TableName: Table.Notes.tableName,
        //"Key" defines the partition key and sort key
        //for the item to be retrieved
        Key: {
            userID: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, //ID of the author
            noteID: event?.pathParameters?.id, //ID of the note from the path
        },

        //UpdateExpression defines the attributes to be updated
        UpdateExpression: "SET content = :content, attachment = :attachment",
        //ExpressionAttributeValues defines the values in the update expression
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },

        //ReturnValues specifies if and how to return the item's attributes,
        //and ALL_NEW returns all attributes of the item after the update
        ReturnValues: "ALL_NEW",
    };
    
    await dynamoDb.update(params);

    return JSON.stringify({ status: true });
});