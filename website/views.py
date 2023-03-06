from flask import Blueprint, render_template, request, flash, jsonify
import json

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    return render_template("home.html")

@views.route('enquire', methods=['GET', 'POST'])
def enquire():
    return render_template("enquire.html")

@views.route('about', methods=['GET', 'POST'])
def about():
    return render_template("about.html")

@views.route('portfolio', methods=['GET', 'POST'])
def portfolio():
    return render_template("portfolio.html")