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

export const camelToUnderscore = (key: string) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toLowerCase();
};

export const buildQueryString = ({
  baseUrl,
  params,
  convType,
}: {
  baseUrl: string;
  params: Record<string, string | number | boolean | undefined | null>;
  convType?: "camelToUnderscore";
}) => {
  const paramsPrepared = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => {
      v = String(v);

      if (convType === "camelToUnderscore") {
        return [camelToUnderscore(k), v];
      }

      return [k, v];
    });

  const searchParams = new URLSearchParams(paramsPrepared);

  return baseUrl + "?" + searchParams.toString();
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};
