import { useState } from "react";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState<number | "">("");
  const [contribution, setContribution] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [years, setYears] = useState<number | "">("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const getInterval = (totalYears: number) => {
    if (totalYears <= 5) return 1;
    if (totalYears <= 20) return 2;
    if (totalYears <= 30) return 4;
    if (totalYears <= 50) return 5;
    if (totalYears <= 100) return 10;
    if (totalYears <= 1000) return 20;
    return 100;
  };

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
      setHistory(data.yearlyHistory || []);
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
              onChange={(e) =>
                setPrincipal(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
            />
          </div>

          <div className="input-group">
            <label>Annual Contribution ($)</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) =>
                setContribution(
                  e.target.value === "" ? "" : Number(e.target.value), 
                )
              }
            />
          </div>

          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              placeholder="0"
              value={rate}
              onChange={(e) =>
                setRate(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <div className="input-group">
            <label>Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) =>
                setYears(e.target.value === "" ? "" : Number(e.target.value))
              }
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

      {history.length > 0 && (
        <div className="table-container">
          <h3>Growth Schedule</h3>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Interest (Yearly)</th>
                <th>Total Interest</th> 
                <th>Total Balance</th>
              </tr>
            </thead>
            <tbody>
              {history
                .filter(
                  (item) =>
                    item.year === 1 ||
                    item.year % getInterval(Number(years)) === 0 ||
                    item.year === Number(years),
                )
                .map((item) => (
                  <tr key={item.year}>
                    <td>Year {item.year}</td>
                    <td className="interest-cell">
                      +$
                      {item.interestEarned.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="interest-cell">
                      $
                      {item.totalInterest.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="balance-cell">
                      <strong>
                        $
                        {item.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </strong>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default App;
