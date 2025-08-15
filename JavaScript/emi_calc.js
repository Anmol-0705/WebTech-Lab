function currency(n) {
    return (Math.round(n * 100) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

function computeEMI(P, annualRate, months) {
    const r = (annualRate / 12) / 100;
    if (r === 0) {
        const emi = P / months; return { emi, totalPay: emi * months, totalInt: emi * months - P, r };
    }
    const pow = Math.pow(1 + r, months); const emi = P * r * pow / (pow - 1);
    const totalPay = emi * months; const totalInt = totalPay - P; return { emi, totalPay, totalInt, r };
}




function recalc() {
    const P = Number(document.getElementById('amount').value) || 0;
    const annual = Number(document.getElementById('rate').value) || 0;
    const val = Number(document.getElementById('tenureVal').value) || 0;
    const unit = document.getElementById('tenureUnit').value; const N = unit === 'years' ? Math.round(val * 12) : Math.round(val);
    const { emi, totalPay, totalInt, r } = computeEMI(P, annual, N > 0 ? N : 1);
    const rows = [['Loan Amount', '₹' + currency(P)], ['Annual Rate', annual.toFixed(2) + '%'], ['Monthly Rate', (r * 100).toFixed(4) + '%'], ['Tenure (months)', N.toString()], ['Monthly EMI', '₹' + currency(emi)]];
    const tbody = document.getElementById('summaryBody');
    tbody.innerHTML = '';
    rows.forEach(([k, v]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${k}</td><td>${v}</td>`; tbody.appendChild(tr);
    });
    document.getElementById('totalPay').textContent = '₹' + currency(totalPay);
    document.getElementById('totalInt').textContent = '₹' + currency(totalInt);
}
function genSchedule() {
    const P0 = Number(document.getElementById('amount').value) || 0;
    const annual = Number(document.getElementById('rate').value) || 0;
    const val = Number(document.getElementById('tenureVal').value) || 0;
    const unit = document.getElementById('tenureUnit').value; const N = unit === 'years' ? Math.round(val * 12) : Math.round(val); const { emi, r } = computeEMI(P0, annual, N);
    let balance = P0;
    const schedule = [];
    for (let m = 1; m <= N; m++) {
        const interest = balance * r; const principal = Math.min(emi - interest, balance); balance = Math.max(0, balance - principal);
        schedule.push({ m, emi, interest, principal, balance });
    } const wrap = document.getElementById('scheduleWrap');
    const table = document.createElement('table');
    table.innerHTML = `<thead><tr><th>Month</th><th>EMI (₹)</th><th>Interest (₹)</th><th>Principal (₹)</th><th>Balance (₹)</th></tr></thead><tbody></tbody>`; const tbody = table.querySelector('tbody'); const toShow = schedule.slice(0, 12); toShow.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.m}</td><td>${currency(row.emi)}</td><td>${currency(row.interest)}</td><td>${currency(row.principal)}</td><td>${currency(row.balance)}</td>`; tbody.appendChild(tr);
    });
    if (schedule.length > 12) { const last = schedule[schedule.length - 1]; tbody.insertAdjacentHTML('beforeend', '<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>'); tbody.insertAdjacentHTML('beforeend', `<tr><td>${last.m}</td><td>${currency(last.emi)}</td><td>${currency(last.interest)}</td><td>${currency(last.principal)}</td><td>${currency(last.balance)}</td></tr>`); } wrap.innerHTML = ''; wrap.appendChild(table);
}
function clearSchedule() {
    document.getElementById('scheduleWrap').innerHTML = '';
}
document.getElementById('amount').oninput = recalc; document.getElementById('rate').oninput = recalc; document.getElementById('tenureVal').oninput = recalc;
document.getElementById('tenureUnit').onchange = recalc;
document.getElementById('genSchedule').onclick = genSchedule;
document.getElementById('clearSchedule').onclick = clearSchedule; window.addEventListener('DOMContentLoaded', recalc);
