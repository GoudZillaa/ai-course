import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/videos", async (req, res) => {
  const { query } = req.body;
   if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    const youtubeRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`, {
        params: {
          q: query,
          part: 'snippet',
          maxResults: 3,
          key: process.env.YOUTUBE_API_KEY,
          type: 'video',
        }
      }
    );

    const videos = youtubeRes.data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.default.url
    }));

    res.json(videos);
  } catch (err) {
    console.error('🔴 Error in /api/videos route:', err.message)
    res.status(500).json({ error: "YouTube API error", err });
  }
});
export default router;