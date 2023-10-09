
# Import Dependencies
from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS



#################################################
'''
Run these commands in terminal/bash to import the csv files to our database:
    mongod
    mongoimport --type csv -d HDI -c hdi_countries --headerline --drop HDI_countries.csv
    mongoimport --type csv -d HDI -c hdi_regions --headerline --drop HDI_regions.csv
    mongoimport --type csv -d HDI -c hdi_levels --headerline --drop HDI_levels.csv
    mongoimport --type csv -d HDI -c ihdi_countries --headerline --drop IHDI_countries.csv
    mongoimport --type csv -d HDI -c ihdi_regions --headerline --drop IHDI_regions.csv
    mongoimport --type csv -d HDI -c ihdi_levels --headerline --drop IHDI_levels.csv
    mongoimport --type csv -d HDI -c le_countries --headerline --drop le_countries.csv
    mongoimport --type csv -d HDI -c le_regions --headerline --drop le_regions.csv
    mongoimport --type csv -d HDI -c le_levels --headerline --drop le_levels.csv
    mongoimport --type csv -d HDI -c eys_countries --headerline --drop eys_countries.csv
    mongoimport --type csv -d HDI -c eys_regions --headerline --drop eys_regions.csv
    mongoimport --type csv -d HDI -c eys_levels --headerline --drop eys_levels.csv
    mongoimport --type csv -d HDI -c mys_countries --headerline --drop mys_countries.csv
    mongoimport --type csv -d HDI -c mys_regions --headerline --drop mys_regions.csv
    mongoimport --type csv -d HDI -c mys_levels --headerline --drop mys_levels.csv
    mongoimport --type csv -d HDI -c gni_countries --headerline --drop GNI_countries.csv
    mongoimport --type csv -d HDI -c gni_regions --headerline --drop GNI_regions.csv
    mongoimport --type csv -d HDI -c gni_levels --headerline --drop GNI_levels.csv
    mongoimport --type csv -d HDI -c gii_countries --headerline --drop GII_countries.csv
    mongoimport --type csv -d HDI -c gii_regions --headerline --drop GII_regions.csv
    mongoimport --type csv -d HDI -c gii_levels --headerline --drop GII_levels.csv
    mongoimport --type csv -d HDI -c ihdi_index_countries --headerline --drop IHDI_index_countries.csv
    mongoimport --type csv -d HDI -c ihdi_index_regions --headerline --drop IHDI_regions_index.csv
    mongoimport --type csv -d HDI -c ihdi_index_levels --headerline --drop IHDI_levels_index.csv
    mongoimport --type csv -d HDI -c HDI_2021_countries --headerline --drop HDI_2021_countries.csv
    mongoimport --type csv -d HDI -c HDI_2021_regions --headerline --drop HDI_2021_regions.csv
    mongoimport --type csv -d HDI -c HDI_2021_levels --headerline --drop HDI_2021_levels.csv


'''
#################################################
# Database Setup
#################################################

mongo = MongoClient(port=27017)
db = mongo['HDI']
hdi_countries = db['hdi_countries']
ihdi_countries = db['ihdi_index_countries']
hdi_2021_countries= db['HDI_2021_countries']
hdi_2021_regions = db['HDI_2021_regions']
ihdi_2021_regions = db['ihdi_regions']
hdi_trends_regions = db['hdi_regions']
ihdi_trends_regions = db['ihdi_index_regions']
# gii_countries = db['gii_countries']
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def hdi():

    # Quert The Database for Results
    results_hdi =  hdi_countries.find()
    results_ihdi = ihdi_countries.find()
    results_hdi_2021 = hdi_2021_countries.find()
    # results_gii = gii_countries.find()

    # Convert MongoDB results to a format that's easily serializable
    # Create an empty dictionary to hold the results
    hdi_outputs = {}
    output = []
    for result in results_hdi:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)
        
    hdi_outputs['hdi'] = output

    output = []
    for result in results_ihdi:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)
        
    hdi_outputs['ihdi'] = output

    output = []

    #results for HDI_2021_countries
    for result in results_hdi_2021:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)
        
    hdi_outputs['hdi_2021'] = output

    output = []

    # for result in results_gii: #, :
    #     # Convert ObjectId to string
    #     result['_id'] = str(result['_id'])  
    #     output.append(result)
        
    # hdi_outputs['gii'] = output

    return hdi_outputs

@app.route("/regions")
def hdi_regions():

    # Quert The Database for Results
    results_hdi_2021 = hdi_2021_regions.find()
    results_ihdi_2021 = ihdi_2021_regions.find()
    results_hdi_trends = hdi_trends_regions.find()
    results_ihdi_trends = ihdi_trends_regions.find()

    # Convert MongoDB results to a format that's easily serializable
    # Create an empty dictionary to hold the results
    hdi_regions_outputs = {}
    output = []

    #results for HDI_2021_regions
    for result in results_hdi_2021:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)

    hdi_regions_outputs['hdi_regions_2021'] = output

    output = []

    #results for IHDI_2021_regions
    for result in results_ihdi_2021:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)

    hdi_regions_outputs['ihdi_regions_2021'] = output

    output = []

    #results for HDI_trends_regions
    for result in results_hdi_trends:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)

    hdi_regions_outputs['hdi_trends_regions'] = output

    output = []

    #results for IHDI_trends_regions
    for result in results_ihdi_trends:
        
        # Convert ObjectId to string
        result['_id'] = str(result['_id'])  
        output.append(result)

    hdi_regions_outputs['ihdi_trends_regions'] = output

    return hdi_regions_outputs







if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9500, debug=True)