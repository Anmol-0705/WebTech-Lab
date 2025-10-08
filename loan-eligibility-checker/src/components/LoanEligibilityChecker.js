import React, { useState } from "react";
import "./LoanEligibilityChecker.css";

const LoanEligibilityChecker = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [existingEmi, setExistingEmi] = useState("");
  const [loanRequested, setLoanRequested] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);

  const validateInputs = () => {
    const newErrors = [];
    if (!name) newErrors.push("Name is required.");
    if (!age || age < 21 || age > 60) newErrors.push("Age must be between 21 and 60.");
    if (!salary || salary <= 0) newErrors.push("Monthly salary must be a positive number.");
    if (!existingEmi || existingEmi < 0) newErrors.push("Existing EMI must be 0 or positive.");
    if (!loanRequested || loanRequested <= 0) newErrors.push("Loan amount must be positive.");
    return newErrors;
  };

  const calculateEligibility = () => {
    const errors = validateInputs();
    if (errors.length > 0) {
      setErrors(errors);
      setResult(null);
      return;
    }

    const proposedEmi = loanRequested / 60; // assuming 5 years loan (60 months)
    const dti = ((parseFloat(existingEmi) + proposedEmi) / parseFloat(salary)) * 100;
    const maxLoanAllowed = 10 * parseFloat(salary);

    let reasons = [];

    if (dti > 60) reasons.push(`DTI too high (${dti.toFixed(2)}%). Must be ≤ 60%.`);
    if (loanRequested > maxLoanAllowed) reasons.push(`Requested loan exceeds 10× salary.`);
    if (reasons.length > 0) {
      setResult({ eligible: false, reasons });
    } else {
      setResult({ eligible: true });
    }
    setErrors([]);
  };

  return (
    <div className="checker-container">
      <h2>🏦 Loan Eligibility Checker</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Monthly Salary (₹):</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Existing EMI (₹):</label>
        <input type="number" value={existingEmi} onChange={(e) => setExistingEmi(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Loan Amount Requested (₹):</label>
        <input type="number" value={loanRequested} onChange={(e) => setLoanRequested(e.target.value)} />
      </div>

      <button onClick={calculateEligibility}>Check Loan Eligibility</button>

      {errors.length > 0 && (
        <div className="error-box">
          <h4>⚠️ Please fix the following errors:</h4>
          <ul>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </div>
      )}

      {result && (
        <div className={`result-box ${result.eligible ? "eligible" : "not-eligible"}`}>
          {result.eligible ? (
            <h3>✅ Eligible for Loan!</h3>
          ) : (
            <>
              <h3>❌ Not Eligible</h3>
              <ul>
                {result.reasons.map((reason, idx) => <li key={idx}>{reason}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanEligibilityChecker;