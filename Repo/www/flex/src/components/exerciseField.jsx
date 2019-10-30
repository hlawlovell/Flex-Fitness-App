import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import '../components/workout.css'
import { ListGroup, Button, Input } from "react-bootstrap";
import axios from 'axios';
import exerciseField from '../components/exerciseField'



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
 
class ExerciseField extends React.Component {
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

  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  newType() {
    <exerciseField />
  }

  handleChange(event) {
    this.setState({exer: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.exercises);
    event.preventDefault();
  }



 
  render() {
    const items = this.state.exercises.map(function(item){
      return(<option value={item.name}>{item.name}</option>);
    });

    return (
      <div id="form">
        <a id="adButton" className="fa fa-edit fa-lg" onClick={this.openModal}></a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}f
          contentLabel="New Exercise"
        >
 
          <h3 ref={subtitle => this.subtitle = subtitle}>New Exercise</h3>
          <form onSubmit={this.handleSubmit}>
            <input onClick={event => this.handleSubmit(event.target.value)} />
            <button className={classNames("fa fa-save fa-lg","formButton")}onClick={this.handleSubmit}></button>
            <button  id="closeButton" className={classNames("fa fa-times fa-1x","formButton")}onClick={this.closeModal}></button>
          </form>

        </Modal>
      </div>
    );
  }
}
 
export default ExerciseField;