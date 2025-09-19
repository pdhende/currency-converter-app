// This function gets the currency list from the API

export async function getExchangeList() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=currencies"
    );
    const data = await response.json();
    const tempList = data
      .map((country) => {
        const entries = Object.entries(country.currencies);
        if (entries.length === 0) return null;
        const [currencyCode, currency] = entries[0];
        return {
          currencyCode,
          currencyName: currency.name,
          currencySymbol: currency.symbol,
        };
      })
      .filter(Boolean); //this filter is to remove null values
    return tempList;
  } catch (error) {
    console.error("Error fetching exchange list:", error);
    throw error;
  }
}

// This function gets the conversion rates and calculates the amount

export async function getConversionRate(fromCurrency, toCurrency, fromAmount) {
  try {
    if (fromCurrency !== "Select" && toCurrency !== "Select") {
      const response = await fetch(
        "https://open.er-api.com/v6/latest/" + fromCurrency
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      const convertedAmount = (fromAmount * rate).toFixed(2);
      return convertedAmount;
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}
