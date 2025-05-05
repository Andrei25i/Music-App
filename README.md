# Music App
This is an app I created as a personal project to practice my skills in web development, particularly with React.

While building it, I wanted to get better at front-end development and experiment with some libraries and tools, like Express and the YouTube Data API. It also gave me a chance to dive into things like handling audio playback, creating a music player, building a playlist, and adding search functionality.

## Features
🎧 Music Player

🔍 Song Search

➕ Add songs to a queue

## Technologies Used
⚛️ [React](https://react.dev/) 
for the frontend

🌐 [Express](https://expressjs.com/) for the backend server

🎵 [Youtube Data API](https://developers.google.com/youtube/v3) for song searching

📦 [@distube/ytdl-core](https://www.npmjs.com/package/@distube/ytdl-core) for extracting the sound source

## Requirements
1. [Node.js](https://nodejs.org/en)
2. [Python](https://www.python.org/)
3. [A YouTube Data API Key](https://console.cloud.google.com/)

## Installation
1. Clone the repository

```bash
git clone https://github.com/Andrei25i/Music-App.git
```

2. Open a terminal in the root of the project and run
```bash
npm install
cd ./backend
npm install
python -m venv yt_env
yt_env\Scripts\activate
pip install yt_dlp
```

3. Insert the YouTube API Key in the .env file
```bash
VITE_YOUTUBE_API_KEY = "YOUR API KEY HERE"
```

## Usage
1. To use the app, first you have to start the backend:
```bash
cd ./backend
node ./server.js
```
2. After that, in another terminal, you have to start the frontend:
```bash
npm run dev
```
3. Access the localhost address of the project.

## Screenshots
![Screenshot 2025-04-02 170519](https://github.com/user-attachments/assets/db68d18e-e647-4bd8-b51e-390b6214cde3)


![Screenshot 2025-04-02 171601](https://github.com/user-attachments/assets/aaf8c5c9-b217-4aca-aaad-3ecc62db5dfe)

## Other Notes
The YouTube Data API has some limitations regarding the number of API requests made in a day (approximately 100 searches per day).

## License
This is a personal project created for learning and practice purposes. 

No explicit license is provided.
