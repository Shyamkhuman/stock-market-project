console.log('Stock Market Project Loaded');

const BASE_URL = "http://localhost:5000";

function getPrediction() {
    const symbol = document.getElementById('stockSymbol').value.trim();

    if (!symbol) {
        document.getElementById('predictionResult').innerHTML = "⚠️ Please enter a stock symbol.";
        return;
    }

    document.getElementById('predictionResult').innerHTML = "⏳ Fetching live data...";

    fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: symbol })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            document.getElementById('predictionResult').innerHTML = `❌ ${data.error}`;
            return;
        }

        document.getElementById('predictionResult').innerHTML = `
            <div class="result-card">
                <h3>${data.symbol}</h3>
                <table>
                    <tr><td>💰 Current Price</td>  <td><b>${data.current_price}</b></td></tr>
                    <tr><td>📈 Change</td>          <td><b>${data.change}</b></td></tr>
                    <tr><td>🤖 Signal</td>          <td><b>${data.prediction}</b></td></tr>
                    <tr><td>🎯 Confidence</td>      <td><b>${data.confidence}</b></td></tr>
                    <tr><td>📊 7D Average</td>      <td><b>${data.avg_7d}</b></td></tr>
                    <tr><td>📊 30D Average</td>     <td><b>${data.avg_30d}</b></td></tr>
                    <tr><td>🔺 52W High</td>        <td><b>${data.high_52w}</b></td></tr>
                    <tr><td>🔻 52W Low</td>         <td><b>${data.low_52w}</b></td></tr>
                    <tr><td>📦 Volume</td>          <td><b>${data.volume}</b></td></tr>
                    <tr><td>📉 Volume Signal</td>   <td><b>${data.volume_signal}</b></td></tr>
                </table>
            </div>
        `;
    })
    .catch(() => {
        document.getElementById('predictionResult').innerHTML =
            "❌ Error: Make sure app.py is running in CMD.";
    });
}

function submitContact(event) {
    event.preventDefault();

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
    .catch(() => {
        alert("❌ Error: Make sure app.py is running in CMD.");
    });
}
