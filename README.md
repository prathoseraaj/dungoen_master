# Dungeon Master Game

An interactive text-based dungeon crawler game with AI-powered Dungeon Master.

## Project Structure

- `backend/` - Flask API server
- `frontend/` - React Native/Expo mobile app

## Setup

### Backend

1. Create a virtual environment and activate it:
```bash
python -m venv .venv
source .venv/bin/activate  
```

2. Install dependencies:
```bash
cd backend
pip install flask google-generativeai python-dotenv
```

3. Create a `.env` file in the root directory:
```
gemini_api_key=your_api_key_here
```

4. Run the Flask server:
```bash
python main.py
```

The server will run on `http://0.0.0.0:5000`

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the Expo development server:
```bash
npx expo start
```

3. Scan the QR code with Expo Go app on your mobile device

## How to Play

1. Start the Flask backend server
2. Launch the mobile app
3. The game will automatically connect and begin
4. Enter your actions in the text input
5. The AI Dungeon Master will respond with the story progression and dice rolls
6. Find the Golden Key to win!

## Goal

- **Win Condition**: Find the Golden Key to escape the castle
- **Lose Condition**: Make 3 critical mistakes
- **Dice Roll**: D20 system (15-20 = success, 1-10 = failure)
