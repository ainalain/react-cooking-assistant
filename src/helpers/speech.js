/*
 * create SpeechSynthesisUtterance instance with needed options
 * you need to hold it in a variable like utterances: if you don't,
 * onend event would not work regularly
 */
export const createSpeechInstance = (message) => {
  window.utterances = [];
  let msg = new SpeechSynthesisUtterance(message);
  msg.lang = 'en-US';
  msg.rate = 1;
  msg.pitch = 1;
  let voices = window.speechSynthesis.getVoices();
  msg.voiceURI = 'native';
  window.utterances.push( msg );
  return msg;
};

/*
 * setup mechanism for natural speech recognition
 * context is a class (Assistant for example) which will use it
 */
export const createRecognition = (context, onResultMethod, onEndMethod) => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.onresult = onResultMethod.bind(context);
  recognition.onend = onEndMethod.bind(context);
  return recognition;
};

/*
 * make text from speechRecognition resut event payload
 */
export const composeText = (event, recognition) => {
  let text = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    text += event.results[i][0].transcript;
  }
  return text;
};
