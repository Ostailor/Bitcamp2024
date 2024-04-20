from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['post_database']
collection = db['posts']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    post = {
        'title': data['title'],
        'author': data['author'],
        'description': data['description'],
        'tab': data['tab'] # Extract the tab from the request data
    }
    collection.insert_one(post)
    return jsonify({'message': 'Post created successfully'}), 201

@app.route('/posts', methods=['GET'])
def get_posts():
    # Fetch all posts from the MongoDB collection
    posts = list(collection.find())
    # Convert the list of posts to JSON and return it
    return jsonify(posts)

if __name__ == '__main__':
    app.run(debug=True)
