import { useState } from "react";

interface Props {
  onCalculate: (data: {
    principal: number | "";
    contribution: number | "";
    rate: number | "";
    years: number | "";
  }) => void;
  onReset: () => void;
}

export function InvestmentForm({ onCalculate, onReset }: Props) {
  const [principal, setPrincipal] = useState<number | "">("");
  const [contribution, setContribution] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [years, setYears] = useState<number | "">("");

  const internalReset = () => {
    setPrincipal("");
    setContribution("");
    setRate("");
    setYears("");
    onReset();
  };

  return (
    <div className="card">
      <div className="input-group">
        <label>Principal (£)</label>
        <input
          type="number"
          value={principal}
          onChange={(e) =>
            setPrincipal(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <div className="input-group">
        <label>Annual Contribution (£)</label>
        <input
          type="number"
          value={contribution}
          onChange={(e) =>
            setContribution(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <div className="input-group">
        <label>Annual Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
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
          min="1"
          max="100"
          value={years}
          onChange={(e) => {
            const val = e.target.value === "" ? "" : Number(e.target.value);
            if (typeof val === "number" && val > 100) return;
            setYears(val);
          }}
        />
      </div>

      <div className="button-group">
        <button
          onClick={() => onCalculate({ principal, contribution, rate, years })}
          className="calc-button"
        >
          Calculate Future Value
        </button>

        <button onClick={internalReset} className="reset-button">
          Clear
        </button>
      </div>
    </div>
  );
}
