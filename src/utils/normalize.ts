export const normalize = (u: string) =>
  u.toLowerCase().trim().replace(/^@/, "");
