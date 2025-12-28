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



    
if __name__ == '__main__':
    app.run(debug=True, port=5000)

