import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

class Notification extends React.PureComponent {

  render() {
    const { notifications } = this.props;
    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '320px 1px 1px 1px',
          fontSize: '1.2em',
          fontFamily: 'Roboto, sans-serif',
          textAlign: 'center',
        },
      },
    };

    return (
      <Notifications
        notifications={notifications}
        style={style}
        noAnimation
      />
    );
  }
}

Notification.contextTypes = {
  store: PropTypes.object,
};

Notification.propTypes = {
  notifications: PropTypes.array,
};

export default connect(
    (state) => ({ notifications: state.notifications })
)(Notification);
