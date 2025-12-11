# Spotify Minimal Widget for macOS

A minimal, glassmorphism-style Spotify widget for your macOS desktop using [Übersicht](https://tracesof.net/uebersicht/).

![Widget Preview](preview.png)

## Features

- Album artwork display
- Track name & artist
- Play/Pause, Previous, Next controls
- Glassmorphism design (frosted glass effect)
- Auto-updates every second
- Lightweight & native

## Requirements

- macOS 12.0 or later
- [Spotify](https://www.spotify.com/download/mac/) desktop app

## Quick Install

Run this single command in Terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/gangmingyu/ubersicht-spotify/main/install.sh | bash
```

This will automatically:
1. Install [Homebrew](https://brew.sh/) (if not installed)
2. Install [Übersicht](https://tracesof.net/uebersicht/) (if not installed)
3. Copy the widget to the correct location
4. Launch Übersicht

## Manual Install

1. Install Übersicht:
   ```bash
   brew install --cask ubersicht
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/gangmingyu/ubersicht-spotify.git
   ```

3. Copy the widget:
   ```bash
   cp ubersicht-spotify/spotify-minimal.jsx ~/Library/Application\ Support/Übersicht/widgets/
   ```

4. Launch Übersicht from Applications

## Customization

### Change Position

Edit `spotify-minimal.jsx` and modify the position values in `className`:

```javascript
// Default: Bottom-right
bottom: 20px;
right: 20px;

// Top-left
top: 40px;
left: 20px;

// Top-right
top: 40px;
right: 20px;

// Bottom-left
bottom: 20px;
left: 20px;
```

### Change Size

Modify `albumArtStyle` width/height for album art size.

## Uninstall

```bash
./uninstall.sh
```

Or manually:
```bash
rm ~/Library/Application\ Support/Übersicht/widgets/spotify-minimal.jsx
```

## Troubleshooting

**Widget not showing?**
- Make sure Übersicht is running (check menu bar)
- Make sure Spotify is running and playing music

**Controls not working?**
- Grant Übersicht accessibility permissions in System Preferences > Privacy & Security > Accessibility

## Credits

- Design inspired by [WidgetPod](https://apps.apple.com/app/widgetpod-music-widget/id1547172403)
- Built with [Übersicht](https://tracesof.net/uebersicht/)

## License

MIT License
