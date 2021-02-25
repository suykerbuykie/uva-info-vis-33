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
	beer = response['beers'][0].__dict__
	beerpage = rb.get_beer(beer['url'], True).__dict__
	del beerpage['brewery']
	return json.dumps(beerpage)

@app.route('/style')
def styles():
	allBeers = dict()
	requested_style = request.args['query']
	beersList = list([b for b in rb.beer_style(requested_style)])
	for beer in beersList:
		beerDict = beer.__dict__
		beerId = beerDict['url'].split("/")[-2]
		beerpage = rb.get_beer(beerDict['url'], True).__dict__
		del beerpage['brewery']
		allBeers[beerId] = beerpage

	return json.dumps(allBeers)



if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
