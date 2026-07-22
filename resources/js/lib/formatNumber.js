// Formats a number with thousand separators (e.g. 100000 -> "100,000") for
// display in tables. Returns the fallback for null/undefined/empty values so
// callers don't need a separate `|| "N/A"` check.
export const formatNumber = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    const number = Number(value);

    return Number.isNaN(number) ? fallback : number.toLocaleString();
};

// Same as formatNumber, but always shows 2 decimal places (for money totals).
export const formatMoney = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    const number = Number(value);

    return Number.isNaN(number)
        ? fallback
        : number.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          });
};
