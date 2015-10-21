#!flask/bin/python
from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/smartBins/getBins', methods=['GET'])
def get_tasks():
    bins = [
        {
            "location": "Location1",
            "binID": "Bin1",
            "fillLevel": "95%"
        },
        {
            "location": "Location2",
            "binID": "Bin2",
            "fillLevel": "87%"
        },
        {
            "location": "Location5",
            "binID": "Bin3",
            "fillLevel": "70%"
        },
        {
            "location": "Location3",
            "binID": "Bin4",
            "fillLevel": "61%"
        },
        {
            "location": "Location1",
            "binID": "Bin5",
            "fillLevel": "54%"
        },
        {
            "location": "Location2",
            "binID": "Bin6",
            "fillLevel": "49%"
        },
        {
            "location": "Location1",
            "binID": "Bin7",
            "fillLevel": "32%"
        },
        {
            "location": "Location4",
            "binID": "Bin8",
            "fillLevel": "14%"
        }
    ]

    return jsonify({'bins': bins})



if __name__ == '__main__':
    app.run(debug=True)