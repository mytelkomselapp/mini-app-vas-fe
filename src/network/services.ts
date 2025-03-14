// @ts-nocheck
import endpoints from "./endpoint";

import {
  ExampleDataCollectionResponse,
  ExampleUploadFileResponse,
} from "./types/response-props";
import { createJWT } from "../lib/jwt-utils";
import { ExampleDataCollectionPayloadRequest } from "./types/request-payload";
import http from "../core/http";

/**
 * Example Request Get Data Collection
 */
export const getDataCollection = (
  payload: ExampleDataCollectionPayloadRequest
): CMSFlightLandingPageResponse => {
  return http.get(endpoints?.exampleDataCollection, payload);
};

export const postExampleUploadFile = (
  filePath: string
): ExampleUploadFileResponse => {
  return http.uploadFile(endpoints?.exampleUploadFile, filePath, {});
};
