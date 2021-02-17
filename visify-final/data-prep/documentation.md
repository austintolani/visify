# Data Collection and Cleaning Documentation

Currently, two pieces of data are outputted when the user is authenticated: song data and artist data. 

## Song Data

The following is a list of fields in the song data:

- `name` The name of the song.
- `songLink` The URL to open the song in Spotify
- `popularity` The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
- `audioPreview` A link to a 30 second preview (MP3 format) of the track. Can be `null`.
- `albumName` The name of the album.
- `artist` An array of artist names.
- `albumArt` The link to an image of the album artwork.
- `genres` An array of strings which represents the genre categories of all of the artists featured on a song. Genres are not duplicated. Note that this list could be empty if Spotify hasn't classified the artists. 
- `audioFeatures` an object containing the following fields:
- `acousticness` A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
  - `danceability` Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
  - `energy` Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
  - `instrumentalness` Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
  - `liveness` Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
  - `loudness` The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
  - `speechiness` Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
  - `valence` A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
  - `tempo` The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.


## Artist Data

  The following is a list of fields in the artist data:

- `genres` An array of genres related to the artist

- `name` The name of the artist

- `artistLink` The Spotify link of the artist

- `popularity` The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist’s popularity is calculated from the popularity of all the artist’s tracks.

- `artistImage`  A link to an image of the artist

- `artistId` A unique id for the artist

- `relatedArtists` An array of related artists objects, each of which contain the following fields:

  - `genres` An array of genres related to the artist
  - `name` The name of the artist
  - `artistLink` The Spotify link of the artist
  - `artistImage` A link to an image of the artist
  - `artistId` A unique id for the artist