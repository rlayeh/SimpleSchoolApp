import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';

import StudentsList from '../../components/StudentsList';
import AddEditStudentForm from '../../components/AddEditStudentForm';
import ActionAdd from 'material-ui/svg-icons/content/add';

import {
  makeSelectStudents,
  makeSelectFormVisible,
  makeSelectEditedStudent,
  makeSelectLoading,
} from './selectors';

import {
  fetchStudents,
  toggleForm as toggleFormAction,
  editStudent as editStudentAction,
  deleteStudent as deleteStudentction,
 } from './actions';

import cls from './styles.css';
import messages from './messages';

class SchoolMainContainer extends React.PureComponent {
  componentWillMount() {
    this.props.fetchStudents();
  }

  editStudent(student) {
    const editedStudent = this.props.editedStudent || {};

    const studentAfterChange = {
      ...editedStudent,
      ...student,
    };

    this.props.editStudent(studentAfterChange);
  }

  render() {
    const {
      students,
      toggleForm,
      deleteStudent,
      editStudent,
      editedStudent,
      formVisible,
    } = this.props;

    return (
      <div>
        <h1 className={cls.header}>
          <FormattedMessage {...messages.header} />
          <FloatingActionButton mini onClick={() => toggleForm(true)}>
            <ActionAdd />
          </FloatingActionButton>
        </h1>
        <StudentsList
          students={students}
          onEdit={(student) => toggleForm(true, student)}
          onDelete={deleteStudent}
        />
        <Dialog
          open={formVisible}
          modal
        >
          <AddEditStudentForm edit={!!editedStudent} onSubmit={(student) => this.editStudent(student)} initialValues={editedStudent} onCancel={toggleForm} />
        </Dialog>
      </div>
    );
  }
}

SchoolMainContainer.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  students: PropTypes.array,
  formVisible: PropTypes.bool,
  editedStudent: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  students: makeSelectStudents(),
  formVisible: makeSelectFormVisible(),
  editedStudent: makeSelectEditedStudent(),
  loading: makeSelectLoading(),
});

const mapDispatchToProps = {
  fetchStudents,
  toggleForm: toggleFormAction,
  editStudent: editStudentAction,
  deleteStudent: deleteStudentction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolMainContainer);
