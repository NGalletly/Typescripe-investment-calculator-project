import { useState } from "react";
import "./App.css";

interface CalculationResult {
  future_value: string;
}

function App() {
  const [principal, setPrincipal] = useState<number | "">("");
  const [contribution, setContribution] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initAmount: principal || 0,
          annualContribution: contribution || 0,
          expectedReturn: rate || 0,
          duration: years || 0,
        }),
      });

      const data = await response.json();

      setResult(data.finalBalance);
    } catch (error) {
      console.error("Error connecting to Flask:", error);
      alert("Make sure your Flask server is running!");
    }
  };

  return (
    <main className="container">
      <section id="center">
        <h1>Investment Calculator</h1>

        <div className="card">
          <div className="input-group">
            <label>Principal ($)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Annual Contribution ($)</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              placeholder="0"
              value={rate}
              onChange={(e) => {
                const val = e.target.value;
                setRate(val === "" ? "" : Number(val));
              }}
            />
          </div>

          <div className="input-group">
            <label>Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>

          <button onClick={handleCalculate} className="calc-button">
            Calculate Future Value
          </button>
        </div>

        {result && (
          <div className="result-area">
            <h2>Estimated Future Value: {result}</h2>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
