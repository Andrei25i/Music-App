const express = require("express");
const ytdl = require('@distube/ytdl-core');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/get-audio", async (req, res) => {
    const url = req.query.url;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid or missing URL" });
    }

    try {
        const info = await ytdl.getInfo(url);

        // (sometimes audio sources return error 403, so video sources work better):
        const bestFormat = ytdl.chooseFormat(info.formats, {quality: '18'}) // the only itag that has audio and video at the best quality
        if (!bestFormat) {
            return res.status(404).json({ error: "Desired format not found" });
        }
        res.json({ audioUrl: bestFormat.url });

    } catch (error) {
        res.status(500).json({ error: "Could not extract audio" });
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server runs on http://localhost:${port}`);
});
