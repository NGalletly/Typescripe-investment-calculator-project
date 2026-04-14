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

function calculateInvestment(data: Data) {
  let finalBalance = data.initAmount;
  let totalInterest = 0;
  for (let i = 0; i < data.duration; i++) {
    finalBalance = finalBalance *= 1 + data.annualContribution;
    totalInterest = finalBalance - data.initAmount;
  }

  return {
    finalBalance: finalBalance,
    totalInterest: totalInterest,
  };
}

function printResults(results: Results) {
  console.log(`Final Balance: ${results.finalBalance}
             Total Interest: ${results.totalInterest}`);
}

const results = calculateInvestment(myInvestment);

printResults(results);
