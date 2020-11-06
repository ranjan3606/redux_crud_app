import React, { Component } from "react";
import "./App.css";
import PropTypes from 'prop-types';
import { getData, addData, editData, deleteData } from './Redux/action';
import { connect } from 'react-redux';
import {Button, Form, Label, Input, Table, Container} from 'reactstrap'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      fullName: "",
      email: "",
      phone: ""
    };
  }

  //propType is check the table data is special value
  static propTypes = {
    tabledata: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    addData: PropTypes.func.isRequired,
    editData: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getData();
  }

  submitData = () => {
    if (this.state.fullName && this.state.email && this.state.phone && !this.state.id) {
      const newData = {
        id: 0,
        fullName: this.state.fullName,
        email: this.state.email,
        phone:this.state.phone
      };

      this.props.addData(newData); //here is add data function to add new data 
    } else if (this.state.fullName && this.state.email && this.state.phone && this.state.id) {
      const updatedDetails = {
        id: this.state.id,
        fullName: this.state.fullName,
        email: this.state.email,
        phone:this.state.phone
      };

      this.props.editData(updatedDetails);
    } else {
      alert('Hey Please Fill Form');
    }

    this.clearData(); //when submit data auto clear data
  }

  // this is edit the data to hit on id
  editDetails = (data) => {
    this.setState({
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      phone:data.phone
    })
  }

  //delete the data with id
  deleteData = (id) => {
    this.clearData();
    if (window.confirm("Are you sure?")) {
      this.props.deleteData(id);
    }
  }

  handleNameChange = (e) => {
    this.setState({
      fullName: e.target.value
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    });
  }

  //create cleardata arrow function to fill form data when submit then auto clear 
  clearData = () => {
    this.setState({
      id: 0,
      fullName: "",
      email: "",
      phone: ""
    });
  }

  render() {
    return (
      <div className="container">
        <Container>
            <p>Contact:</p>
            <Form className="form-inline">
              <div className="form-group mr-2">
                <Label className="mr-sm-2">Full Name : </Label>
                <Input className="form-control" onChange={this.handleNameChange} value={this.state.fullName} type="text" placeholder="Full Name" />
              </div>
              <div className="form-group mr-2">
                <Label className="mr-sm-2">Email :</Label>
                <Input className="form-control" onChange={this.handleEmailChange} value={this.state.email} type="email" placeholder="Enter your Email" />
              </div>
              <div className="form-group mr-2">
                <Label className="mr-sm-2">Phone : </Label>
                <Input className="form-control" onChange={this.handlePhoneChange} value={this.state.phone} type="number" placeholder="Enter contact Number" />
              </div>
              <br />
                {this.state.id ? <Button className="btn-danger btn update" onClick={this.submitData}>UPDATE</Button> : <Button className="btn-success btn submit" onClick={this.submitData}>Submit</Button>} &nbsp;&nbsp;<button className="invisible" onClick={this.clearData}>CLEAR</button>
            </Form>
        </Container>
        
          <Container className="wrapper">
            <p>Contact us List</p>
            <div className="table-responsive">
            <Table bordered>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Full Name</th>
                  <th>Email </th>
                  <th>Phone</th>
                  <th>Edit & Delete </th>
                </tr>
              </thead>
              <tbody>
                {this.props.tabledata && this.props.tabledata.map((data, index) => {
                  return <tr key={(index + 1)}>
                    <td>{(index + 1)}</td>
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td><Button className="btn btn-success" onClick={() => this.editDetails(data)}>Edit</Button> <Button className="btn btn-danger" onClick={() => this.deleteData(data.id)}>Delete</Button> </td>
                  </tr>
                })}
              </tbody>
            </Table>
            </div>
          </Container>
      </div>
    );
  }
}

// create mapStateToProps to call table data
const mapStateToProps = state => ({
  tabledata: state.tabledata
});

export default connect(mapStateToProps, { getData, addData, editData, deleteData })(App);