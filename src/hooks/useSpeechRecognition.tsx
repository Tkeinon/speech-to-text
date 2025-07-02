import { useState, useRef, useCallback } from 'react';


const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [isSupported] = useState(() =>
        typeof window !== 'undefined' 
        && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );

    // Use ref to persist the recognition instance
    const recognitionRef = useRef<InstanceType<NonNullable<typeof window.SpeechRecognition>> | null>(null);

    const getRecognition = useCallback(() => {
        if (!recognitionRef.current && isSupported) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();

                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'fi-FI';

                recognition.onresult = (event: any) => {
                    let finalTranscript = '';

                    for (let i = 0; i < event.results.length; ++i) {
                        finalTranscript += event.results[i][0].transcript;
                    }

                    setTranscript(finalTranscript);
                };
                recognition.onend = () => setListening(false);
                recognition.onerror = () => setListening(false);

                recognitionRef.current = recognition;
            }
        }
        return recognitionRef.current;
    }, [isSupported]);

    const startListening = useCallback(() => {
        const recognition = getRecognition();

        if (recognition && !listening) {
            setListening(true);
            setTranscript('');
            recognition.start();
        }
    }, [getRecognition, listening]);

    const stopListening = useCallback(() => {
        const recognition = getRecognition();

        if (recognition && listening) {
            recognition.stop();
            setListening(false);
        }
    }, [getRecognition, listening]);

    return { isSupported, listening, startListening, stopListening, transcript };
};

export default useSpeechRecognition;