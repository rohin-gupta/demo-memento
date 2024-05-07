import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@memento/core/handler"
import dynamoDb from "@memento/core/dynamodb";

export const main = handler(async (event) => {
    let data = {
        content: "",
        attachment: "",
    };
    
    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const params = {
        TableName: Table.Notes.tableName,
            Item: {
                //Attributes of the item to be created
                userID: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, //The ID of the author
                noteID: uuid.v1(), //The unique uuid
                content: data.content, //Parsed from the request body
                attachment: data.attachment, //Parsed from the request body
                createdAt: Date.now(), //Current date
            },
    };

    await dynamoDb.put(params);

    return JSON.stringify(params.Item);
});


// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// export async function main(event: APIGatewayProxyEvent) {
//     let data, params;

//     //Body of request passed in as a JSON encoded string in "event.body"
//     if(event.body) {
//         data = JSON.parse(event.body);
//         params = {
//             TableName: Table.Notes.tableName,
//             Item: {
//                 //Attributes of the item to be created
//                 userID: "123", //The ID of the author
//                 noteID: uuid.v1(), //The unique uuid
//                 content: data.content, //Parsed from the request body
//                 attachment: data.attachment, //Parsed from the request body
//                 createdAt: Date.now(), //Current date
//             },
//         };
//     }
//     else {
//         return {
//             statusCode: 404,
//             body: JSON.stringify({ error: true }),
//         };
//     }

//     try {
//         await dynamoDB.put(params).promise();

//         return {
//             statusCode: 200,
//             body: JSON.stringify(params.Item),
//         };
//     }
//     catch (error) {
//         let message;
//         if (error instanceof Error) {
//             message = error.message;
//         }
//         else {
//             message = String(error);
//         }
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: message }),
//         };
//     }
// }