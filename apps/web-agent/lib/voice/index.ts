// Reusable voice-input capability. Import from here.
//   import { VoiceInput, useSpeechToText } from "@/lib/voice";
//
// ⚠️ PRIVACY CAVEAT (see SPEC.md §5): this uses the browser Web Speech API
// (webkitSpeechRecognition), which in Chrome STREAMS AUDIO TO GOOGLE'S SERVERS — it is
// NOT on-device. It ships in PR2 for a working mic; PR4 replaces it with on-device
// Whisper (transformers.js) to honor the "nothing leaves the device" promise. Until
// then, the cloud-STT path must carry the same adults-only disclosure as the cloud LLM.
export { VoiceInput } from "./VoiceInput";
export { useSpeechToText, type UseSpeechToText } from "./useSpeechToText";
