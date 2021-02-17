import React from "react";
import "../styles/ArtistsVis.css";

const ArtistInfo = ({ artist }) => {
    console.log("AAAA", artist);
    if (!artist) return <></>;
    return (
        <div style={{ display: "flex", flex: 1 }}>
            <img className="selected-img" src={artist.artistImage} />
            <div className="artist-info-wrapper">
                <span>{artist.name}</span>
                <a href={artist.artistLink} target="_blank">
                    Spotify Page
                </a>
            </div>
        </div>
    );
};

export default ArtistInfo;
