const GST_RATE = 0.05;
function currency(n) {
    return (Math.round(n * 100) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 });
}
function getSelectedPrice(el) {
    const opt = el.options[el.selectedIndex]; return Number(opt.dataset.price || opt.dataset.extra || opt.dataset.fee || 0);
}


function recalc() {
    const flavor = document.getElementById('flavor'); const basePerKg = getSelectedPrice(flavor);
    document.getElementById('basePricePill').textContent = `₹${basePerKg}/kg`;
    let weight = Number(document.getElementById('weight').value);
    if (isNaN(weight) || weight < 0.5) {
        document.getElementById('errors').textContent = 'Weight must be at least 0.5 kg.'; weight = 0.5; document.getElementById('weight').value = weight.toFixed(1);

    }
    const frostingExtra = getSelectedPrice(document.getElementById('frost'));
    const layers = Number(document.getElementById('layers').value);
    const layerFee = (layers - 1) * 120;
    const eggless = document.getElementById('eggless').checked ? 90 : 0;
    const base = basePerKg * weight; const frosting = frostingExtra * weight;
    let toppings = 0;
    let toppersTxt = [];
    document.querySelectorAll('.topper:checked').forEach(cb => {
        toppings += Number(cb.dataset.price); toppersTxt.push(cb.value);
    });
    const msg = document.getElementById('msg').value || '';
    const extraChars = Math.max(0, msg.length - 20); const messageFee = extraChars * 2;
    const deliveryFee = getSelectedPrice(document.getElementById('delivery'));
    let items = [['Base', base], ['Frosting add-on', frosting], ['Layers', layerFee], ['Eggless', eggless], ['Toppings', toppings], ['Custom message fee', messageFee], ['Delivery', deliveryFee]];
    const tbody = document.getElementById('billBody'); tbody.innerHTML = ''; let subtotal = 0;
    items.forEach(([desc, amt]) => {
        if (amt > 0) {
            subtotal += amt; const tr = document.createElement('tr');
            tr.innerHTML = `<td>${desc}</td><td>${currency(amt)}</td>`; tbody.appendChild(tr);
        }
    });
    const { discAmt, tag } = computeDiscount(subtotal); const afterDiscount = subtotal - discAmt;
    const tax = afterDiscount * GST_RATE; const grand = afterDiscount + tax;
    document.getElementById('subtotal').textContent = currency(subtotal);
    document.getElementById('discount').textContent = (discAmt > 0 ? '-' + currency(discAmt) : currency(0)) + (tag ? ` (${tag})` : '');
    document.getElementById('tax').textContent = currency(tax); document.getElementById('grand').textContent = '₹' + currency(grand);
}
function computeDiscount(subtotal) {
    const code = (document.getElementById('coupon').value || '').trim().toUpperCase(); let discAmt = 0, tag = '';
    if (code === 'CAKE10') {
        discAmt = subtotal * 0.10; tag = '10% off';
    }
    else if (code === 'FEST5') {
        discAmt = subtotal * 0.05; tag = '5% off';

    }
    return { discAmt, tag };
}
document.getElementById('flavor').onchange = recalc;
document.getElementById('weight').oninput = recalc;
document.getElementById('layers').onchange = recalc;
document.getElementById('frost').onchange = recalc;
document.getElementById('eggless').onchange = recalc;
document.querySelectorAll('.topper').forEach(cb => cb.onchange = recalc);
document.getElementById('msg').oninput = recalc;
document.getElementById('delivery').onchange = recalc;
document.getElementById('coupon').oninput = recalc;
document.getElementById('clearCoupon').onclick = () => { document.getElementById('coupon').value = ''; recalc(); };
document.getElementById('printBill').onclick = () => window.print();
window.addEventListener('DOMContentLoaded', recalc);
