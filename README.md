# dannymoon
DannyMoon.com

## Quick start

From the `dm1/` folder you can serve the site locally for visual QA:

```bash
cd dm1
python -m http.server 8000
# open http://localhost:8000/index.html in your browser
```

Server-side contact form: the serverless endpoint reads `process.env.BREVO_API_KEY` — do NOT commit API keys. Set `BREVO_API_KEY` in your deployment environment.

Assets and important files:
- `dm1/media/images/header.jpg` — hero image used on the front page
- `dm1/media/audio/DannyMoon_VoiceReel.wav` — primary voice reel used on the homepage

If you want a license added, tell me which one (MIT recommended for public repos).
