async function getUserCurrency() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.currency;
  } catch (error) {
    console.error('Error fetching user currency:', error);
    return 'USD';
  }
}

async function getExchangeRate(toCurrency) {
  const fromCurrency = 'USD'; // Supondo que os preços no site estão em USD.
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    return data.rates[toCurrency];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 1;
  }
}

function convertPrices(exchangeRate) {
  const priceElements = document.querySelectorAll('.price'); // Ajuste o seletor conforme necessário.
  priceElements.forEach(el => {
    const priceText = el.innerText;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    if (!isNaN(price)) {
      const convertedPrice = (price * exchangeRate).toFixed(2);
      el.innerText = `${convertedPrice}`;
    }
  });
}

(async () => {
  const userCurrency = await getUserCurrency();
  const exchangeRate = await getExchangeRate(userCurrency);
  convertPrices(exchangeRate);
})();
