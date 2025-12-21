import google.generativeai as genai
import os 
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("gemini_api_key")
genai.configure(api_key="gemini_api_key")

model = genai.GenerativeModel("gemini-2.5-flash")

chat = model.start_chat(history=[])

while True:
    user_input = input()
    
    if user_input.lower() in ["quit","exit","bye"]:
        break
    
    response = chat.send_message(user_input)
    
    print(response)