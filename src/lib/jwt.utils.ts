import sign from "jwt-encode";

export const createJWT = (payload: any, secret: string) => {
  return sign(payload, secret);
};
