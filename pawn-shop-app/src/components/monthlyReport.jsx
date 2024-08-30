import React from 'react';
import './stylesheets/monthlyReport.css'; // Ensure the CSS file is imported

const MonthlyReport = () => {
  return (
    <div className="report-container">
      <div className="report-section">
        <h1>Daily Report</h1>
        <table>
          <thead>
            <tr>
              <th>Total Loans Amount (THB)</th>
              <th>Total Interest (THB)</th>
              <th>Loans Left</th>
              <th>Total Number of Clients</th>
              <th>Total Profit (THB)</th>
              <th>Bad Debt (THB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>150,000.00</td> {/* Typical daily loan amount */}
              <td>5,000.00</td>   {/* Interest accrued for the day */}
              <td>3</td>           {/* Number of loans left unpaid */}
              <td>7</td>           {/* Number of clients for the day */}
              <td>7500.00</td>    {/* Total profit, assuming payments and interests */}
              <td>2,500.00</td>    {/* Estimated bad debt for the day */}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h1>Weekly Report</h1>
        <table>
          <thead>
            <tr>
              <th>Total Loans Amount (THB)</th>
              <th>Total Interest (THB)</th>
              <th>Loans Left</th>
              <th>Total Number of Clients</th>
              <th>Total Profit (THB)</th>
              <th>Bad Debt (THB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,000,000.00</td> {/* Total loan amounts given over the week */}
              <td>35,000.00</td>    {/* Weekly interest accrued */}
              <td>15</td>           {/* Total loans left unpaid in a week */}
              <td>45</td>           {/* Number of clients for the week */}
              <td>50,000.00</td>    {/* Total weekly profit */}
              <td>15,000.00</td>    {/* Weekly bad debt */}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h1>Monthly Report</h1>
        <table>
          <thead>
            <tr>
              <th>Total Loans Amount (THB)</th>
              <th>Total Interest (THB)</th>
              <th>Loans Left</th>
              <th>Total Number of Clients</th>
              <th>Total Profit (THB)</th>
              <th>Bad Debt (THB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4,200,000.00</td> {/* Total loan amounts for the month */}
              <td>150,000.00</td>   {/* Monthly interest accrued */}
              <td>60</td>           {/* Total loans left unpaid in the month */}
              <td>180</td>          {/* Number of clients for the month */}
              <td>200,000.00</td>   {/* Total monthly profit */}
              <td>50,000.00</td>    {/* Monthly bad debt */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReport;
