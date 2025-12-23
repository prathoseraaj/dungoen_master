import google.generativeai as genai
import os 
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("gemini_api_key")
genai.configure(api_key=gemini_api_key)

instructions = (
    "You are a mysterious Dungeon Master in a dark fantasy world. "
    "Rules: 1. Keep descriptions under 3 sentences. 2. End every turn with 'What do you do?'. "
    "3. Use the dice roll provided in the prompt to narrate success (15-20) or failure (1-10)."
)

model = genai.GenerativeModel(model_name = 'gemini-2.5-flash', 
                              instructions = instructions)

chat = model.start_chat(history=[])
initial_res = chat.send_message("Start the story in a rainy castle courtyard.")

while True:
    
    user_input = input()
    
    if user_input.lower() in ["quit","exit","bye"]:
        break
    
    response = chat.send_message(user_input)
    
    print(response.text)