import inquirer from 'inquirer';

const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const exchangeRates: { [key: string]: number } = {
    USD: 1.0,
    EUR: 0.93,
    GBP: 0.80,
    JPY: 153.05,
    AUD: 1.53,
    CAD: 1.37,
    INR: 83.33,
    CNY: 7.24,
    PKR: 278.07,
  };

  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    throw new Error('One or both of the currencies you entered are not supported.');
  }

  const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  return amount * conversionRate;
};

const main = async () => {
  try {
    console.log('Welcome to the Currency Converter! 🌐💱');
    console.log('----------------------------------------');

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Enter the amount (e.g., 100):',
        validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid number.',
      },
      {
        type: 'input',
        name: 'fromCurrency',
        message: 'Enter the source currency (e.g., USD, EUR, PKR):',
        validate: (input) => /^[A-Z]{3}$/.test(input) || 'Please enter a valid currency code (e.g., USD).',
      },
      {
        type: 'input',
        name: 'toCurrency',
        message: 'Enter the target currency (e.g., USD, EUR, PKR):',
        validate: (input) => /^[A-Z]{3}$/.test(input) || 'Please enter a valid currency code (e.g., EUR).',
      },
    ]);

    const { amount, fromCurrency, toCurrency } = answers;
    const convertedAmount = convertCurrency(parseFloat(amount), fromCurrency.toUpperCase(), toCurrency.toUpperCase());

    console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
    console.log('Thank you for using the Currency Converter! 🚀');
  } catch (error) {
    console.error('An error occurred:');
  }
};

main();
