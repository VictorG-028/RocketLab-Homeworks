export function mapCurrencyNameToSymbol(currencyName: string) {

  const currencyMap = new Map<string, string>([
    ['BRL', 'R$'],
    ['USD', '$'],
    ['EUR', '€'],
    ['GBP', '£'],
    ['JPY', '¥'],
  ]);

  const convertedName = currencyMap.get(currencyName);

  if (!convertedName) {
    throw new Error(`Invalid currency name: ${currencyName}`);
  }

  return convertedName;
}
