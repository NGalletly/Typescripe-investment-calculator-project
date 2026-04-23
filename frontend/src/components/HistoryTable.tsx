import { useState } from "react";

export function HistoryTable({
  history,
  totalYears,
}: {
  history: any[];
  totalYears: number;
}) {
  const getInterval = (years: number) => {
    if (years <= 5) return 1;
    if (years <= 20) return 2;
    if (years <= 30) return 4;
    if (years <= 50) return 5;
    if (years <= 100) return 10;
    if (years <= 1000) return 20;
    return 100;
  };

  const interval = getInterval(totalYears);

  return (
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
                item.year % interval === 0 ||
                item.year === totalYears,
            )
            .map((item) => (
              <tr key={item.year}>
                <td>Year {item.year}</td>
                <td className="interest-cell">
                  £
                  {item.interestEarned.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="interest-cell">
                  £
                  {item.totalInterest.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="balance-cell">
                  <strong>
                    £
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
  );
}
