import React, { useState } from "react";
import ReactScrollableList from "react-scrollable-list";
import SpiderChart from "../components/SpiderChart";
import BubbleChart from "../components/BubbleChart";
import DetailedChart from "../components/SelectedSongVis";
import "../styles/SongsVis.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
var d3 = require("d3");

const SongsVis = ({ songData }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const selectSong = (audioPrev) => {
        console.log("AUDIO", audioPrev);
        // songData.forEach((song) => {
        for (let i = 0; i < songData.length; i++) {
            console.log(songData[i].name + "|" + audioPrev);
            if (audioPrev === songData[i].name) {
                console.log("found", songData[i]);
                return songData[i];
            }
        }
        //  });
        return "Not found";
    };
    if (songData === null) return null;

    const d = songData.map((s, i) => {
        return {
            id: s.audioPreview,
            content: (
                <div class="songElement"
                    style={
                        selectedSong && selectedSong.name === s.name
                            ? {
                                display: "flex",
                                alignItems: "center",
                                border: "#FFAECF solid 1px",
                            }
                            : { display: "flex", alignItems: "center" }
                    }
                    id={s.name}
                    onClick={(e) => setSelectedSong(selectSong(s.name))}
                >
                    <div class="songNums">{"#" + (i + 1)}</div>
                    <img src={s.albumArt} className="song-img"></img>
                    <span>{s.name + " by " + s.artists[0]}</span>
                </div>
            ),
        };
    });
    // const d = songData.map((s, i) => {
    //     return {
    //         id: s.audioPreview,
    //         content: (
    //             <div
    //                 id={s.name}
    //                 onClick={(e) => setSelectedSong(selectSong(e.target.id))}
    //             >
    //                 {"#" + (i + 1) + " | " + s.name + " - " + s.artists[0]}
    //             </div>
    //         ),
    //     };
    // });

    if (selectedSong) {
        d3.select("#bubblechart").remove();
    }
    return (
        <div id="container-song">
            <div id="popular-songs-list">
                <h2>Your Top Songs</h2>
                <p>Select a song in the list to view individual song statistics. </p>
                <button
                    onClick={(e) => setSelectedSong(null)}
                    id="clearSongButton"
                >
                    Clear Song Selection
                </button>
                <ReactScrollableList
                    listItems={d}
                    heightOfItem={30}
                    maxItemsToRender={50}
                    style={{
                        color: "#333",
                        minWidth: 300,
                        maxWidth: 300,
                        minHeight: 600,
                    }}
                />
            </div>
            <div id="song-vis-wrapper">
                {selectedSong ? <h2>Individual Song Statistics</h2> : <div><h2>Your Top Genres</h2><p>Hover over a genre to see more detailed information. </p></div>}
                <div id="circlesVis">
                    {selectedSong ? (
                        <DetailedChart
                            songData={songData}
                            selectedSong={selectedSong}
                        />
                    ) : (
                            <BubbleChart
                                songData={songData}
                                selectedSong={selectedSong}
                            />
                        )}
                    {selectedSong ? (
                        <Popup
                            trigger={<button className="popup"> i</button>}
                            modal
                        >
                            <span>
                                <h2>Individual Song Statistics</h2>
                                This visualization shows how the audio features for the selected song
                                rank among your top songs.
                                <br></br>
                                <br></br>
                            </span>
                        </Popup>
                    ) : (
                            <Popup
                                trigger={<button className="popup"> i</button>}
                                modal
                            >
                                <span>
                                    <h2>Top Genres</h2>
                                Spotify assigns several genres to every song. This visualization is created by looking through your top songs and calculating the 10 most popular genres by occurance.
                                <br></br>
                                    <br></br>
                                The size of the genre corresponds to how many of your top songs the genre was associated with.
                                <br></br>
                                    <br></br>
                                </span>
                            </Popup>
                        )}
                </div>
                <h2>Audio Characteristics</h2>
                <div id="spider-chart">
                    <SpiderChart
                        songData2={songData}
                        selectedSong={selectedSong}
                    />
                    <Popup
                        trigger={<button className="popup"> i</button>}
                        modal
                    >
                        <span>
                            <h2>Audio Characteristics</h2>

                            This chart visualizes the values of various audio features of all your songs(average values) and the selected song. Here is what each
                            statistic means:
                            <br></br>
                            <ul>
                                <li>Danceability - describes how
                                suitable a track is for dancing based on a
                                combination of musical elements including tempo,
                                rhythm stability, beat strength, and overall
                            regularity. </li>
                                <li>Acousticeness - A confidence measure
                                from 0.0 to 1.0 of whether the track is acoustic.
                            1.0 represents high confidence the track is acoustic.</li>
                                <li>Energy - a measure from 0.0 to 1.0 and represents a
                                perceptual measure of intensity and activity.
                                Typically, energetic tracks feel fast, loud, and
                            noisy. </li>
                                <li>Valence - A measure from 0.0 to 1.0
                                describing the musical positiveness conveyed by a
                                track. Tracks with high valence sound more positive
                                (e.g. happy, cheerful, euphoric), while tracks with
                                low valence sound more negative (e.g. sad,
                            depressed, angry).</li>
                            </ul>


                        </span>
                    </Popup>
                </div>
            </div>
        </div>
    );
};

//<div >{selectedSong.name}</div>
export default SongsVis;
