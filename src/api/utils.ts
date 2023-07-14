export const createEncodedForm = (
  details: Record<string, string | number | boolean | undefined | null>,
  filterEmpty = true,
) => {
  const formBody: string[] = [];
  let entries = Object.entries(details);

  if (filterEmpty) {
    entries = entries.filter(([, val]) => val);
  }

  entries.forEach(([key, val]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = val ? encodeURIComponent(val) : null;

    formBody.push(`${encodedKey}=${encodedValue}`);
  });

  return formBody.join("&");
};

export const { localStorage } = window;
