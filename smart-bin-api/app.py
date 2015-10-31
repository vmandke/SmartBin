#!flask/bin/python
from flask import Flask
from flask import jsonify
from flask import request
import urllib2
import json

USER_KEY = ""

app = Flask(__name__)

@app.route('/smartBins/getBins', methods=['POST'])
def get_tasks():
    data = request.json['coords']
    latitude = data['latitude']
    longitude = data['longitude']

    zomatoRequest = urllib2.Request('https://developers.zomato.com/api/v2.1/geocode?lat='+str(latitude)+'&lon='+str(longitude)+'')
    zomatoRequest.add_header('Accept', 'application/json')
    zomatoRequest.add_header('user_key', USER_KEY)
    response = urllib2.urlopen(zomatoRequest).read()

    nearby_bins = json.loads(response)['nearby_restaurants']
    bins = []
    for key in nearby_bins:
        value = nearby_bins[key]
        bin = {}
        bin['fillLevel'] = float(nearby_bins[key]['restaurant']['user_rating']['aggregate_rating']) * 20
        bin['location'] = nearby_bins[key]['restaurant']['location']['locality']
        bin['title'] = nearby_bins[key]['restaurant']['name']
        bin['longitude'] = nearby_bins[key]['restaurant']['location']['longitude']
        bin['latitude'] = nearby_bins[key]['restaurant']['location']['latitude']
        bin['binID'] = nearby_bins[key]['restaurant']['id']
        bins.append(bin)
        
    return jsonify({'bins': bins})

if __name__ == '__main__':
    with open('config.json') as data_file:
        data = json.load(data_file)
        USER_KEY = data['user_key'];
    app.run(debug=True)