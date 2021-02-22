# ./python/api.py
from ratebeer import RateBeer
import json
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
rb = RateBeer()

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/beers')
def beers():
	requested_beer = request.args['query']
	response = rb.search(requested_beer)
	# right now this returns a dict, need to be mapped and then returned as json.
	return response

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
