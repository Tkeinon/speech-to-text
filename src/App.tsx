import useSpeechRecognition from './hooks/useSpeechRecognition';
import LanguageSelector from './components/LanguageSelector';

function App() {
    const {
        isSupported,
        startListening,
        stopListening,
        transcript,
        listening,
    } = useSpeechRecognition();

    return (
        <div>
            <LanguageSelector />
            {isSupported ? (
                <>
                    <button onClick={startListening} disabled={listening}>
                        Start Listening
                    </button>
                    <button onClick={stopListening} disabled={!listening}>
                        Stop Listening
                    </button>
                </>
            ) : (
                <p>Your browser does not support Speech Recognition.</p>
            )}
            <div>{transcript}</div>
        </div>
    );
}

export default App;
