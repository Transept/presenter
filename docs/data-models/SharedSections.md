# Shared Sections

Shared sections are sections that are available across all playlists. These are typically used for announcements, logos, or other content that should appear in every service.

## Structure

Each shared section shall be in its own YAML file. It will include a user readable name.

### Example Shared Section File

This file would be stored as `announcements.yaml`:

```yaml
name: "Announcements"
baseLayerColor: "#000000"
autoPlay: true
slides:
  - forwarding:
      nextSlide: 1
      duration_ms: 5000
    layer: "Background"
    content:
      media: "/backgrounds/announcement-bg.jpg"
    enabled: true
  - forwarding:
      nextSlide: 2
      duration_ms: 8000
    layer: "Foreground"
    content:
      text: "Welcome to our service"
    enabled: true
  - forwarding:
      nextSlide: 0
      duration_ms: 6000
    layer: "Foreground"
    content:
      text: "Please turn off your phones"
    enabled: false
```

## Usage in Playlists

In a playlist, you can reference shared sections using their name:

```yaml
playlist:
  header:
    name: "Sunday Service"
    meta:
      creationDate: 01/01/2025
      author: "John Doe"
    layers:
      - "background"
      - "foreground"
      - "extra"
  sections:
    # Reference to shared section
    - reference: "announcements.yaml"

    # Local section
    - name: "Amazing Grace"
      type: "song"
      # ... song content
```
