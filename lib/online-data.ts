import LZString from "lz-string";

export function parseOnlineData(encodedData: string) {
  let data;
  const decompressed = LZString.decompressFromEncodedURIComponent(encodedData);
  if (decompressed) data = decompressed;
  else {
    try {
      data = decodeURIComponent(encodedData);
    } catch {
      return null;
    }
  }

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
