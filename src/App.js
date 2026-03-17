import { useEffect } from "react";
import { MidiNumbers } from "react-piano";
import Document from "./components/Document";
import "./App.css";

export default function PianoApp() {
  useEffect(() => {
    const firstNote = MidiNumbers.fromNote("A0");
    const lastNote = MidiNumbers.fromNote("C8");
    const notesInRange = Array.from(
      { length: lastNote - firstNote + 1 }, // Create an array with the correct length
      (_, index) => firstNote + index, // Fill the array with the notes
    );
    console.log(notesInRange);
  }, []);

  return (
    <>
      <Document />
    </>
  );
}
