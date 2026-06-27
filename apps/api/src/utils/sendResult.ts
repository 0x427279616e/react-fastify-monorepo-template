export function sendResult(result: any): any {
  if (result === undefined || result === null) return result;
  if (Array.isArray(result)) return result.map(sendResult);
  return Object.fromEntries(
    Object.entries(result).map(([key, value]) => [
      key,
      typeof value === 'bigint' ? Number(value) : value,
    ]),
  );
}
