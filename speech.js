var utterance = new SpeechSynthesisUtterance(); 
window.onload=()=>{
utterance.text = "Hello World"; 
utterance.volume=1;
utterance.voice = speechSynthesis.getVoices()[0]; 
speechSynthesis.speak(utterance);
}