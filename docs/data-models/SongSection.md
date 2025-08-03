# Song Sections

Song sections represent songs with parts (verses, choruses) and arrangements. They allow for flexible song structures with multiple arrangements and per-playlist background customization.

Song sections can also be saved to be reused via file references. Note that a song reference must include the arrangement.

## Structure

### Inline Song Definition

```yaml
sections:
  - name: "Amazing Grace"
    type: "song"
    baseLayerColor: "#000000"
    autoPlay: false
    pinned: false
    # Song-specific properties
    song:
      parts:
        verse1:
          displayName: "Verse 1"
          slides:
            - forwarding:
                nextSlide: 1
                duration_ms: 0
              layer: "Foreground"
              content:
                text: "Amazing grace, how sweet the sound\nThat saved a wretch like me"
              enabled: true
        chorus1:
          displayName: "Chorus"
          slides:
            - forwarding:
                nextSlide: 1
                duration_ms: 0
              layer: "Foreground"
              content:
                text: "Amazing grace, how sweet the sound\nThat saved a wretch like me"
              enabled: true
        verse2:
          displayName: "Verse 2"
          slides:
            - forwarding:
                nextSlide: 1
                duration_ms: 0
              layer: "Foreground"
              content:
                text: "I once was lost, but now I'm found\nWas blind, but now I see"
              enabled: true
      arrangements:
        - name: "Standard"
          sequence: ["verse1", "chorus1", "verse2", "chorus1"]
        - name: "Short"
          sequence: ["verse1", "chorus1"]
      # Default background for this song
      defaultBackground: "/backgrounds/worship-bg.jpg"
    # Per-playlist background override
    backgroundOverride: "/backgrounds/special-worship-bg.jpg"
```

### Referenced Song

```yaml
sections:
  # Referenced song with arrangement (required)
  - reference: "amazing-grace.yaml"
    arrangement: "Standard"
    backgroundOverride: "/backgrounds/special-worship-bg.jpg"

  # Referenced song with different arrangement
  - reference: "amazing-grace.yaml"
    arrangement: "Short"
```

## Key Features

### Song Parts

- **Key-based structure**: Parts use keys like `verse1`, `chorus1` for easy reference
- **Display names**: User-friendly names like "Verse 1", "Chorus" for the UI
- **Individual slides**: Each part contains its own slide content

### Arrangements

- **Multiple arrangements**: Different play orders for the same song
- **Sequence-based**: Arrays of part keys define the order
- **Named arrangements**: "Standard", "Short", etc. for easy selection
- **Required for references**: When referencing a song file, the arrangement must be specified

### Background Customization

- **Default background**: Song's standard background (`defaultBackground`)
- **Per-playlist override**: Custom background for specific services (`backgroundOverride`)
- **Fallback system**: Uses default if no override is specified

## File Structure

Songs are stored in separate YAML files in the `Songs/` directory:

```
Songs/
├── amazing-grace.yaml
├── how-great-thou-art.yaml
└── it-is-well.yaml
```

Each song file contains the complete song definition with all parts and arrangements.

## Usage in Playlists

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
    # Referenced song with arrangement and background override
    - reference: "amazing-grace.yaml"
      arrangement: "Standard"
      backgroundOverride: "/backgrounds/special-worship-bg.jpg"

    # Referenced song with different arrangement
    - reference: "amazing-grace.yaml"
      arrangement: "Short"
```
