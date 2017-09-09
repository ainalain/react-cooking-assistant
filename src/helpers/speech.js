/*
 * create SpeechSynthesisUtterance instance with needed options
 * you need to hold it in a variable like utterances: if you don't,
 * onend event would not work regularly
 */
export const createSpeechInstance = (message) => {
  window.utterances = [];
  const msg = new SpeechSynthesisUtterance(message);
  msg.lang = 'en-US';
  msg.rate = 1;
  msg.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  msg.voiceURI = 'native';
  window.utterances.push(msg);
  return msg;
};

/*
 * setup mechanism for natural speech recognition
 * context is a class (Assistant for example) which will use it
 */
export const createRecognition = (context, onResultMethod,
  onErrorMethod, onEndMethod) => {
  const recognition = new (window.SpeechRecognition
    || window.webkitSpeechRecognition
    || window.mozSpeechRecognition
    || window.msSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.onresult = onResultMethod.bind(context);
  recognition.onerror = onErrorMethod.bind(context);
  recognition.addEventListener('end', () => {
    onEndMethod.call(context);
  });
  return recognition;
};

/*
 * make text from speechRecognition resut event payload
 */
export const composeText = (event, recognition) => {
  let text = '';
  for (let i = event.resultIndex; i < event.results.length; +i) {
    text += event.results[i][0].transcript;
  }
  return text;
};

/*
 * compose initial user's fake phrase to launch google bot
 */
export const getInitialPhrase = ({ id, category, intro }) => {
  let text = '';
  if (intro) {
    text = 'Tell me about this site';
  } else {
    text = `Let's cook ${id} from ${category}.`;
  }
  return text;
};

/*
 * invoke speak method to pronounce bot answer
 */
export const speakMessage = ({ message, botEnabled, cb }) => {
  console.log('speak: ', message);
  console.log('cb: ', cb);
  const msg = createSpeechInstance(message);
  msg.addEventListener('end', () => {
    window.utterances.pop();
    if (botEnabled) {
      cb();
    }
  });
  window.speechSynthesis.speak(msg);
};

/*
 * cancel 'speaking' if need
 */
export const stopTalking = () => {
  window.speechSynthesis.cancel();
};
