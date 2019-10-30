import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import '../components/workout.css'
import { ListGroup, Button, Input } from "react-bootstrap";
import axios from 'axios';
import exerciseField from '../components/exerciseField'
import ExerciseField from '../components/exerciseField';



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
    this.onClose = this.onClose.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //called when new exercise is added
  onClose(){
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
    <exerciseField />
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.selected.value;
    const reps = event.target.reps.value;
    const weight = event.target.weight.value;
    var self = this;
    axios({
      method: 'post',
      url:"https://6755e99e-1a84-483c-9a22-1b38efb2fe1e.mock.pstmn.io/exercises",
      data: {
        title:"bench",
        reps:10,
        weight:200
      },
      config:{
        headers:{'Content-Type':'application/json'}
      }
    })
    .then(function(response){
      console.log(response);
      self.closeModal();
    })
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
 
          <h3 ref={subtitle => this.subtitle = subtitle}>New Entry</h3>
          <form onSubmit={this.handleSubmit}>
          <label className="addWrap"><select value={this.state.value} id="exerciseDropdown" name="selected" onChange={this.handleChange}>
              {items}
            </select>
          </label >
          <div id="adExButtonWrap" ><ExerciseField  onClose={this.onClose}/></div>
          <div class="exerciseInput">Reps:<input type="number" step="1" name="Reps" required={true} /></div>
          <div class="exerciseInput">Weight:<input type="number" step="1" name="Weight" required={true} /></div>
          <div  id="exerciseSave"><button className={classNames("fa fa-save fa-lg","formButton")} type="submit" name="submit"></button></div>
          <button  id="closeButton" className={classNames("fa fa-times fa-1x","formButton")}onClick={this.closeModal}></button>
          </form>

        </Modal>
      </div>
    );
  }
}
 
export default App;