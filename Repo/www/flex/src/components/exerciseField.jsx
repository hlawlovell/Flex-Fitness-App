import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import '../components/workout.css'
import { ListGroup, Button, Input } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = 'Token '+Cookies.get('Authorization') 
axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken') 

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
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false,
      newExercise:""
    };
    this.onClose = this.props.onClose;
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
    this.onClose();
    this.setState({modalIsOpen: false});
  }
  newType() {
    <exerciseField />
  }

  handleChange(event) {
    this.setState({exer: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = event.target.text.value;
    var self = this;
    axios({
      method: 'post',
      url:"http://localhost:8000/exercises/",
      withCredentials: true,
      data: {
        name:event.target.text.value
      },
      config:{
        headers:{'Content-Type':'application/json'}
      }
    })
    .then(function(response){
      console.log(response);
      if(response.status=="success"){
        self.closeModal();
      }
    })

  }



 
  render() {
 
    return (
      <div id="form">
        <a id="adExButton" className="fa fa-edit fa-lg" onClick={this.openModal}></a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="New Exercise"
        >
 
          <h3 ref={subtitle => this.subtitle = subtitle}>New Exercise</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="text" required={true} />
            <button id="newExNameSave" className={classNames("fa fa-save fa-lg","formButton")} type="submit" name="submit" onClick={this.closeModal}></button>
            <button  id="closeButton" className={classNames("fa fa-times fa-1x","formButton")}onClick={this.closeModal}></button>
          </form>

        </Modal>
      </div>
    );
  }
}
 
export default ExerciseField;