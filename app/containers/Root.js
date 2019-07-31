import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import log from 'electron-log';
import { ConnectedRouter } from 'connected-react-router';
import theme from '../style/theme/theme';
import * as SettingsActions from '../actions/settings';
import CrashHandler from '../components/CrashHandler/CrashHandler';
import GlobalStyles from '../global-styles';
import RouteDef from '../routes';

type Props = {
  store: object,
  history: object
};

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

/*
USE IN CLASS COMPONENTS -> static whyDidYouRender = true
USE IN PURE COMPONENTS  -> BigListPureComponent.whyDidYouRender = true

*/

class Root extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    log.error(error, info);
    this.setState({ hasError: true });
  }

  render() {
    const { store, history } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <CrashHandler />;
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div>
            <ConnectedRouter history={history}>
              <GlobalStyles />
              <RouteDef history={history} />
            </ConnectedRouter>
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Root;
