/**
 * Cleans a record by removing null, undefined, and empty string values.
 * @param record The record to clean.
 * @returns The cleaned record.
 */
export const clean = (record?: Record<string, unknown>) => {
  const cleanedRecord: Record<string, unknown> = {};
  if (!record) return cleanedRecord;
  for (const key in record) {
    if (
      record[key] !== null &&
      record[key] !== undefined &&
      record[key] !== ""
    ) {
      cleanedRecord[key] = record[key];
    }
  }
  return cleanedRecord;
};

/**
 * Converts a record of parameters into a query string.
 * @param params The record of parameters to convert.
 * @returns The query string representation of the parameters.
 */
export const toQueryString = (params: Record<string, unknown>) => {
  const stringParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      stringParams[key] = String(value);
    }
  }
  const query = new URLSearchParams(stringParams);
  return query.toString() ? `?${query.toString()}` : "";
};
