import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class StudentApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      nextId: 1,
      name: '',
      grade: '',
      editingId: null,
      editingName: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleGradeChange = (event) => {
    this.setState({ grade: event.target.value });
  }

  handleEditingNameChange = (event) => {
    this.setState({ editingName: event.target.value });
  }

  handleAddStudent = () => {
    const newStudent = {
      id: this.state.nextId,
      name: this.state.name,
      grade: this.state.grade
    };
    this.setState(prevState => ({
      students: [...prevState.students, newStudent],
      nextId: prevState.nextId + 1,
      name: '',
      grade: ''
    }));
  }

  handleRemoveStudent = (studentId) => {
    this.setState(prevState => ({
      students: prevState.students.filter(student => student.id !== studentId)
    }));
  }

  handleEditStudent = (studentId) => {
    const student = this.state.students.find(s => s.id === studentId);
    this.setState({ editingId: studentId, editingName: student.name });
  }

  handleSaveStudent = () => {
    this.setState(prevState => ({
      students: prevState.students.map(student => {
        if (student.id === prevState.editingId) {
          return { ...student, name: prevState.editingName };
        }
        return student;
      }),
      editingId: null,
      editingName: ''
    }));
  }

  render() {
    const { editingId, editingName } = this.state;
    console.log(this.state.students)

    return (
      <div>
        <h1>Students</h1>
        <StudentForm
          name={this.state.name}
          grade={this.state.grade}
          onNameChange={this.handleNameChange}
          onGradeChange={this.handleGradeChange}
          onAddStudent={this.handleAddStudent}
        />
        {editingId ? (
          <div>
            <input
              type="text"
              value={editingName}
              onChange={this.handleEditingNameChange}
            />
            <button onClick={this.handleSaveStudent}>Save</button>
          </div>
        ) : null}
        <StudentList
          students={this.state.students}
          onRemoveStudent={this.handleRemoveStudent}
          onEditStudent={this.handleEditStudent}
        />
      </div>
    );
  }
}

const StudentForm = ({ name, grade, onNameChange, onGradeChange, onAddStudent }) => (
  <div>
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={onNameChange}
    />
    <input
      type="text"
      placeholder="Grade"
      value={grade}
      onChange={onGradeChange}
    />
    <button onClick={onAddStudent}>Add Student</button>
  </div>
);

const StudentList = ({ students, onRemoveStudent, onEditStudent }) => (
  <ul>
    {students.map(student => (
      <li key={student.id}>
        ID: {student.id} Name:{student.name} <br />Grade: {student.grade}
        <button onClick={() => onRemoveStudent(student.id)}>Remove</button>
        <button onClick={() => onEditStudent(student.id)}>Edit</button>
      </li>
    ))}
  </ul>
);
