from flask import Flask
from flask import request, jsonify
from sklearn.externals import joblib
import pickle
import json

app = Flask(__name__)

@app.route('/processfoodword')
def process():
    return

@app.route('/findmatchingabbreviations')
def display():
    return

