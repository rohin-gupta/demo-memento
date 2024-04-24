import { Table } from "sst/node/table";
import handler from "@memento/core/handler";
import dynamoDb from "@memento/core/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        //"Key" defines the partition key and sort key
        //for the item to be retrieved
        Key: {
            userID: "123", //ID of the author
            noteID: event?.pathParameters?.id, //ID of the note from the path
        },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }

    return JSON.stringify(result.Item);
});