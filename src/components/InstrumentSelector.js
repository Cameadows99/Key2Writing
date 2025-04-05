import instruments from "./music/instruments.json"
import React from 'react';
// import { selectionLight, selectionDark} from "../styles/Theme";

export default function InstrumentSelector({ instrumentType, setInstrumentType, selectedInstrument, setSelectedInstrument }) {

        const handleInstrumentTypeChange = (e) => {
            const instType = e.target.value;
            setInstrumentType(instType); 
            if (instruments[instType].length > 0){
            setSelectedInstrument(instruments[instType][0]);
        } else { 
            console.error("no instrument");
        }
        }
    
        const handleInstrumentChange = (e) => {
            setSelectedInstrument(e.target.value);
        }

    return (
        <div className="instrument-selector">
            <br></br>
            <select className="selection" onChange={handleInstrumentTypeChange} value={instrumentType} >
                <option value="">None</option>
                {Object.keys(instruments).map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <select className="selection" onChange={handleInstrumentChange} value={selectedInstrument} >
                {instruments[instrumentType]?.map((specificInstrument) => (
                    <option key={specificInstrument} value={specificInstrument}>{specificInstrument}</option>
                ))}
            </select>
        </div>
    )
}