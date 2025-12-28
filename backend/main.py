from flask import Flask, jsonify, request
import google.generativeai as genai
import os
from dotenv import load_dotenv
import random

load_dotenv()

app = Flask(__name__)

gemini_api_key = os.getenv("gemini_api_key")
genai.configure(api_key=gemini_api_key)


instructions = (
    "You are a Dungeon Master. Use only simple English. "
    "GOAL: The player must find a 'Golden Key' to escape the castle and WIN. "
    "DANGER: If the player makes 3 big mistakes, they LOSE. "
    "Rules: "
    "1. If the player wins, you MUST say the exact words 'YOU WIN'. "
    "2. If the player loses, you MUST say the exact words 'GAME OVER'. "
    "3. Use the dice roll: 15-20 is great success, 1-10 is bad failure."
)

model = genai.GenerativeModel(model_name = 'gemini-2.5-flash', 
                              system_instruction = instructions)


@app.route('/')
def home():
    return jsonify({"message": "API is running"})

@app.route('/start')
def start():
    global chat_session

    chat_session = model.start_chat(history=[])
    init_message = chat_session.send_message(
        "Start the story in a rainy castle courtyard."
    )
    
    return jsonify({
        "story": init_message.text,
        "game_status": "started"
    })


@app.route('/chat', methods=['POST'])
def chat():
    global chat_session
        
    if 'chat_session' not in globals():
        return jsonify({"error": "Game not started"}), 400
    
    data = request.get_json()
    user_input = data.get('message','')
    
    if not user_input:
        return jsonify({"error": "No Message Provided"}), 400

    roll = random.randint(1, 20)
        
    game_action = f"Player Action: {user_input}. Dice Roll result: {roll}"
    response = chat_session.send_message(game_action)
    
    status = "playing"

    if "YOU WIN" in response.text.upper():
        status = "YOU WIN"
    elif "GAME OVER" in response.text.upper():
        status = "GAME OVER"
 
    return jsonify({
    "message": response.text,
    "dice_roll": roll,
    "game_status": status
})

    
if __name__ == '__main__':
    app.run(debug=True, port=5000)

