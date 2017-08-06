import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { talkToAssistant } from '../../actions/assistantActions';
import { createSpeechInstance, createRecognition, composeText, getInitialPhrase } from '../../helpers/speech';
import Icon from './Icon';
import AssistantIcon from '../../assets/icons/assistant.svg';
import SadRobotIcon from '../../assets/icons/sad-robot.svg';
import styles from './Assistant.scss';

export class Assistant extends React.Component {
  constructor(props) {
    super(props);

    this.recognition = null;
    this.state = {
      enabled: false,
      recording: false,
      botAnswer: this.props.botAnswer,
      isCooking: this.props.isCooking,
      cookingStep: 0
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
    }
    this.setState({ botAnswer: nextProps.botAnswer}, this.sayBotAnswer );
  }

  componentWillUnmount() {
    this.setState({
      cookingStep: 0
    });
    this.recognition = null;
  }

  enableAssistant() {
    this.setState({ enabled: true });
    let category = this.props.category,
    id = this.props.id,
    intro = this.props.intro,
    context = intro ? '' : 'start_cooking';
    const text = getInitialPhrase({ id, category, intro });
    let params = { category, id, text, context};

    this.props.talkToAssistant(params);
  }

  sayBotAnswer() {
    let message;
    console.log('say bot answer: ', this.state.botAnswer);
    if (!this.state.botAnswer || !this.state.botAnswer.length) {
        message = 'Sorry, I don\'t understand you. Can you repeat please?';
    } else {
      message = this.state.botAnswer;
    }
    let msg = createSpeechInstance(message);
    msg.addEventListener('end', () => {
     window.utterances.pop();
     this.beginRecognition();
   });
     window.speechSynthesis.speak(msg);
  }

  setupRecognition() {
    this.recognition = createRecognition(this,
      this.processRecognition, this.finishRecognition);
  }

  processRecognition(event) {
    this.recognition.onend = null;

    let text = composeText(event);
    this.stopRecognition();
    if (this.state.isCooking && !this.props.stepBack) {
      let nextStep = this.state.cookingStep + 1;
      this.setState({ cookingStep: nextStep }, this.talkToBot.bind(this, text));
    } else if (this.props.stepBack) {
      let nextStep = this.state.cookingStep - 1;
      this.setState({ cookingStep: nextStep }, this.talkToBot.bind(this, text));
    } else {
      this.talkToBot(text);
    }
  }

  talkToBot(text) {
    let category = this.props.category,
    id = this.props.id,
    cookingStep = this.state.cookingStep;
    let params = {category, id, text, cookingStep};
    this.props.talkToAssistant(params);
  }

  finishRecognition() {
    const errorMessage = 'Sorry, I can\'t hear you. Can you repeat please?';
    this.setState({ botAnswer: errorMessage }, this.sayBotAnswer );
    this.setState({ isRecording: false });
    this.stopRecognition();
  }

  beginRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
     this.setState({ enabled: false });
    }
  }

  render() {
    let buttonAttr = this.state.enabled ? false : true;
    let turnoffStyle = this.state.enabled ? '' : styles.disabled;
    return (
      <div className={styles.assistant}>
        <button
          value='submit'
          onClick={this.enableAssistant}
          className={styles.button}>
          <div className={styles.robot}>
            <Icon glyph={AssistantIcon} className={styles.icon} />
          </div>
          <span className={styles.text}>Launch Tom</span>
        </button>
        { this.props.intro ? null :
          (<button className={`${styles.turnoff} ${turnoffStyle}`}
            disabled={buttonAttr} onClick={this.stopRecognition}>
            Disable Tom
            <div className={styles.sadRobot}>
            <Icon glyph={SadRobotIcon} className={styles.sadIcon} />
            </div>
          </button>)
        }
        </div>
    );
  }
}

Assistant.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  intro: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  let answer = state.botTalk.spokenResponse;
  let isCooking = state.botTalk.isCooking;

  return {
    botAnswer: answer,
    isCooking: isCooking,
    answerTime: state.botTalk.answerTime,
    stepBack: state.botTalk.stepBack
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    talkToAssistant: (text) => dispatch(talkToAssistant(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Assistant);
