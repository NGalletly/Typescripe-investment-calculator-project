import { useState } from "react";

interface Props {
  onCalculate: (data: { 
    principal: number | ""; 
    contribution: number | ""; 
    rate: number | ""; 
    years: number | "" 
  }) => void;
}

export function InvestmentForm({ onCalculate }: Props) {
  const [principal, setPrincipal] = useState<number | "">("");
  const [contribution, setContribution] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [years, setYears] = useState<number | "">("");

  return (
    <div className="card">
      <div className="input-group">
        <label>Principal (£)</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Annual Contribution (£)</label>
        <input
          type="number"
          value={contribution}
          onChange={(e) => setContribution(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Annual Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Years</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <button 
        onClick={() => onCalculate({ principal, contribution, rate, years })} 
        className="calc-button"
      >
        Calculate Future Value
      </button>
    </div>
  );
}