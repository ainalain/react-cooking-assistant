import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { talkToAssistant } from '../../actions/assistantActions';
import Icon from './Icon';
import AssistantIcon from '../../assets/icons/assistant.svg';
import SadRobotIcon from '../../assets/icons/sad-robot.svg';
import styles from './Assistant.scss';

class Assistant extends React.Component {
  constructor(props) {
    super(props);

    this.recognition = null;
    this.state = {
      enabled: false,
      recording: false,
      botAnswer: this.props.botAnswer,
      isCooking: this.props.isCooking,
      cookingStep: null
    };

    this.beginRecognition = this.beginRecognition.bind(this);
    this.stopRecognition = this.stopRecognition.bind(this);
    this.enableAssistant = this.enableAssistant.bind(this);
  }

  componentDidMount() {
    this.setupRecognition();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCooking != this.props.isCooking) {
      this.setState({ isCooking: nextProps.isCooking });
      if (nextProps.isCooking) {
        this.setState({ cookingStep: 1 });
      } else {
        this.setState({ cookingStep: null });
      }
    }
    if (nextProps.botAnswer != this.state.botAnswer) {
      this.setState({ botAnswer: nextProps.botAnswer}, this.sayBotAnswer );
    }
  }

  enableAssistant() {
    let category = this.props.category,
    id = this.props.id;
    const launchText = 'Let\' cook something.';
    let params = { category, id, text: launchText};

    this.props.talkToAssistant(params);
  }

  sayBotAnswer() {
    let message;
    if (!this.state.botAnswer || !this.state.botAnswer.length) {
        message = 'Sorry, I don\'t understand you.';
    } else {
      message = this.state.botAnswer;
    }

     let msg = new SpeechSynthesisUtterance();
     msg.onend = () => {
       console.log('speech ended');
       this.beginRecognition();
     };
     let voices = window.speechSynthesis.getVoices();
     msg.voiceURI = "native";
     msg.text = message;
     msg.lang = "en-US";
     window.speechSynthesis.speak(msg);
  }

  setupRecognition() {
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    this.recognition.lang = "en-US";
    this.recognition.continuous = true;
		this.recognition.onresult = this.processRecognition.bind(this);
    this.recognition.onend = this.finishRecognition.bind(this);
  }

  processRecognition(event) {
    this.recognition.onend = null;

    let text = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
    }
    this.stopRecognition();
    if (this.state.isCooking && this.state.cookingStep) {
      console.log('augment cookingStep');
      let nextStep = this.state.cookingStep + 1;
      this.setState({ cookingStep: nextStep });
    }
    let category = this.props.category,
    id = this.props.id,
    cookingStep = this.state.cookingStep;
    console.log('cooking step in talk to bot: ', cookingStep);
    let params = {category, id, text, cookingStep};
    this.props.talkToAssistant(params);
  }

  finishRecognition() {
    this.respond('Sorry, I cannot hear you.');
    this.setState({ isRecording: false });
    this.stopRecognition();
  }

  beginRecognition() {
    this.setState({ enabled: true });
    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
     this.setState({ enabled: false });
    }
  }

  render() {
    return (
      <div className={styles.assistant}>
        <button
          value='submit'
          onClick={this.enableAssistant}
          className={styles.button}>
          <div className={styles.robot}>
            <Icon glyph={AssistantIcon} className={styles.icon} />
          </div>
          <span className={styles.text}>Assistant</span>
        </button>
        {this.state.enabled ?
          <button className={styles.turnoff} onClick={this.stopRecognition}>
          Stop assistant
          <div className={styles.sadRobot}>
            <Icon glyph={SadRobotIcon} className={styles.sadIcon} />
          </div>
          </button> : null}
      </div>
    );
  }
}

Assistant.propTypes = {
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let answer = state.botTalk.spokenResponse;
  let isCooking = state.botTalk.isCooking;

  return {
    botAnswer: answer,
    isCooking: isCooking
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    talkToAssistant: (text) => dispatch(talkToAssistant(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Assistant);
