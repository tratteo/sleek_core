export function getDomainName(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return null;
  }
}
export function tryParseInt(s) {
  if (isNullOrEmpty(s)) return void 0;
  try {
    const v = Number.parseInt(s);
    return v;
  } catch (ex) {
    return void 0;
  }
}
export function tryParse(s) {
  if (isNullOrEmpty(s)) return void 0;
  try {
    const v = Number.parseFloat(s);
    if (isNaN(v)) return void 0;
    return v;
  } catch (ex) {
    return void 0;
  }
}
export function isNullOrEmpty(s) {
  return s === void 0 || s === null || s.length <= 0;
}
export function readablePrice(unitAmount) {
  if (!unitAmount) return void 0;
  return (unitAmount / 100).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
export function wordCapitalize(s) {
  if (isNullOrEmpty(s)) return s;
  let splits = s?.split(" ");
  return splits?.map((s2) => capitalize(s2)).join(" ");
}
export function firstWord(s, cap = false) {
  if (isNullOrEmpty(s)) return s;
  let splits = s?.split(" ");
  if (!splits) return "";
  const word = splits.at(0);
  return cap ? capitalize(word) : word;
}
export function capitalize(s) {
  if (s === void 0 || s === null) return s;
  if (s.length <= 0) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
export function toShortString(v) {
  if (v === void 0) return void 0;
  let sign = Math.sign(v);
  const splits = Math.abs(v).toString().split(".");
  let str = splits[0];
  if (str.length > 6) {
    str = `${str.slice(0, str.length - 6)}.${str.slice(-6, -4)}M`;
  } else if (str.length > 3) {
    str = `${str.slice(0, str.length - 3)}.${str.slice(-3, -1)}K`;
  } else if (splits.length > 1) {
    str += `.${splits[1].substring(0, 2)}`;
  }
  if (sign < 0) {
    return `-${str}`;
  }
  return str;
}
export function toUriSafeString(input) {
  if (isNullOrEmpty(input)) return void 0;
  return input.toLocaleLowerCase().replace(/\s+/g, "-").split("").map((char) => encodeURIComponent(char)).filter(
    (encodedChar) => (
      // Keep only characters that are alphanumeric, dash, period, or underscore
      /^[a-zA-Z0-9\-._~]$/.test(encodedChar)
    )
  ).join("");
}
export function countryCodeToFlagEmoji(countryCode) {
  if (isNullOrEmpty(countryCode)) return "";
  const codePoints = countryCode.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
export function shortUid(seed, length = 6) {
  const inputStr = typeof seed === "object" ? JSON.stringify(seed) : String(seed);
  let hash = 0;
  for (let i = 0; i < inputStr.length; i++) {
    const char = inputStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  hash = Math.abs(hash);
  const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let shortId = "";
  const idLength = length;
  for (let i = 0; i < idLength; i++) {
    shortId += charset[hash % charset.length];
    hash = Math.floor(hash / charset.length);
  }
  return shortId.toLocaleLowerCase();
}
