import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import '../components/workout.css'
import { Container, ListGroup } from "react-bootstrap";


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
      exercises: [{
        "bench":[{
          5:100,
          2:100,
          2:100
        }]},
        {"squat":[{
          5:100,
          2:100,
          2:100
        }]},
        {"deadlift":[{
          5:100,
          2:100,
          2:100
        }]
      }]
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
      return(<option value={item}>{item}</option>);
    });
    const entries = this.state.exercises.map(function(item){
      return(<option value={item}>{item}</option>);
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
          <button className={classNames("fa fa-edit fa-2x","formButton")}onClick={this.closeModal}></button>
          <div id="exerciseEntry" >
            <ListGroup>
              {entries}
              <ListGroup.Item></ListGroup.Item>  
            </ListGroup>
          </div>
          <button  id="closeButton" className={classNames("fa fa-times fa-1x","formButton")}onClick={this.closeModal}></button>
          </form>

        </Modal>
      </div>
    );
  }
}
 
export default App;