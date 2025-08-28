// **Purpose**: Displays a table of investment results based on user input.
// - **Props**:
//   - `input`: Object with investment data (initialInvestment, annualInvestment, expectedReturn, duration).
import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Results({ input }) {
  // **Derived Data**
  // - Calls `calculateInvestmentResults` to compute annual investment data from `input`.
  // - `initialInvestment` is calculated for use in deriving total interest and invested capital.
  const resultsData = calculateInvestmentResults(input);
  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {/* **Dynamic Rendering**
            - Maps over `resultsData` to render a row for each year.
            - Derives `totalInterest` and `totalAmountInvested` per row from `yearData`.
            - Uses `formatter` to display values as currency.
            - `key={yearData.year}` ensures efficient rendering. */}
        {resultsData.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
