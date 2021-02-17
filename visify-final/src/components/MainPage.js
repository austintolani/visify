import React, { useState, useEffect } from "react";
import "../styles/Header.css";
// import Header from "./Header";
import SongsVis from "./SongsVis";
import ArtistsVis from "./ArtistsVis";
import { sampleData } from '../data/sampleData';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
var Spotify = require("spotify-web-api-js");
var d3 = require("d3");


// Max for numTopSongs and numTopArtists is 50.
const numTopSongs = 35;
const numTopArtists = 25;
// Options for timeRange are "long_term" (several years of data), "medium_term" (approx. last 6 months), and "short_term" (last 4 weeks).

// const redirectUrl = "https://accounts.spotify.com/authorize?client_id=eeaa0eff8e304f3ca5a53ab8a0fc1b77&redirect_uri=http:%2f%2flocalhost:3000%2f&scope=user-top-read%20user-read-email&response_type=token";
const redirectUrl = "https://accounts.spotify.com/authorize?client_id=eeaa0eff8e304f3ca5a53ab8a0fc1b77&redirect_uri=https:%2f%2fwashuvis.github.io%2fvisify%2f&scope=user-top-read%20user-read-email&response_type=token"

var timeRange = getTimeFrame()



// Margins and width/height for loading visualization
var loadingVisMargin = { top: 5, right: 5, bottom: 5, left: 5 };

var loadingVisWidth = 0,
    loadingVisHeight = 500 - loadingVisMargin.top - loadingVisMargin.bottom;



// Parse for access token on page load
var accessToken = getAccessToken();


const MainPage = () => {
    const [songsIsSelected, setSongsIsSelected] = useState(true);
    const [songData, setSongData] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const [loading, setLoading] = useState(false);
    const showSongs = () => {
        setSongsIsSelected(true);
        document.getElementById("artistsButton").classList.remove("selected");
        document.getElementById("songsButton").classList.add("selected");
    };
    const showArtists = () =>{
        setSongsIsSelected(false);
        document.getElementById("songsButton").classList.remove("selected");
        document.getElementById("artistsButton").classList.add("selected");
    } 

    // Get access token and check if set, then get data from spotify
    useEffect(() => {
        if (
            accessToken &&
            songData === null &&
            artistData === null &&
            loading === false
        ) {

            // Call relevant function to set song data and artist data based on if sample data or real data is being used
            if (accessToken === "sampleData") {
                outputSampleData(sampleData, setLoading).then((result) => {
                    setSongData(result.songData);
                    setArtistData(result.artistData);
                    setLoading(false);
                })
            } else {
                outputSpotifyData(
                    accessToken,
                    setSongData,
                    setArtistData,
                    setLoading
                ).then((result) => {
                    console.log(result);
                    setSongData(result.songData);
                    setArtistData(result.artistData);
                    setLoading(false);
                });
            }

        } else {
            console.log("Account Not Authorized or already loaded data");
        }
    });

    return (
        <div id="container-main">
            {/* <Header setSongsIsSelected={setSongsIsSelected} /> */}
            <div id="vis-container">
                {!accessToken ? (
                    <div>
                        <h1>Welcome to Visify.</h1>
                        <p class="siteDescription" id="mainLineDescription">A powerful tool that visualizes your Spotify listening history. </p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>


                        <div class="buttonContainer">

                            <a class="initializeButton" id="initializeButton" href={`${redirectUrl}&state=short_term`}>Connect Spotify Account</a>
                            {/* <a class="initializeButton" href="https://accounts.spotify.com/authorize?client_id=eeaa0eff8e304f3ca5a53ab8a0fc1b77&redirect_uri=https:%2f%2fwashuvis.github.io%2fvisify%2f&scope=user-top-read%20user-read-email&response_type=token&state=123">Connect Spotify Account</a> */}

                            <div class="timeRangeContainer">
                            <p class="timeRangeDescription">Optionally, specifiy a time range to analyze:</p>
                            <br></br>
                                <select name="timeRange" id="timeRange" onChange={setTimeRange}>
                                    <option value="short_term" selected="selected">Short Term</option>
                                    <option value="medium_term">Medium Term</option>
                                    <option value="long_term">Long Term</option>
                                </select>
                        &nbsp;&nbsp;&nbsp;
                        <Popup trigger={<button className="popupInline"> i</button>} modal>
                                    <span>
                                        <h2>Time Range</h2>
                        This tool can analyze your data based on three different time ranges:
                        <br></br>

                                        <ul>
                                            <li><strong>Short Term: </strong>Approximately the last 4 weeks of your listening history.</li>
                                            <li><strong>Medium Term:</strong> Approximately the last 6 months of your listening history.</li>
                                            <li><strong>Long Term:</strong> Calculated from several years of data including all new data as it becomes available. </li>
                                        </ul>

                                    </span>
                                </Popup>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p class="siteDescription">If you don't have Spotify, you can use sample data as long as you won't judge our music taste &#128521;  .</p>
                            <a class="initializeButton" href={`${window.location.href}#access_token=sampleData&`} onClick={reloadPage}>Use Sample Data</a>
                        </div>
                    </div>
                ) : (null)}

                {loading ? (<div id="loadingVis"></div>) : null}
                {songData ? (<>
                    <div id="container-header">
                        <p className="button selected" id="songsButton" onClick={showSongs}>
                            Top Songs
            </p>
                        <div id="verticalLine" />
                        <p className="button" id="artistsButton" onClick={showArtists}>
                            Top Artists
            </p>

                    </div>
                </>) : null}
                {songsIsSelected && songData && artistData ? (

                    <SongsVis
                        songData={songData.sort(
                            (a, b) => b.popularity - a.popularity
                        )}
                    />
                ) : (
                        <ArtistsVis artistData={artistData} />
                    )}
            </div>
        </div>
    );
};

/**
 * Helper function to pause in an async function.
 *
 * @param {int} ms The number of milliseconds to pause for
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Helper function to reload page and preserve hash
 */
function reloadPage() {
    window.location.href += "#access_token=sampleData&";
    window.location.reload();
}

/**
 *  Helper function to change timeRange
 */

function setTimeRange() {
    timeRange = document.getElementById("timeRange").value;
    document.getElementById("initializeButton").href = `${redirectUrl}&state=${timeRange}`
}

/**
 * This function outputs the cleaned Spotify data.
 * @param {string} accessToken The user's access token
 */
async function outputSpotifyData(
    accessToken,
    setSongData,
    setArtistData,
    setLoading
) {
    setLoading(true);
    await delay(500);


    // Initialize loading visualization
    var svg = initLoadingVis();

    // Initialize and authorize Spotify
    var spotifyApi = new Spotify();
    spotifyApi.setAccessToken(accessToken);




    // // Get Top Tracks
    let topTracks = await spotifyApi.getMyTopTracks({
        limit: numTopSongs,
        time_range: timeRange,
    });
    // Play audio of top songs
    const songUrl = topTracks.items[0].preview_url;
    var audio = new Audio(songUrl);
    audio.play();

    // Get Top Artists
    let topArtists = await spotifyApi.getMyTopArtists({
        limit: numTopArtists,
        time_range: timeRange,
    });


    // Create new songs array and populate with cleaned song data
    let songs = [];
    for (let i = 0; i < topTracks.items.length; i++) {
        await delay(500);
        let song = topTracks.items[i];
        const trackId = song.id;
        // Append album image to vis
        appendImage(svg, song.album.images[1].url);
        //Create array of genres
        let songGenres = new Set();
        // Create array of artists
        let artists = new Array();
        song.artists.forEach(async (artist) => {
            artists.push(artist.name);
            let artistObject = await spotifyApi.getArtist(artist.id);
            artistObject.genres.forEach((genre) => {
                songGenres.add(genre);
            });
        });

        // Get audio features for the track
        let audioFeatures = await spotifyApi.getAudioFeaturesForTrack(trackId);

        // Filter data
        let songData = {
            name: song.name,
            songLink: song.external_urls.spotify,
            popularity: song.popularity,
            audioPreview: song.preview_url,
            albumName: song.album.name,
            artists: artists,
            albumArt: song.album.images[0].url,
            genres: Array.from(songGenres),
            audioFeatures: {
                acousticness: audioFeatures.acousticness,
                danceability: audioFeatures.danceability,
                energy: audioFeatures.energy,
                instrumentalness: audioFeatures.instrumentalness,
                liveness: audioFeatures.liveness,
                loudness: audioFeatures.loudness,
                speechiness: audioFeatures.speechiness,
                valence: audioFeatures.valence,
                tempo: audioFeatures.tempo,
            },
        };

        // Append to songs array
        songs.push(songData);
    }

    // Create new artists array and populate with cleaned artist data
    let artists = [];
    for (let i = 0; i < topArtists.items.length; i++) {
        let artist = topArtists.items[i];
        const artistId = artist.id;
        //Append artist image to vis
        appendImage(svg, artist.images[1].url);
        await delay(500);
        // Get related artists
        let relatedArtists = await spotifyApi.getArtistRelatedArtists(artistId);
        // Filter related artist data
        let relatedArtistsFiltered = relatedArtists.artists.map((artist) => {

        try{
            return {
                name: artist.name,
                artistLink: artist.external_urls.spotify,
                artistId: artist.id,
                artistImage: artist.images[0].url,
                genres: artist.genres,
            };
        }catch{
            console.log(`Error loading artist ${artist.name}`)
            return {
                name: artist.name,
                artistLink: artist.external_urls.spotify,
                artistId: artist.id,
                artistImage: "",
                genres: artist.genres,
            };
        }
        });
        // Filter data
        let artistData = {
            genres: artist.genres,
            name: artist.name,
            artistLink: artist.external_urls.spotify,
            popularity: artist.popularity,
            artistImage: artist.images[0].url,
            artistId: artistId,
            relatedArtists: relatedArtistsFiltered,
        };
        //Push filtered data element into artists array
        artists.push(artistData);
    }

    return { songData: songs, artistData: artists };
}


async function outputSampleData(storedData, setLoading) {
    setLoading(true);
    await delay(500);
    var svg = initLoadingVis();
    const songUrl = storedData.songData[0].audioPreview;
    console.log(songUrl)
    var audio = new Audio(songUrl);
    audio.play();

    for (let i = 0; i < storedData.songData.length; i++) {
        await delay(500);
        appendImage(svg, storedData.songData[i].albumArt);

    }

    for (let i = 0; i < storedData.artistData.length; i++) {
        await delay(500);
        appendImage(svg, storedData.artistData[i].artistImage);
    }


    return { songData: storedData.songData, artistData: storedData.artistData };
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
    var myRe = /^#access_token=.+?(?=&)/g;
    var result = myRe.exec(hashString.toString())[0];
    var token = result.slice(14);
    return token;
}

function getTimeFrame() {
    if (window.location.hash.length < 1) {
        return null;
    }
    var hashString = window.location.hash;
    var myRe = /state=(.+)/g;

    let result = null;
    if (myRe.exec(hashString)){
        console.log(myRe.exec(hashString))
        result =myRe.exec(hashString)[1]
    }

    return result;
}
/**
 * Initalizes the loading visualization
 */
function initLoadingVis() {

    // Set width dynamically
    loadingVisWidth = d3.select('#vis-container').node().getBoundingClientRect().width - loadingVisMargin.left - loadingVisMargin.right;

    var svg = d3.select("#loadingVis").append("svg")
        .attr("width", loadingVisWidth + loadingVisMargin.left + loadingVisMargin.right)
        .attr("height", loadingVisHeight + loadingVisMargin.top + loadingVisMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + loadingVisMargin.left + "," + loadingVisMargin.top + ")");
    svg.append("text")
        .text("Downloading and analyzing your Spotify data....")
        .attr("class", "loadingText")
        .attr('x', loadingVisWidth / 2)
        .attr('y', loadingVisHeight / 2)
        .style('font-size', '30px')
        .attr("text-anchor", "middle")
        .transition()
        .duration(6000)
        .style('font-size', '0px');

    return svg;
}

/**
 * Gets a pair of random coordinates inside of the loading visualization
  */
function randomCoordinates(startingLength, scale) {
    var x = Math.floor(Math.random() * loadingVisWidth) + 1;
    var y = Math.floor(Math.random() * loadingVisHeight) + 1;

    // Ensure that coordinates will not position image outside of visualization bounds, even after transition
    while (x > loadingVisWidth - (startingLength + 0.5 * scale) || x < (0.5 * scale) || y < (0.5 * scale) || y > loadingVisHeight - (startingLength + 0.5 * scale)) {
        x = Math.floor(Math.random() * loadingVisWidth) + 1;
        y = Math.floor(Math.random() * loadingVisHeight) + 1;
    }

    return { x: x, y: y };



}

/**
 * Appends an image to the loading visualization
 * @param {D3 Selection} svg The selection of the svg element
 * @param {String} imageURL URL of image to append
 */
function appendImage(svg, imageURL) {


    const startingLength = 100;
    const scale = 60;

    const coords = randomCoordinates(startingLength, scale);

    var imageElement = svg.append("svg:image")
        .attr('x', coords.x)
        .attr('y', coords.y)
        .attr('width', startingLength)
        .attr('height', startingLength)
        .attr("xlink:href", imageURL)
        .attr('opacity', 0)
        .transition()
        .duration(3000)
        .style("opacity", 1)
        // shift image inward by the amount the image is scaled
        .attr('x', coords.x - scale * 0.5)
        .attr('y', coords.y - scale * 0.5)

        .attr('width', startingLength + scale)
        .attr('height', startingLength + scale);


}


export default MainPage;
