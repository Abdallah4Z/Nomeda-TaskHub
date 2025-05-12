export class VoiceService {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isListening: boolean = false;

  constructor() {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
    this.synthesis = window.speechSynthesis;
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
  }

  startListening(onResult: (text: string) => void, onInterim?: (text: string) => void) {
    if (!this.recognition || this.isListening) return;

    this.isListening = true;
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript && onInterim) {
        onInterim(interimTranscript);
      }
      if (finalTranscript) {
        onResult(finalTranscript);
      }
    };

    this.recognition.start();
  }

  stopListening() {
    if (!this.recognition || !this.isListening) return;
    
    this.isListening = false;
    this.recognition.stop();
  }

  speak(text: string, onEnd?: () => void) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synthesis.speak(utterance);
  }

  cancelSpeech() {
    this.synthesis.cancel();
  }

  isVoiceSupported(): boolean {
    return !!this.recognition;
  }
}
