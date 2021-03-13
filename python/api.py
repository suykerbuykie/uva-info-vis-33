# ./python/api.py
from ratebeer import RateBeer
import json
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from os import path
import pandas as pd
import pickle as pkl
import numpy as np

rb = RateBeer()

app = Flask(__name__)
CORS(app)
api = Api(app)

def load_dataset():
	print("One time loading dataset...")
	global df_beers
	df_beers = pd.read_csv('./data/beers_flavor_group_v5.csv')
	print("Done loading dataset.")

with app.app_context():
	load_dataset()

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
	requested_style = int(request.args['query'])
	allBeers = df_beers.loc[df_beers['style_id'] == requested_style]


	# if path.exists('data/cat_'+requested_style+'.json'):
	# 	file = open('data/cat_'+requested_style+'.json')
	# 	data = json.load(file)
		
	# 	return data
	# else:
	# 	beerstyles = rb.beer_style(requested_style)
	# 	beersList = list([b for b in beerstyles])
	# 	for beer in beersList:
	# 		beerDict = beer.__dict__
	# 		beerId = beerDict['url'].split("/")[-2]
	# 		beerpage = rb.get_beer(beerDict['url'], True).__dict__
	# 		del beerpage['brewery']
	# 		allBeers.append(beerpage)

	# 	with open('data/cat_'+requested_style+'.json', 'w') as outfile:
	# 		json.dump(json.dumps(allBeers), outfile)

	print(allBeers, 'ss')

	return allBeers.to_json()



if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
