import React, {useState, useEffect} from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interiResult = true;
mic.lang = 'en-US';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [saveNotes, setSavedNotes] = useState([]);

  // every time there is a change, will run useEffect
  useEffect(() => {
  handleListen()
  }, [isListening])

  const handleListen = () => {
  if(isListening) {
    mic.start();
    mic.onend = () => {
      console.log('continue...')
      mic.start();
    }
  } else {
    mic.stop()
    mic.onend = () => {
      console.log('Stopped Mic on Click')
    }
  }
  mic.onstart = () => {
    console.log('Mic is on')
  }

  mic.onresult = event => {
    // results for getting back from the event / when we are gonna speak into the mic and give us back and turned into an array
    // transcript of voice to text
    const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    console.log(transcript);
     setNote(transcript);
     
    mic.onerror = event => {
      console.log(event.error)
    }
  }
  }

  const handleSaveNote = () => {
    setSavedNotes([...setSavedNotes, note])
    setNote('')
  }
  
  return (
    <>
    <h1>Voice Notes</h1>
    <div className='container'>
      <div className='box'>
        <h2>Current Note</h2>
        {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
        <button onClick={handleSaveNote} 
        disabled={!note}>
          Save Note</button>
        <button onClick={() => 
          setIsListening(prevState => !prevState)}>
            Start/Stop</button>
            <p>{note}</p>
      </div>
     <div className='box'>
       <h2>Notes</h2>
       {saveNotes.map(n => (
         <p key={n}>{n}</p>
       ))}
     </div>
    </div>
    </>
  );
}

export default App;
