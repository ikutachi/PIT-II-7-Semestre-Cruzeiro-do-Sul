from flask import Flask, request, jsonify
import os

app = Flask(__name__)

USER_FILE = "users.txt"

if not os.path.exists(USER_FILE):
    with open(USER_FILE, "w") as f:
        pass

def read_users():
    with open(USER_FILE, "r") as f:
        users = {}
        for line in f:
            username, password = line.strip().split(",")
            users[username] = password
        return users

def write_user(username, password):
    with open(USER_FILE, "a") as f:
        f.write(f"{username},{password}\n")

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Usuário e senha requiridos"}), 400

    users = read_users()
    if username in users:
        return jsonify({"error": "Usuário já existe"}), 400

    write_user(username, password)
    return jsonify({"message": "Usuário registrado com sucesso"}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    users = read_users()
    if users.get(username) == password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 400

if __name__ == '__main__':
    app.run(debug=True)
