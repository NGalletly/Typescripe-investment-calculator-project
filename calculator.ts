// data:
//initial amount
//annual contribution
//expected return
//duration

type Data = {
  initAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};
type Results = {
  finalBalance: number;
  totalInterest: number;
};

const myInvestment: Data = {
  initAmount: 1000,
  annualContribution: 100,
  expectedReturn: 0.07,
  duration: 5,
};

function calculateInvestment(data: Data): Results {
  let finalBalance = data.initAmount;
  let totalDeposits = data.initAmount;
  for (let i = 0; i < data.duration; i++) {
    finalBalance += data.annualContribution;
    totalDeposits += data.annualContribution;

    finalBalance *= 1 + data.expectedReturn;
  }
  let totalInterest = finalBalance - totalDeposits;

  return {
    finalBalance: finalBalance,
    totalInterest: totalInterest,
  };
}

function printResults(results: Results): void {
  console.log(`Final Balance: ${results.finalBalance.toFixed(2)}
             Total Interest: ${results.totalInterest.toFixed(2)}`);
}

const results: Results = calculateInvestment(myInvestment);

printResults(results);
