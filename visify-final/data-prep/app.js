/**
 * PARAMETERS:
 */

// Max for numTopSongs and numTopArtists is 50. 
const numTopSongs = 40;
const numTopArtists = 30;
// Options for timeRange are "long_term" (several years of data), "medium_term" (approx. last 6 months), and "short_term" (last 4 weeks).
const timeRange = "short_term";








var accessToken = getAccessToken();

if (accessToken) {
    outputCleanedData(accessToken);

}
else {
    console.log("Account Not Authorized.")
}
















/**
 * This function outputs the cleaned Spotify data.
 * @param {string} accessToken The user's access token
 */
function outputCleanedData(accessToken) {
    // Initialize and authorize Spotify
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    // Get Top Tracks
    let topTracks = spotifyApi.getMyTopTracks({ "limit": numTopSongs, "time_range": timeRange });
    // Get Top Artists
    let topArtists = spotifyApi.getMyTopArtists({ "limit": numTopArtists, "time_range": timeRange });

    // Once all promises have resolved, clean and output data
    Promise.all([topArtists, topTracks]).then(async (values) => {
        // Get data from values parameter
        let topArtists = values[0];
        let topTracks = values[1];


        // Create new songs array and populate with cleaned song data
        let songs = [];
        for (let i = 0; i < topTracks.items.length; i++) {
            let song = topTracks.items[i];
            const trackId = song.id;

            // Create array of artists
            let artists = new Array();
            song.artists.forEach(artist => {
                artists.push(artist.name);
            })

            // Get audio features for the track
            let audioFeatures = await spotifyApi.getAudioFeaturesForTrack(trackId);


            // Filter data
            songData = {
                "name": song.name,
                "songLink": song.external_urls.spotify,
                "popularity": song.popularity,
                "audioPreview": song.preview_url,
                "albumName": song.album.name,
                "artists": artists,
                "albumArt": song.album.images[0].url,
                "audioFeatures": {
                    "acousticness": audioFeatures.acousticness,
                    "danceability": audioFeatures.danceability,
                    "energy": audioFeatures.energy,
                    "instrumentalness": audioFeatures.instrumentalness,
                    "liveness": audioFeatures.liveness,
                    "loudness": audioFeatures.loudness,
                    "speechiness": audioFeatures.speechiness,
                    "valence": audioFeatures.valence,
                    "tempo": audioFeatures.tempo
                }
            };
            // Append to songs array
            songs.push(songData);
        }

        // Create new artists array and populate with cleaned artist data
        let artists = [];
        for (let i = 0; i < topArtists.items.length; i++) {
            let artist = topArtists.items[i];
            const artistId = artist.id;

            // Get related artists
            let relatedArtists = await spotifyApi.getArtistRelatedArtists(artistId);
            // Filter related artist data
            let relatedArtistsFiltered = relatedArtists.artists.map(artist => {
                return {
                    "name": artist.name,
                    "artistLink": artist.external_urls.spotify,
                    "artistId": artist.id,
                    "artistImage": artist.images[0].url,
                    "genres": artist.genres,
                }
            })
            // Filter data
            artistData = {
                "genres": artist.genres,
                "name": artist.name,
                "artistLink": artist.external_urls.spotify,
                "popularity": artist.popularity,
                "artistImage": artist.images[0].url,
                "artistId": artistId,
                "relatedArtists": relatedArtistsFiltered

            }
            //Push filtered data element into artists array
            artists.push(artistData);
        }
        // Output data
        console.log("Top Songs", songs);
        console.log("Top Artists", artists)

    });

}


/**
 * @function getAccessToken Gets the Spotify access token from the URL and returns it. 
 * @return {string} {Spotify access token}
 */
function getAccessToken() {
    // Get authorization token
    if (window.location.hash.length < 1) {
        return null;
    }
    var hashString = window.location.hash;
    var myRe = /^#access_token=.+?(?=&)/g
    var result = myRe.exec(hashString.toString())[0];
    var token = result.slice(14);
    return token;

}
