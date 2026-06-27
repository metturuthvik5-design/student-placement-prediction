from flask import Flask, request, jsonify
import pickle
import logging
from flask_cors import CORS  # Import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Setup logging
logging.basicConfig(level=logging.DEBUG)

# In-memory user store: {username: password_hash}
users = {}

# Load the model
try:
    model = pickle.load(open("model.pkl", "rb"))
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model: {str(e)}")
    raise

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if username in users:
        return jsonify({"error": "User already exists"}), 400

    password_hash = generate_password_hash(password)
    users[username] = password_hash
    logging.info(f"User {username} signed up.")
    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    password_hash = users.get(username)
    if not password_hash or not check_password_hash(password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401

    logging.info(f"User {username} logged in.")
    return jsonify({"message": "Login successful"}), 200

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        logging.debug(f"Received data keys: {list(data.keys())}")

        # Extract StudentID (for identification in response)
        student_id = data.get('StudentID')

        # List of features including StudentID
        features = [
            data['StudentID'],
            data['CGPA'],
            data['Internships'],
            data['Projects'],
            data['Workshops/Certifications'],
            data['AptitudeTestScore'],
            data['SoftSkillsRating'],
            data['ExtracurricularActivities'],
            data['PlacementTraining'],
            data['SSC_Marks'],
            data['HSC_Marks']
        ]

        logging.debug(f"Received features: {features}")

        # Make prediction
        prediction = model.predict([features])[0]
        logging.debug(f"Prediction: {prediction}")

        # Return the prediction along with StudentID
        return jsonify({
            "StudentID": student_id,
            "prediction": "Placed" if prediction else "Not Placed"
        })

    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/features", methods=["GET"])
def get_features():
    try:
        feature_names = getattr(model, "feature_names_in_", None)
        if feature_names is not None:
            return jsonify({"features": feature_names.tolist()})
        else:
            return jsonify({"error": "Model does not have feature_names_in_ attribute"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
