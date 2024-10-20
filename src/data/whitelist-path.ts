import { BASE_API_URL } from "../../core/env";

const WhiteListPath = [
  "/flight",
  "/flight/list",
  "/flight/list-following",
  "/flight/detail",
  "/flight/package",
  "/flight/package-info",
  "/flight/create-ticket",
  "/flight/ticket-list",
  "/flight/ticket-history",
];

export const checkingLocalPath = (pathUrl: string) => {
  const baseUrl = String(BASE_API_URL)?.replace("go", "");
  const url = `/${String(pathUrl)?.replace(baseUrl, "")}`;
  const isLocalPath = !!WhiteListPath?.find((data) => data === url);

  return {
    path: url,
    isLocalPath,
  };
};
