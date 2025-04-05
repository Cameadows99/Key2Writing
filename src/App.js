import React, { useState, useEffect} from 'react';
import {Piano, MidiNumbers} from 'react-piano';
import {songs} from './components/music/Songs';
import Document from './components/Document';
import './App.css';
import SongSelector from './components/SongSelector';

export default function PianoApp() {
  const firstNote = MidiNumbers.fromNote('A0');
  const lastNote = MidiNumbers.fromNote('C8');
  const notesInRange = Array.from(
    { length: lastNote - firstNote + 1 }, // Create an array with the correct length
    (_, index) => firstNote + index // Fill the array with the notes
  );
  
  useEffect(() => {
    console.log(notesInRange)
  }, []);



    return (
      <>
      <Document />
      </>
    )
}


