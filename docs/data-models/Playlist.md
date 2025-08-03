# Playlist

A playlist is a set of independent sections that store the changes to slides. Each playlist item is like a slide, but only contains a layer if it exists.

## Header

A playlist header includes

1. The different layers of the playlist
2. The name of the playlist
3. Relevant Metadata

## Body

The body of a playlist stores a list of sections. Each section is independent, having some functional settings unique to a setting.

```yaml
playlist:
  header:
    name: "Sample Playlist"
    meta:
      creationDate: 2025-01-01
      author: "John Doe"

    layers:
      - "background"
      - "foreground"
      - "extra"
    sections: ...
```

### Section Types

Sections can be of different types with specific behaviors:

#### 1. Shared Sections

Sections that are shared across all playlists (like announcements). These are stored in separate YAML files and referenced by filename.

```yaml
sections:
  # Reference to shared section
  - reference: "announcements.yaml"

  # Local section
  - name: "Local Section"
    type: "text"
    baseLayerColor: "#000000"
    autoPlay: true
    slides: ...
```

#### 2. Song Sections

Sections that represent songs with parts (verses, choruses) and arrangements. Songs can be defined inline or referenced from separate files. See [SongSection.md](SongSection.md) for detailed documentation.

```yaml
sections:
  # Inline song definition
  - name: "Amazing Grace"
    type: "song"
    baseLayerColor: "#000000"
    autoPlay: false
    pinned: false
    song:
      parts:
        verse1:
          displayName: "Verse 1"
          slides: [...]
        chorus1:
          displayName: "Chorus"
          slides: [...]
      arrangements:
        - name: "Standard"
          sequence: ["verse1", "chorus1", "verse1", "chorus1"]
      defaultBackground: "/backgrounds/worship-bg.jpg"
    backgroundOverride: "/backgrounds/special-worship-bg.jpg"

  # Referenced song with arrangement
  - reference: "amazing-grace.yaml"
    arrangement: "Standard"
    backgroundOverride: "/backgrounds/special-worship-bg.jpg"

  # Referenced song with different arrangement
  - reference: "amazing-grace.yaml"
    arrangement: "Short"
```

#### 3. Generic Text Sections

Sections for sermons, presentations, or other text content.

```yaml
sections:
  - name: "Sermon Notes"
    type: "text"
    baseLayerColor: "#000000"
    autoPlay: false
    pinned: false
    slides:
      - forwarding:
          nextSlide: 1
          duration_ms: 0
        layer: "Background"
        content:
          media: "/backgrounds/sermon-bg.jpg"
        enabled: true
      - forwarding:
          nextSlide: 2
          duration_ms: 0
        layer: "Foreground"
        content:
          text: "The Power of Faith"
          fontSize: 48
        enabled: true
      - forwarding:
          nextSlide: 3
          duration_ms: 0
        layer: "Foreground"
        content:
          text: "Hebrews 11:1\nNow faith is confidence in what we hope for..."
          fontSize: 36
        enabled: true
```

### Slide Deltas

The section includes a set of slides deltas in its `slides` key. A slide delta includes

1. Changes to each slide layer
2. Slide Metadata
   1. Forwarding Information
      1. What is the next slide
      2. How long to stay on the current slide in milliseconds [^1]
   1. Slide Change Content
      1. Image Layers
      2. Video Layers
      3. Text Layers
   1. Applied Layer

```yaml
slides:
  - forwarding:
      nextSlide: 1 # Sequential navigation (0-indexed)
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
      nextSlide: 0 # Loop back to first slide
      duration_ms: 6000
    layer: "Foreground"
    content:
      text: "Please turn off your phones"
    enabled: false
```

[^1]: NOTE - in the user interface this should be shown in seconds

## Complete Example

```yaml
playlist:
  header:
    name: "Sunday Service"
    meta:
      creationDate: 2025-01-01
      author: "John Doe"
    layers:
      - "background"
      - "foreground"
      - "extra"
  sections:
    # Reference to shared announcements (available in all playlists)
    - reference: "announcements.yaml"

    # Referenced song with arrangement and background override
    - reference: "amazing-grace.yaml"
      arrangement: "Standard"
      backgroundOverride: "/backgrounds/special-worship-bg.jpg"

    # Generic text section for sermon
    - name: "Sermon Notes"
      type: "text"
      baseLayerColor: "#000000"
      autoPlay: false
      pinned: false
      slides:
        - forwarding:
            nextSlide: 1
            duration_ms: 0
          layer: "Background"
          content:
            media: "/backgrounds/sermon-bg.jpg"
          enabled: true
        - forwarding:
            nextSlide: 2
            duration_ms: 0
          layer: "Foreground"
          content:
            text: "The Power of Faith"
            fontSize: 48
          enabled: true
```
