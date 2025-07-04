# Playlist

A playlist in Transept Presenter represents a set of songs, media, and text slides for a single event. This data type will be output as a file with a unique extension, but a final decision on that value will be decided at a future date.

For human readability the playlist file will be in a YAML format

### Properties

|        Name | Required |         Value Type         | Description                                                               |
| ----------: | :------: | :------------------------: | :------------------------------------------------------------------------ |
|        name |   TRUE   |           string           | The name of the property                                                  |
|    sections |   TRUE   | Array<[Section](#section)> | A list of sections for the fully playlists. See [Section](#section)       |
| description |  FALSE   |           string           | A human readable description for users to review                          |
|      format |   TRUE   |           string           | The playlist format version of this file. This field should not be edited |
|     version |  FALSE   |            int             | The version of this playlist.                                             |

## Section

A section is a subset of data that should contain a song, set of media or other basic text elements. Sections have general configuration items such as

### Properties

|         Name | Required |       Value Type       | Description                                                                                                  |
| -----------: | :------: | :--------------------: | :----------------------------------------------------------------------------------------------------------- |
|         name |   TRUE   |         string         | The name of the section                                                                                      |
| autoplayback |  FALSE   |          int           | How many seconds to automatically play a slide. Defaults to 0s, if set to 0 seconds autoplayback is disabled |
|       slides |   TRUE   | Array<[Slide](#slide)> | A list of slide objects. See [Slide](#slide)                                                                 |
|      enabled |  FALSE   |          bool          | If this section should be actively displayed                                                                 |

1. Automatic Playback: Automatically forward to the next slide after so many seconds
2. Reference: Reference another section in the current playlist

## Slide

Slides represents a single static frame of the images that should be displayed. Within a section several properties automatically fall forward.

### Universal Slide Properties

|              Name |  Required   | Value Type | Description                                                                                                                                |
| ----------------: | :---------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------------- |
|              type |    TRUE     |   string   | One of the allowed slide types. See [Slide Types](#slide-types)                                                                            |
| playback_override |    FALSE    |    int     | How long this slide should be displayed _if_ autoplayback is active. Overwrites autoplayback value. If set to 0 uses the autoplayback time |
|        transition | ROLLFORWARD |   string   | Either `cut` or `fade` transition for the next slide                                                                                       |

### Slide Types

|  Type | Description                                           |
| ----: | :---------------------------------------------------- |
| media | Displays an image/video and does not contain any text |
|  text | Displays a specific set of text                       |

### Media Slide Properties

Media Slides include videos or static images and may or may not include audio settings.

|  Name | Required | Value Type | Description                |
| ----: | :------: | :--------: | :------------------------- |
| media |   TRUE   |   string   | path to the media location |

> [!NOTE]
> Currently Transept Presenter does not support in playlist configuration of video options. But will provide options to control playback speed, volume etc during the presentation

### Text Slide Properties

|       Name |  Required   | Value Type | Description                                        |
| ---------: | :---------: | :--------: | :------------------------------------------------- |
|    content |    TRUE     |   string   | A string holding all text that should be displayed |
|   fontSize | ROLLFORWARD |    int     | The size of the font to be displayed               |
| fontFamily | ROLLFORWARD |   string   | The name of the font to use                        |
| background | ROLLFORWARD |   string   | path to a background image to use                  |
|   position | ROLLFORWARD |  Position  | the X/Y position of the text both between 0 and 1  |

> [!NOTE]
> Blank slides can be added by entering an empty string with `""`.

# Example Playlist

```yaml
playlist:
  name: "Sunday Service - March 15, 2024"
  description: "Weekly worship service with announcements, worship songs, and sermon"
  format: "1.0.0"
  version: 1
  sections:
    - name: "Testing"
      enabled: false
      slides:
        - type: "media"
          media: "assets/images/test-slide.png"
    - name: "Welcome & Announcements"
      autoplayback: 8
      slides:
        - type: "media"
          media: "assets/images/welcome-slide.jpg"
          transition: "fade"
        - type: "media"
          media: "assets/images/announcements-slide.jpg"
        - type: "media"
          media: "assets/images/events-slide.jpg"

    - name: "Opening Worship"
      slides:
        - type: "text"
          content: "Amazing Grace"
          background: "assets/images/worship-background.gif"
          fontSize: 42
          fontFamily: "Times New Roman"
          position: { x: 0.5, y: 0.3 }
        - type: "text"
          content: "Amazing grace, how sweet the sound\nThat saved a wretch like me\nI once was lost, but now I'm found\nWas blind, but now I see"
        - type: "text"
          content: "Through many dangers, toils and snares\nI have already come\n'Tis grace hath brought me safe thus far\nAnd grace will lead me home"

    - name: "Sermon"
      autoplayback: 0
      slides:
        - type: "text"
          content: "The Power of Faith"
          fontSize: 44
          fontFamily: "Arial"
          position: { x: 0.5, y: 0.2 }
          transition: "fade"
        - type: "text"
          content: "Hebrews 11:1"
        - type: "text"
          content: "Now faith is confidence in what we hope for and assurance about what we do not see."
        - type: "text"
          content: "Key Points:\n• Faith requires trust\n• Faith leads to action\n• Faith brings hope"
        - type: "text"
          content: "Application:\nHow can we exercise our faith this week?"
    - name: "Closing"
      autoplayback: 5
      slides:
        - type: "text"
          content: "Thank you for joining us today"
          fontSize: 40
          fontFamily: "Arial"
          position: { x: 0.5, y: 0.4 }
          transition: "fade"
        - type: "text"
          content: "Please join us for coffee and fellowship in the lobby"
          transition: "fade"
        - type: "text"
          content: ""
          transition: "cut"
```

# Future Plans

Adding in note items to display on specific displays using name references to screen types. These should function as notes mostly for confidence monitors or altered slides for displays of variant sizes.
