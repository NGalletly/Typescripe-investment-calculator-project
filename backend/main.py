from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/calculate', methods =['POST'])

def calculate():
    data = request.json
    init_amount = data.get('initAmount', 0)
    contribution = data.get('annualContribution', 0)
    expected_return = float(data.get('expectedReturn', 0)) / 100    
    duration = data.get('duration', 0)
    final_balance = init_amount
    total_deposits = init_amount

    for _ in range(int(duration)):
        final_balance+=contribution
        total_deposits+=contribution
        final_balance *= (1 + expected_return)
    
    return jsonify({
        'finalBalance': round(final_balance,2),
        'totalInterest': round(final_balance - total_deposits,2)
    })

if __name__ == '__main__':
    app.run(port=8000, debug=True)