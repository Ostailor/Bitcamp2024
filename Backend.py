from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import certifi
from urllib.parse import quote_plus

ca = certifi.where()

app = Flask(__name__)
uri = "mongodb+srv://otailor25:m2r5wma6Cr2370jS@cluster0.pqoemmx.mongodb.net"
# Connect to MongoDB
client = MongoClient(uri)
db = client["BitcampProject"]
club_collection = db["Clubs"]
department_collection = db["Department"]
selling_collection = db["Selling"]
collections = {
    "club": club_collection,
    "department": department_collection,
    "selling": selling_collection,
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    post = {
        "title": data["title"],
        "author": data["author"],
        "description": data["description"],
        "tab": data["tab"],  # Extract the tab from the request data
    }
    if data["tab"] == "Clubs":
        club_collection.insert_one(post)
    elif data["tab"] == "Selling":
        selling_collection.insert_one(post)
    else:
        department_collection.insert_one(post)

    return jsonify({"message": "Post created successfully"}), 201


@app.route("/posts", methods=["GET"])
def get_posts():
    # Construct a filter dictionary based on query parameters
    filter_dict = {}
    tab = request.args.get("tab", default=None)
    department = request.args.get("department", default=None)
    if department is not None:
        filter_dict["Department"] = department
    # Fetch filtered posts from the MongoDB collection
    posts = list(collections[tab].find())

    # Convert the list of posts to JSON and return it
    return jsonify(posts), 400


if __name__ == "__main__":
    app.run(port=5001, debug=True)
