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

model = genai.GenerativeModel('gemini-2.5-flash')
chat = model.start_chat()

while True:
    
    user_input = input()
    
    if user_input.lower() in ["quit","exit","bye"]:
        break
    
    response = chat.send_message(user_input)
    
    print(response.text)