import os
import sys

SPARK_HOME = '/usr/lib/spark'
os.environ['SPARK_HOME'] = SPARK_HOME
sys.path.append(SPARK_HOME + '/python')

from pyspark.sql import SparkSession
from pyspark.sql import HiveContext
import requests
import json
import pyrebase

from config import config

class SparkHiveExample:

    def __init__(self):
        ## initialize spark session
        self.spark = SparkSession.builder.appName("Spark Hive example").enableHiveSupport().getOrCreate()

        firebase = pyrebase.initialize_app(config)
        self.db = firebase.database()

    def run(self):
        ## download with opendata API
        url = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=55ec6d6e-dc5c-4268-a725-d04cc262172b"
        data = requests.get(url)

        result = data.json()['result']['results']
        self.db.child('metro').set(result)




if __name__ == "__main__":
    EXAMPLE = SparkHiveExample()
    EXAMPLE.run()

