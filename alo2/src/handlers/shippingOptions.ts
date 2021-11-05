import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { RateRequest } from "../types/rateRequest.model";
import { FastShippingDestinations } from "../types/fastShippingDestinations.enum";

export const handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult | void> => {
    //   const promise = new Promise(function(resolve, reject) {
    //     https.get(url, (res) => {
    //         resolve(res.statusCode)
    //       }).on('error', (e) => {
    //         reject(Error(e))
    //       })
    //     })
    //   return promise


    // TODO: extract/validate request

    return Promise.resolve()
        .then(() => {
            let requestBody: RateRequest;
            try {
                requestBody = JSON.parse(event.body)?.data;
                if (requestBody == null) {
                    throw Error("request body is empty");
                }
            } catch (error) {
                throw(error);
            }

            const destination = requestBody?.rate?.destination?.province;

            if (destination == null) {
                throw Error("destination location is missing from request body");
            }

            if (destination.toUpperCase() === FastShippingDestinations.MARYLAND
            || destination.toUpperCase() === FastShippingDestinations.CALIFORNIA)
            {
                // TODO: send shipping options #2
            }

            const result: APIGatewayProxyStructuredResultV2 = {
                statusCode: 201,
                // headers?: {
                //     [header: string]: boolean | number | string;
                // } | undefined;
                body: "put data here";
            }
            resolve(result);
        });


    // TODO: check target 'province'

    // TODO: return response based on location
    //  >> Maryland / Cali => options set #2
    //  >> others => options set #1




};
