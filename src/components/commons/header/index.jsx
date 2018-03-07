import React from 'react';
import { FormattedMessage } from 'react-intl';

import cls from './styles.css';
import defineMessages from './messages';

const Header = () => (
  <div className={cls.header}>
    <FormattedMessage {...defineMessages.header} />
  </div>
);


export default Header;
