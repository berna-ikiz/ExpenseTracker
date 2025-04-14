export const formDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formDateOnlyHours = (
  dateString: string,
  locale: string = "tr-TR"
): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatCurrency = (coast: number, currency: string): string => {
  coast = parseFloat(coast.toString());
  return coast.toLocaleString("tr-TR", {
    style: "currency",
    currency,
  });
};

export const formatCurrencyInput = (value: string): string => {
  if (!value) return "";

  const numeric = value.replace(/\D/g, "");

  if (!numeric) return "";

  const number = parseFloat(numeric) / 100;

  return number.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
