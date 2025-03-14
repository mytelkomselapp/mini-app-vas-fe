export const getTimezone = () => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() / -60; // Convert to positive hours
  switch (offset) {
    case 8:
      return "WITA";
    case 9:
      return "WIT";
    default:
      return "WIB";
  }
};
