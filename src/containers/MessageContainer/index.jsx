import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectMessages } from './selectors';
import { clearMessagesArray } from './actions';
import cls from './styles.css';


class Message extends React.PureComponent {

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;

    return (
      <div className={cls.snackBar}>
        {this.props.messages && this.props.messages.map((message, index) => {
          const messageTxt = message.translate ? formatMessage({ id: message.messageKey }) : message.messageKey;
          return (<Snackbar
            className={message.messageType === 'error' ? cls.snackBarError : cls.snackBarSuccess}
            key={index}
            open
            message={messageTxt}
            autoHideDuration={4000}
            onRequestClose={this.props.clearMessagesArray}
          />);
        }
        )}
      </div>
    );
  }
}

Message.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    messageKey: PropTypes.string,
    messageType: PropTypes.string,
    translate: PropTypes.boolean,
  })),
  intl: PropTypes.object,
  clearMessagesArray: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
});

const mapDispatchToProps = {
  clearMessagesArray,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Message));
