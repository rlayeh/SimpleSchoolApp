import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import cls from './styles.css';
import defineMessages from './messages';

const AddEditStudentForm = ({ handleSubmit, edit, onCancel }) => (
  <form onSubmit={handleSubmit}>
    <div className={cls.fields}>
      <Field
        name="firstName"
        component={TextField}
        type="text"
        hintText={<FormattedMessage {...defineMessages.name} />}
      />
      <Field
        name="lastName"
        component={TextField}
        type="text"
        hintText={<FormattedMessage {...defineMessages.surname} />}
      />
    </div>
    <div className={cls.buttons}>
      <RaisedButton
        className={cls.button}
        label={edit ? <FormattedMessage {...defineMessages.buttonSave} /> :
        <FormattedMessage {...defineMessages.buttonAdd} />}
        primary
        type="submit"
      />
      <RaisedButton
        className={cls.button}
        label={
          <FormattedMessage {...defineMessages.buttonClose} />}
        onClick={() => onCancel()}
      />
    </div>
  </form>);


AddEditStudentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
};


export default reduxForm({
  form: 'addEditStudentForm',
  enableReinitialize: true,
})(AddEditStudentForm);
