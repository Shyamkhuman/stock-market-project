console.log('Stock Market Project Loaded');

const BASE_URL = "http://localhost:5000";

// ── PREDICT ──────────────────────────────────────────
function getPrediction() {
    const symbol = document.getElementById('stockSymbol').value;

    if (!symbol) {
        document.getElementById('predictionResult').innerText = "⚠️ Please enter a stock symbol.";
        return;
    }

    document.getElementById('predictionResult').innerText = "Loading...";

    fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: symbol })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('predictionResult').innerText =
            `${data.symbol}: ${data.prediction} (${data.confidence})`;
    })
    .catch(err => {
        document.getElementById('predictionResult').innerText =
            "❌ Error: Make sure app.py is running in CMD.";
    });
}

// ── CONTACT FORM ─────────────────────────────────────
function submitContact(event) {
    event.preventDefault(); // stops page from reloading

    const name    = document.getElementById('contactName').value;
    const email   = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ " + data.message);
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    })
    .catch(err => {
        alert("❌ Error: Make sure app.py is running in CMD.");
    });
}
