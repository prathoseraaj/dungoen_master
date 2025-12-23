import google.generativeai as genai
import os 
from dotenv import load_dotenv
import random

load_dotenv()

gemini_api_key = os.getenv("gemini_api_key")
genai.configure(api_key=gemini_api_key)

instructions = (
    "You are a Dungeon Master. Use only simple, basic English words. "
    "Do not use difficult or poetic words. "
    "Rules: 1. Use short sentences (max 10 words). "
    "2. Use common words that a child or a beginner can understand. "
    "3. End every turn with a simple question like 'What do you do?'. "
    "4. Narrate success if the dice roll is 15-20 and failure if it is 1-10."
)

model = genai.GenerativeModel(model_name = 'gemini-2.5-flash', 
                              system_instruction = instructions)

chat = model.start_chat(history=[])
initial_res = chat.send_message("Start the story in a rainy castle courtyard.")

print(f"DM: {initial_res.text}\n")

while True:
    
    user_input = input("You:")
    
    if user_input.lower() in ["quit","exit","bye"]:
        break
    
    roll = random.randint(1,20)
    print(f"System: You Rolled {roll}")
    
    game_action = f"Player Action: {user_input}. Dice Roll result: {roll}"
    
    response = chat.send_message(game_action)
    
    print(response.text)