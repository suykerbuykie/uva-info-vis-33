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
from ast import literal_eval
from collections import Counter

rb = RateBeer()

app = Flask(__name__)
CORS(app)
api = Api(app)

def load_dataset():
	print("\nOne time loading dataset...")
	global df_beers
	global df_broad
	global df_subcats
	global df_reviews
	df_beers = pd.read_pickle('./data/beers.pickle')
	df_broad = pd.read_pickle('./data/broad_cats.pickle').reset_index()
	df_subcats = pd.read_pickle('./data/subcats.pickle')
	df_reviews = json.loads(pd.read_pickle('./data/review_matrix.p'))


	print("Done loading dataset.\n")#, df_broad.head(5))

with app.app_context():
	load_dataset()

# @app.route('/beers')
# def beers():
	# requested_beer = request.args['query']
	# response = rb.search(requested_beer)
	# beer = response['beers'][0].__dict__
	# beerpage = rb.get_beer(beer['url'], True).__dict__
	# del beerpage['brewery']
	# return json.dumps(beerpage)

	# file = open("beerstyles.json")
	# data = json.load(file)
	# return data

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

@app.route('/broad-categories')
def broadsCats():
	return df_broad.to_json(orient='records')


@app.route('/category')
def broads():
	requested_broad = str(request.args['query'])
	allCats = df_subcats.loc[df_subcats['broad_category_id'] == requested_broad]
	return allCats.to_json(orient='records')

@app.route('/beers')
def beers():
	requested_category = str(request.args['query'])
	allBeers = df_beers.loc[df_beers['sub_category_id'] == requested_category]
	return allBeers.to_json(orient='records')

@app.route('/similar_reviewed_beers')
def similar_reviewed_beers():
	requested_beer = str(request.args['query'])
	beer = Counter(df_reviews[requested_beer])
	topfive = beer.most_common()[:5]
	return dict((x, y) for x, y in topfive)



@app.route('/subcategory-allflavors')
def subcat_flavors():
	req_beer_id = int(request.args['query'])
	selected_beer = df_beers[df_beers['beer_id'] == req_beer_id].iloc[0]
	selected_sub_flavs = eval(selected_beer['sub_flavors'])
	
	# Get beers in this subcat
	subcat_beers = df_beers.loc[df_beers['sub_category_id'] == selected_beer['sub_category_id']].copy()

	uq = {}

	for _, val in subcat_beers.iterrows():
		beer_id = val["beer_id"]
		if beer_id == selected_beer['beer_id']:     # Check if this ID == the selected ID
			continue
		for subflav in eval(val["sub_flavors"]):	
			if subflav not in selected_sub_flavs:	# Check if flavor is in 
				continue
			if subflav not in uq:
				uq[subflav] = [beer_id]
			else:
				uq[subflav].append(beer_id)

	# Format for output
	jsonFormatted = []
	for key in uq:
		jsonFormatted.append({"name": key, "values": uq[key]})

	return json.dumps(jsonFormatted)

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
