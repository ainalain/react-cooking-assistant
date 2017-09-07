import Reactotron, { trackGlobalErrors } from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

// if (__ENV__ === 'development') {
  Reactotron
    .configure()
    .use(reactotronRedux())
    .use(trackGlobalErrors())
    .connect();

  Reactotron.clear();

  console.tron = Reactotron;
//}
