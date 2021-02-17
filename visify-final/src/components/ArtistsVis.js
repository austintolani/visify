import React, { useState } from "react";
import ReactScrollableList from "react-scrollable-list";
import RelatedArtistChart from "../components/RelatedArtists";
import ArtistInfo from "./ArtistInfo";
import "../styles/ArtistsVis.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ArtistVis = ({ artistData }) => {
    const [selectedArtist, setSelectedArtist] = useState(null);
    console.log(selectedArtist);
    if (artistData === null) return null;

    const d = artistData.map((d, i) => {
        return {
            id: i,
            content: (
                <div
                    className={"artist-row"}
                    id={i}
                    onClick={() => setSelectedArtist(d)}
                >
                    {"#" + (i + 1)}
                    <img src={d.artistImage} className="artist-img" />
                    <span
                        style={
                            selectedArtist && selectedArtist.name === d.name
                                ? { marginLeft: 4, fontWeight: "bold" }
                                : { marginLeft: 4 }
                        }
                    >
                        {d.name}
                    </span>
                </div>
            ),
        };
    });

    return (
        <div id="container-artist">
            <div id="popular-artists-list">
                <h2 id="artist-header">Your Top Artists</h2>
                <ReactScrollableList
                    id="list"
                    listItems={d}
                    heightOfItem={30}
                    maxItemsToRender={50}
                    style={{ color: "#333", minWidth: 300, maxWidth: 300 }}
                />
                {selectedArtist && (
                    <div>
                        <h2>Selected Artist</h2>
                    <div id="artist-info">

                        <ArtistInfo artist={selectedArtist} />
                    </div>
                    </div>
                )}
            </div>
            <div id="artist-chart">
                <h2>How Are Your Artists Related to Each Other?</h2>
                <p>Click on an artist to reveal more information. Each group of related artists is given a unique color. </p>
                <RelatedArtistChart
                    artistData={artistData}
                    selectedArtist={selectedArtist}
                    setSelectedArtist={setSelectedArtist}
                />
                <Popup trigger={<button className="popup"> i</button>} modal>
                    <span>
                        <h2>Artist Relation Diagram</h2>
                        This visualization shows the relationships among your top artists using a node-edge diagram. 
                        <br></br>
                        <br></br>
                        For every artist, Spotify maintains a small list of related artist. In order for a line to be drawn between two artists in the diagram, one of the artists must by on the related artist list of the other artist. Every "cluster", defined by a series of connected nodes, is given a unique color. These clusters represent groups of releated artists. 
                        <br></br>
                        <br></br>
                    </span>
                </Popup>
            </div>
        </div>
    );
};

export default ArtistVis;
