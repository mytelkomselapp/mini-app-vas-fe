export const serializeParam = (obj: Record<string, any> = {}): string => {
  const str: string[] = [];

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      if (Array.isArray(obj[key])) {
        // handle 2 query params for same key
        // ex: { hello: ['world','test']} => hello=world&hello=test
        obj[key].map((value: any) =>
          str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        );
        return;
      }
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    });

  return str.join("&");
};
