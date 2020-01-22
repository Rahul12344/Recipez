from flask import Flask, request

from models.foodidentifier import FoodWord

app = Flask(__name__)

@app.route('/checkfood')
def isFood():
    isfood = request.args.get('isfood')
    return FoodWord.search(isfood)
