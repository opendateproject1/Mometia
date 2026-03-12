type ClassValue = string | false | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string) {
  const baseUrl = "https://momentia.io";
  return new URL(path, baseUrl).toString();
}
