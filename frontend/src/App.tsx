import { useState } from "react";
import { InvestmentForm } from "./components/InvestmentForm";
import { HistoryTable } from "./components/HistoryTable";
import "./App.css";

interface InvestmentData {
  principal: number | "";
  contribution: number | "";
  rate: number | "";
  years: number | "";
}

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [totalYears, setTotalYears] = useState<number>(0);

  const handleCalculate = async (formData: InvestmentData) => {
    if (!formData.principal || !formData.rate || !formData.years) {
      alert("Please fill in all fields to see your projection.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initAmount: formData.principal || 0,
          annualContribution: formData.contribution || 0,
          expectedReturn: formData.rate || 0,
          duration: formData.years || 0,
        }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      setResult(data.finalBalance);
      setHistory(data.yearlyHistory || []);
      setTotalYears(Number(formData.years));
    } catch (error) {
      console.error("Error connecting to Flask:", error);
      alert("Make sure your Flask server is running!");
    }
  };

  return (
    <main className="container">
      <section id="center">
        <h1>Investment Calculator</h1>

        <InvestmentForm onCalculate={handleCalculate} />

        {result && (
          <div className="result-area">
            <p>
              In <strong>{totalYears}</strong> years, your investment could be
              worth:
            </p>
            <h2 className="big-result">{result}</h2>
          </div>
        )}
      </section>

      {history.length > 0 && (
        <HistoryTable history={history} totalYears={totalYears} />
      )}
    </main>
  );
}

export default App;
