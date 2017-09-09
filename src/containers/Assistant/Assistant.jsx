import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { talkToAssistant as talk } from '../../actions/assistantActions';
import { createSpeechInstance, createRecognition, composeText,
  getInitialPhrase, speakMessage, stopTalking } from '../../helpers/speech';
import Icon from '../../components/Icon';
import AssistantIcon from '../../assets/icons/assistant.svg';
import SadRobotIcon from '../../assets/icons/sad-robot.svg';
import styles from './Assistant.scss';

export class Assistant extends React.Component {
  constructor(props) {
    super(props);

    this.recognition = null;
    this.state = {
      enabled: false,
      botAnswer: this.props.botAnswer,
      isCooking: this.props.isCooking,
      cookingStep: 0,
      isRecording: false,
    };

    this.beginRecognition = this.beginRecognition.bind(this);
    this.stopConversation = this.stopConversation.bind(this);
    this.enableAssistant = this.enableAssistant.bind(this);
  }

  componentDidMount() {
    this.setupRecognition();
  }

  componentWillReceiveProps({ isCooking, botAnswer }) {
    if (isCooking !== this.props.isCooking) {
      this.setState({ isCooking });
    }
    this.setState({ botAnswer }, this.sayBotAnswer);
  }

  componentWillUnmount() {
    this.clearState();
    this.recognition = null;
    stopTalking();
  }

  /*
   * filter deliberate talk end: if we abort speech recognition,
   * there will be an error too
   */
  onRecognitionError(error) {
    if (error.error && error.error !== 'aborted') {
      const errorMessage = 'Sorry, I can\'t hear you. Can you repeat please?';
      this.setState({ botAnswer: errorMessage }, this.sayBotAnswer);
    }
  }

  /*
   * html5 speech recognition api works reaal bad:
   * it can stop recording after more than 10 seconds, so you need
   * to restart listening
   */
  onRecognitionEnd(event) {
    if (this.state.isRecording) {
      this.beginRecognition();
    }
  }

  setupRecognition() {
    this.recognition = createRecognition(this,
      this.processRecognition, this.onRecognitionError, this.onRecognitionEnd);
  }

  processRecognition(event) {
    this.recognition.onend = null;

    const text = composeText(event);
    this.setState({ isRecording: false });
    this.recognition.stop();

    if (this.state.isCooking && !this.props.stepBack) {
      const nextStep = this.state.cookingStep + 1;
      this.setState({ cookingStep: nextStep }, this.talkToBot.bind(this, text));
    } else if (this.props.stepBack) {
      const nextStep = this.state.cookingStep - 1;
      this.setState({ cookingStep: nextStep }, this.talkToBot.bind(this, text));
    } else { console.log('just simple text');
      this.talkToBot(text);
    }
  }

  sayBotAnswer() {
    let message;
    console.log('say bot answer: ', this.state.botAnswer);
    console.log('this recognition: ', this.recognition);
    console.log('enabled: ', this.state.enabled);
    if (this.recognition) {
      this.setState({ isRecording: false });
      this.recognition.stop();
    }
    if (!this.state.botAnswer || !this.state.botAnswer.length) {
      message = 'Sorry, I don\'t understand you. Can you repeat please?';
    } else {
      message = this.state.botAnswer;
    }
    speakMessage({
      message,
      botEnabled: this.state.enabled,
      cb: this.beginRecognition,
    });
  }

  enableAssistant() {
    this.setState({ enabled: true });
    const {
      id,
      category,
      intro,
      talkToAssistant,
    } = this.props;
    const context = intro ? '' : 'start_cooking';
    const text = getInitialPhrase({ id, category, intro });
    const params = { category, id, text, context };

    if (!this.recognition) {
      this.setupRecognition();
    }
    talkToAssistant(params);
  }

  clearState() {
    this.setState({ enabled: false });
    this.setState({ cookingStep: 0 });
    this.setState({ isCooking: false });
  }

  talkToBot(text) {
    const {
      id,
      category,
      context,
      talkToAssistant,
    } = this.props;
    console.log('props context: ', context);
    const cookingStep = this.state.cookingStep;
    const params = { category, id, text, cookingStep, context };
    talkToAssistant(params);
  }

  beginRecognition() {
    if (this.recognition) {
      this.setState({ isRecording: true });
      console.log('start recognition');
      this.recognition.start();
    }
  }

  /*
   * stop conversation with api ai agent (exit)
   */
  stopConversation() {
    stopTalking();
    if (this.recognition) {
      this.recognition.abort();
      this.clearState();
      const text = 'Stop'; // keyword to end conversation eith apia ai agent
      this.talkToBot(text);
      this.recognition = null;
    }
  }

  render() {
    const turnoffAttr = !this.state.enabled;
    const turnoffStyle = this.state.enabled ? '' : styles.disabled;
    const launchAttr = !turnoffAttr;
    const launchStyle = this.state.enabled ? styles.disabled : '';
    return (
      <div className={styles.assistant}>
        <button
          value="submit" disabled={launchAttr}
          onClick={this.enableAssistant}
          className={`${styles.launch} ${launchStyle}`}>
          <div className={styles.robot}>
            <Icon glyph={AssistantIcon} className={styles.icon} />
          </div>
          <span className={styles.text}>Launch Tom</span>
        </button>
        { this.props.intro ? null :
          (<button
            className={`${styles.turnoff} ${turnoffStyle}`}
            disabled={turnoffAttr} onClick={this.stopConversation}>
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

Assistant.defaultProps = {
  intro: false,
  isCooking: false,
  botAnswer: null,
  stepBack: false,
  context: null,
  talkToAssistant: undefined,
};

Assistant.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  intro: PropTypes.bool,
  isCooking: PropTypes.bool,
  botAnswer: PropTypes.string,
  stepBack: PropTypes.bool,
  context: PropTypes.string,
  talkToAssistant: PropTypes.func,
};

const mapStateToProps = ({ botTalk }, ownProps) => ({
  isCooking: botTalk.isCooking,
  botAnswer: botTalk.answer,
  answerTime: botTalk.answerTime,
  stepBack: botTalk.stepBack,
  context: botTalk.context,
});

const mapDispatchToProps = (dispatch) => ({
  talkToAssistant: (text) => dispatch(talk(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assistant);
