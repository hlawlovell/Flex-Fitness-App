import React from 'react';
import Modal from 'react-modal';
import '../components/workout.css'


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
      exercises: ["bench","squat","deadlift"]
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
          <label>Exercise:
          <select value={this.state.value} id="exerciseDropdown" onChange={this.handleChange}>
            {items}
          </select>
        </label >
            <button  onClick={this.closeModal}>add</button>
            <button  onClick={this.closeModal}>close</button>

          </form>

        </Modal>
      </div>
    );
  }
}
 
export default App;