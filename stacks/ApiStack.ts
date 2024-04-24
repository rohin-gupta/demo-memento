import { Api, StackContext, Table, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
    const { table } = use(StorageStack);

    //API creation
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                bind: [table],
            },
        },
        routes: {
            "GET /notes": "packages/functions/src/list.main",
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
        }
    });

    //Show API endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    //Return the API resource
    return {
        api,
    };
}