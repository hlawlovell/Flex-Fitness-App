import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import '../components/workout.css'
import axios from 'axios';
import ExerciseField from '../components/exerciseField';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = 'Token '+Cookies.get('Authorization') 
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
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false,
      exercises: [],
    };
    this.url = this.props.url;
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
    axios({
      method: 'get',
      url:"http://localhost:8000/exercises/",
      withCredentials: true
    })  
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
    axios({
      method: 'get',
      url:"http://localhost:8000/exercises/",
      withCredentials: true
    })  
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
    const reps = event.target.Reps.value;
    const weight = event.target.Weight.value;
    var self = this;
    var appends = this.url.split("-");
    var fulldate = appends[1].substring(1);
    fulldate = fulldate.split("/");
;    
    console.log(this.url);
    axios({
      method: 'post',
      url:"http://localhost:8000/"+fulldate[2]+"/"+fulldate[1]+"/"+fulldate[0]+"/",
      withCredentials: true,
      data: {
        title:name,
        weight:weight,
        reps:reps
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

  componentWillReceiveProps(props) {
    if (props.url !== this.url) {
      this.url = props.url;
    }
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
          <div class="exerciseInput">Weight:<input type="float" name="Weight" required={true} /></div>
          <div  id="exerciseSave"><button className={classNames("fa fa-save fa-lg","formButton")} type="submit" name="submit"></button></div>
          <button  id="closeButton" className={classNames("fa fa-times fa-1x","formButton")}onClick={this.closeModal}></button>
          </form>

        </Modal>
      </div>
    );
  }
}
 
export default App;