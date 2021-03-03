# ./python/api.py
from ratebeer import RateBeer
import json
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from os import path
rb = RateBeer()

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/beers')
def beers():
	# requested_beer = request.args['query']
	# response = rb.search(requested_beer)
	# beer = response['beers'][0].__dict__
	# beerpage = rb.get_beer(beer['url'], True).__dict__
	# del beerpage['brewery']
	# return json.dumps(beerpage)

	file = open("beerstyles.json")
	data = json.load(file)
	return data

@app.route('/find-beer', methods=['POST'])
def beer():
	allBeers = dict()
	requested_style = request.json
	beersList = list([b for b in rb.beer_style(requested_style['beerName'])])

	return beerList[0].__dict__

	# for beer in beersList:
	# 	beerDict = beer.__dict__
	# 	beerId = beerDict['url'].split("/")[-2]
	# 	beerpage = rb.get_beer(beerDict['url'], True).__dict__
	# 	del beerpage['brewery']
	# 	allBeers[beerId] = beerpage

	# return json.dumps(allBeers)

@app.route('/style')
def styles():
	allBeers = list()
	requested_style = request.args['query']
	if path.exists(requested_style+'.json'):
		file = open(requested_style+'.json')
		data = json.load(file)
		return data
	else:
		beerstyles = rb.beer_style(requested_style)

		beersList = list([b for b in beerstyles])
		for beer in beersList:
			beerDict = beer.__dict__
			beerId = beerDict['url'].split("/")[-2]
			beerpage = rb.get_beer(beerDict['url'], True).__dict__
			del beerpage['brewery']
			allBeers.append(beerpage)

		with open(requested_style+'.json', 'w') as outfile:
			json.dump(json.dumps(allBeers), outfile)

		return json.dumps(allBeers)



if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
