from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    balance = float(data.get('initAmount', 0))
    contribution = float(data.get('annualContribution', 0))
    rate = float(data.get('expectedReturn', 0)) / 100
    duration = int(data.get('duration', 0))
    
    history = []
    accumulated_interest = 0

    for year in range(1, duration + 1):
        interest_this_year = balance * rate
        balance += interest_this_year + contribution
        accumulated_interest += interest_this_year
        
        history.append({
            "year": year,
            "interestEarned": round(interest_this_year, 2),
            "totalInterest": round(accumulated_interest, 2),
            "balance": round(balance, 2)
        })
    
    return jsonify({
        "finalBalance": f"${balance:,.2f}",
        "yearlyHistory": history
    })

if __name__ == '__main__':
    app.run(port=8000, debug=True)