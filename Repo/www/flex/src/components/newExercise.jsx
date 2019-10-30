import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import '../components/workout.css'
import { ListGroup } from "react-bootstrap";
import axios from 'axios';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    fontSize              : '1.2em',
    borderRadius          : '10px',
    width                 : '50%',
    maxWidth              : '700px',
    minWidth              : '360px'
  },
  h3 : {
        fontSize              : '1em !important',
  }
};
 
Modal.setAppElement(document.getElementById('root'));
 
class App extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false,
      exercises: []
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    let currentComponent = this;
    //request data from backend
    axios.get("https://45485187-422b-4292-9c00-03bb45619368.mock.pstmn.io/exercises")
    .then(function (response) {
        console.log(response.data);
        currentComponent.setState({exercises:response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  newType() {
    this.state.exersises.push()
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.value);
    event.preventDefault();
  }



 
  render() {
    const items = this.state.exercises.map(function(item){
      return(<option value={item.name}>{item.name}</option>);
    });

    return (
      <div id="form">
        <a id="adButton" className="fa fa-plus fa-3x" onClick={this.openModal}></a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="New Exercise"
        >
 
          <h3 ref={subtitle => this.subtitle = subtitle}>New Exercise</h3>
          <form>
          <label className="addWrap"><select value={this.state.value} id="exerciseDropdown" onChange={this.handleChange}>
              {items}
            </select>
          </label >
          <button className={classNames("fa fa-edit fa-lg","formButton")}onClick={this.closeModal}></button>
          <button  id="closeButton" className={classNames("fa fa-times fa-1x","formButton")}onClick={this.closeModal}></button>
          </form>

        </Modal>
      </div>
    );
  }
}
 
export default App;