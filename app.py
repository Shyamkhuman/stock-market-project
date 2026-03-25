from flask import Flask, request, jsonify
from flask_cors import CORS  # ADD THIS

app = Flask(__name__)
CORS(app)  # ADD THIS — allows GitHub Pages to connect

@app.route('/')
def index():
    return "Welcome to the Stock Market Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    stock_symbol = data.get('symbol', 'UNKNOWN')
    # Replace this with your actual ML prediction logic
    prediction = {
        'symbol': stock_symbol,
        'prediction': 'BUY',
        'confidence': '78%'
    }
    return jsonify(prediction)

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '')
    email = data.get('email', '')
    message = data.get('message', '')
    return jsonify({'status': 'success', 'message': 'Contact form submitted!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
