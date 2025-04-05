import React, {useState, useEffect} from 'react';
import {songs} from "./music/Songs"


export default function SongSelector({songPlaying, setSongPlaying}) {

    const handleChange = (e) => {
    const selectedTitle = e.target.value;
    const selectedSong = songs.find((songs) => songs.title === selectedTitle)
    setSongPlaying(selectedSong || null);
    }

        return (
            <div className="songSelector">
                <label className="selection">Select Song: </label>
                <select className="selection" onChange={handleChange} value={songPlaying?.title || ""}>
                <option value="">None</option>
                {songs.map((song) => (
                    <option key={song.title}>{song.title}</option>
                ))}
            </select>
            <div className="display-current-song">
                <label className="selection">Song Playing: <i>{songPlaying?.title || "None"}</i></label>
                </div>
            </div>
        )
    }
