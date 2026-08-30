Deployment & Asset Instructions

1) Header image
- Copy your header image `D4AA835E-C6F5-495C-9BF4-DEE818409A18.jpeg` into `dm1/media/images/` and rename it to `header.jpg`.

2) Audio files
- Copy these audio files into `dm1/media/audio/` using exactly these filenames:
  - `DannyMoon_VoiceReel.wav`    (will display as "Voice Reel")
  - `Spirits_Audition.wav`       (will display as "Monster")
  - `Snickers_DannyMoon.wav`     (will display as "Snickers Commercial")
  - `Narrator_DannyMoon.wav`     (will display as "Documentary")

3) Theme color
- To match the site's accent color to your header image, open `dm1/style.css` and edit the `--accent` value under `:root` to a hex color that matches the image.

4) Contact form
- The contact form on `contact.html` will send to `mktv.booking@gmail.com` via the `/api/contact` endpoint.
- The server-side handler uses Brevo. Set the environment variable `BREVO_API_KEY` when deploying if you want the form to send via Brevo.

5) Local testing
- Serve `dm1/` with a static server (e.g., VS Code Live Server extension or `python -m http.server` from the `dm1` folder).
- Open `http://localhost:8000/index.html` (or the port your server uses) and verify:
  - Header image located at `media/images/header.jpg` appears
  - Audio players load and play audio (one plays at a time)
  - Contact page `contact.html` displays the form and sends JSON to `/api/contact` (server must handle Brevo key)

If you want, I can copy the two local files you mentioned into the project if you upload them here (the header JPEG and `DannyMoon_VoiceReel.wav`). I can also sample the header image and pick a matching accent color automatically if you upload the image.
