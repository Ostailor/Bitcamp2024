from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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


@app.route("/create", methods=["POST"])
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
    new_dict = {}
    department = request.args.get("department", default=None)
    search_term = request.args.get("search", default=None)

    if department is not None:
        filter_dict["department"] = department
    if search_term is not None:
        # Assuming the search term is applied to the title of the posts
        # For MongoDB, you can use a regular expression for case-insensitive search
        filter_dict["$or"] = [
            {"title": search_term},
            {"author": search_term},
            {"description": search_term},
        ]

    # Initialize an empty list to store the results from all collections
    all_posts = []

    # Iterate over all collections and fetch posts that match the filter
    for collection in collections.values():
        posts = list(collection.find(filter_dict))
        all_posts = all_posts + posts

    # Convert the list of posts to JSON and return it

    data = json_util.dumps(all_posts)
    return data, 200


@app.route("/posts/department", methods=["GET"])
def get_posts_department():
    # Construct a filter dictionary based on query parameters
    filter_dict = {}
    new_dict = {}
    department = request.args.get("department", default=None)
    search_term = request.args.get("search", default=None)

    if department is not None:
        filter_dict["department"] = department
    if search_term is not None:
        # Assuming the search term is applied to the title of the posts
        # For MongoDB, you can use a regular expression for case-insensitive search
        filter_dict["$or"] = [
            {"title": search_term},
            {"author": search_term},
            {"description": search_term},
        ]

    posts = list(department_collection.find(filter_dict))

    data = json_util.dumps(posts)
    return data, 200


@app.route("/posts/selling", methods=["GET"])
def get_posts_selling():
    # Construct a filter dictionary based on query parameters
    filter_dict = {}
    new_dict = {}
    search_term = request.args.get("search", default=None)

    if search_term is not None:
        # Assuming the search term is applied to the title of the posts
        # For MongoDB, you can use a regular expression for case-insensitive search
        filter_dict["$or"] = [
            {"title": search_term},
            {"author": search_term},
            {"description": search_term},
        ]

    print(f"Search term: {search_term}, Filter: {filter_dict}")  # Debugging line
    posts = list(selling_collection.find(filter_dict))

    data = json_util.dumps(posts)
    return data, 200


@app.route("/posts/clubs", methods=["GET"])
def get_posts_clubs():
    # Construct a filter dictionary based on query parameters
    filter_dict = {}
    new_dict = {}
    search_term = request.args.get("search", default=None)

    if search_term is not None:
        # Assuming the search term is applied to the title of the posts
        # For MongoDB, you can use a regular expression for case-insensitive search
        filter_dict["$or"] = [
            {"title": search_term},
            {"author": search_term},
            {"description": search_term},
        ]

    print(f"Search term: {search_term}, Filter: {filter_dict}")  # Debugging line
    posts = list(club_collection.find(new_dict))

    data = json_util.dumps(posts)
    return data, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
