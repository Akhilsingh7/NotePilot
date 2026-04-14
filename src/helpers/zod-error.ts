export function formatZodErrors(issues: any[]) {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (field) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
