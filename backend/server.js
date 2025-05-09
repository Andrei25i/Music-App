const express = require("express");
const { execFile } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const ytdlpPath = path.join(__dirname, "yt_env", "Scripts", "yt-dlp.exe");

app.get("/get-audio", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  const cmd = `"${ytdlpPath}" -f bestaudio -g "${url}"`;
  const args = ['-f', 'bestaudio', '-g', url];
  execFile(ytdlpPath, args, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send("Something went wrong...");
    }

    res.json({ audioUrl: stdout.trim() });
  });
});

app.listen(port, () => {
  console.log(`Server runs on http://localhost:${port}`);
});
