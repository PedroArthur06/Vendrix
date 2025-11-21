export type CurrencyDisplay = "symbol" | "code" | "name";

export interface FormatPriceOptions {
  locale?: string;
  currency?: string;
  showCurrency?: boolean;
  currencyDisplay?: CurrencyDisplay;
  fromCents?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  fallback?: string;
}

export function formatPrice(
  value: number | string | null | undefined,
  options: FormatPriceOptions = {}
): string {
  const {
    locale = "pt-BR",
    currency = "BRL",
    showCurrency = true,
    currencyDisplay = "symbol",
    fromCents = false,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping = true,
    fallback = "-",
  } = options;

  if (value === null || value === undefined || value === "") return fallback;

  let numeric: number;

  if (typeof value === "string") {
    const trimmed = value.trim();
    const normalized = trimmed
      .replace(/\s+/g, "")
      .replace(/\./g, (m, i, s) => {
        return s.includes(",") ? "" : "";
      })
      .replace(",", ".");

    numeric = Number(normalized);
  } else if (typeof value === "number") {
    numeric = value;
  } else {
    return fallback;
  }

  if (!Number.isFinite(numeric)) return fallback;

  if (fromCents) {
    numeric = numeric / 100;
  }

  const nfOptions: Intl.NumberFormatOptions = {
    style: showCurrency ? "currency" : "decimal",
    currency: showCurrency ? currency : undefined,
    currencyDisplay: showCurrency
      ? (currencyDisplay as Intl.NumberFormatOptions["currencyDisplay"])
      : undefined,
    useGrouping,
  };

  if (typeof minimumFractionDigits === "number")
    nfOptions.minimumFractionDigits = minimumFractionDigits;
  if (typeof maximumFractionDigits === "number")
    nfOptions.maximumFractionDigits = maximumFractionDigits;

  try {
    return new Intl.NumberFormat(locale, nfOptions).format(numeric);
  } catch {
    const fixed =
      typeof maximumFractionDigits === "number"
        ? numeric.toFixed(maximumFractionDigits)
        : numeric.toFixed(2);
    return showCurrency ? `${currency} ${fixed}` : fixed;
  }
}

export default formatPrice;
