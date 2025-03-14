import {
  HttpSuccessResponse,
  HttpSuccessUploadResponse,
} from "./api-response-container";

export interface ExampleUploadFileReturnProps {
  fileName: string;
}

export interface ExampleDataCollectionReturnProps {
  name: string;
  address: string;
}

export type ExampleUploadFileResponse = HttpSuccessUploadResponse<
  ExampleUploadFileReturnProps[]
>;
export type ExampleDataCollectionResponse =
  HttpSuccessResponse<ExampleDataCollectionReturnProps>;
