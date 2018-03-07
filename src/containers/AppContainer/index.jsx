import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { addLocaleData, IntlProvider } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import en from 'react-intl/locale-data/en';
import { connect } from 'react-redux';
import Header from '../../components/commons/header';

import cls from './styles.css';

import ErrorMessage from '../MessageContainer';
import enLocale from '../../lang/en.json';
import { makeSelectCurrLocale } from './selectors';
import Notification from '../NotificationContainer/notification';

addLocaleData([...en]);
const messages = {
  en: enLocale,
};

class App extends React.PureComponent {
  render() {
    return (
      <IntlProvider
        locale={this.props.currLocale}
        key={this.props.currLocale}
        messages={messages[this.props.currLocale]}
      >
        <div className={cls.main}>
          <Header />
          <ErrorMessage />
          <Notification />
          <div className={cls.body}>
            {this.props.children}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  currLocale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currLocale: makeSelectCurrLocale(),
});

const mapDispatchToProps = {}
;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
