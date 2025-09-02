export function sanitize(name: string) {
  return name.replace(/[^a-z0-9_\-\.]+/gi, "_").slice(0, 120);
}