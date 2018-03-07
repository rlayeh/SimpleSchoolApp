import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import cls from './styles.css';

const StudentsList = ({ students, onEdit, onDelete }) => (
  <Table>
    <TableBody displayRowCheckbox={false}>
      {students && students.map((student, index) =>
        (<TableRow key={index}>
          <TableRowColumn>
            {student.firstName}
          </TableRowColumn>
          <TableRowColumn>
            {student.lastName}
          </TableRowColumn>
          <TableRowColumn className={cls.actions}>
            <IconButton onClick={() => onEdit(student)}>
              <ActionEdit />
            </IconButton>
            <IconButton onClick={() => onDelete(student)}>
              <ActionDelete />
            </IconButton>
          </TableRowColumn>
        </TableRow>))}
    </TableBody>
  </Table>
);

StudentsList.propTypes = {
  students: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default StudentsList;
