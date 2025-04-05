import React, { useState, useEffect} from 'react';
import MidiNotes from './music/MidiNotes';
import SongSelector from './SongSelector'
import SoundfontPlayer, { instrument } from "soundfont-player";
import instruments from "./music/instruments.json";
import { Piano, MidiNumbers } from "react-piano";
import InstrumentSelector from './InstrumentSelector';
import "react-piano/dist/styles.css"; 

export default function Document () {
    const [theme, setTheme] = useState("light");
    const [audioContext, setAudioContext] = useState(null);
    const [songPlaying, setSongPlaying] = useState(null);
    const [instrumentType, setInstrumentType] = useState("Piano");
    const [selectedInstrument, setSelectedInstrument] = useState(instruments.Keys[0])
    const [noteIndex, setNoteIndex] = useState(0);
    const [player, setPlayer] = useState(null);
    const [textAlign, setTextAlign] = useState("left");
    let noteTimeout;
    const selectionLight = {
        color: "#db7093",
        fontFamily: 'papyrus',
        fontStyle: "italic",
        border: "2px solid #a19595",
        borderRadius: "10px",
        // backgroundColor: //"#7fffd4"
        // "#e0ffff",
        backgroundImage: "url('/assets/text-box-image-light.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontSize: "18px"
    }
    
    const selectionDark = {
        color: "rgb(20, 20, 20)",
        fontFamily: 'papyrus',
        fontStyle: "italic",
        border: "4px solid rgba(19, 18, 18, 0.39)",
        borderRadius: "10px",
        backgroundImage: "url('/assets/dark-text.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontSize: "18px"
    }

    useEffect(() => {
        const selections = document.getElementsByClassName("selection")
        if (selections.length > 0) {
            Array.from(selections).forEach((element) => {
                Object.assign(element.style, theme === "light"? selectionLight : selectionDark)
            })
    }
    document.body.style.backgroundImage =
        theme === "light"
        ? "url('/assets/music-back1-light.webp')"
        : "url('/assets/dark-paper.jpg')";

        document.documentElement.style.setProperty(
            "--textarea-bg",
            theme === "light"
            ? "url('/assets/text-box-image-light.jpg')"
            : "url('/assets/dark-text.jpg')"
        );
    })

    useEffect(() => {
        const context = new AudioContext();
        setAudioContext(context);
    }, [])

    useEffect(() => {
        if (audioContext && selectedInstrument) {
            SoundfontPlayer.instrument(audioContext, selectedInstrument).then((piano) => {
                setPlayer(piano);
            })
        }
    }, [audioContext, selectedInstrument]);

    const playNote = (note) => {
        if (player) {
            player.play(note);
            console.log("playing note:", note)
        }
}

    const playSong = (song) => {
        const playNextNote = () => {
            let currentNote = 0;
            if (currentNote < song.notes.length) {
                let note = song.notes[currentNote];
                playNote(currentNote);
                setNoteIndex(currentNote + 1);
                noteTimeout = setTimeout(playNextNote, 400)
            } else {
                setNoteIndex(0)
                
                
            }
        };
        playNextNote();
    }

    const handleChangeTheme = (e) => {
        setTheme(e.target.value);
}

    const handleKeydown = (e) => {
        if (songPlaying && noteIndex < songPlaying.notes.length) {
            if (noteTimeout) clearTimeout(noteTimeout);
             noteTimeout = setTimeout(() => {
            const note = songPlaying.notes[noteIndex];           
            // playNote(note);
            setNoteIndex(noteIndex + 1)}, 120);
        } else {
        setNoteIndex(0)
        }
    }

    const handleTextAlign = (e) => {
        setTextAlign(e.target.value);
        document.documentElement.style.setProperty(
            "--doc-align",
            e.target.value
        );
    }

    return (
        <>
        <Piano className="piano"
        noteRange={{ first: MidiNumbers.fromNote("A2"), last: MidiNumbers.fromNote("E5") }}
        width={750}
        height={200}
        playNote={playNote }  
        stopNote={() => {}}
        activeNotes={songPlaying && noteIndex < songPlaying.notes.length ? [MidiNumbers.fromNote(songPlaying.notes[noteIndex])] : []} 
        /> 
        <div >
        <h1 className={`header ${theme === "light" ? "header-light" : "header-dark"}`}>Key 2 Writing</h1>
        
        </div>
        <div>
        <SongSelector songPlaying={songPlaying} setSongPlaying={setSongPlaying}/>
        <InstrumentSelector instrumentType={instrumentType} setInstrumentType={setInstrumentType} selectedInstrument={selectedInstrument} setSelectedInstrument={setSelectedInstrument}/>
        </div>
        <br></br>
        <div className="document-container">
            
            <form >
                <textarea className="document-text" onKeyDown={handleKeydown}></textarea>
                
                <select className="selection" onChange={handleChangeTheme}>
                <option value="light">Modern <i>(Light)</i></option>
                <option value="dark">Traditional <i>(Dark)</i></option>
            </select>
            <select className="selection" onChange={handleTextAlign}>
                <option value="left">L-align</option>
                <option value="center">C-align</option>
                <option value="right">R-align</option>
            </select>
            </form>
        </div>
        </>
    )
}