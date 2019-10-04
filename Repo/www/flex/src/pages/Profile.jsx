import React, { useState } from "react";
import {Helmet} from "react-helmet";
import Navbar from 'react-bootstrap/Navbar';
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import '../components/common.css'
import Logo from '../components/Logo'
import GenericDisplay from '../images/genericDisplay.png'

const changeButtonStyle = {
  fontSize: 44,
  width: '50%',
  opacity: 0
};

const labelStyle = {
  width: '100%',
  textAlign: 'center'
}

const profileInfoStyle = {
  marginLeft: '30%'
}
const boxTitle = {
  fontSize: '10px',
  marginTop: '10px'
}

const bigInfoBox = {
  width: '50%',
  height: '25px',
  border: 'solid 1px black'
}

const smallInfoBox = {
  width: '100%',
  height: '25px',
  border: 'solid 1px black'
}

const smallBoxes = {
  width: '100%',
  display: 'flex'
}

const emptySpace = {
  height: '25px',
  width: '10%'
}

const smallBoxContainer = {
  width: '20%'
}

const displayPhoto = {
  
}

const Profile = () => (
  //const [email, setEmail] = useState("");
  //const [editing, setEditing] = useState(false);

  //return (
    <div>
      {/*Handles head elements*/}
      <Helmet>
        <title>Flex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/*Page Content*/}
      <Logo />

      <label for="pic_upload" style={labelStyle}> change</label> 
        <input id="pic_upload" style={changeButtonStyle} type="file" accept="image/*" name="display_pic"/>
        
        
        <div class="profile-info" style={profileInfoStyle}>
          
          <label for="name" style={boxTitle}> Name</label>
          <div id="name" style={bigInfoBox}></div>

          <label for="email" style={boxTitle}> Email</label>
          <div id="email" style={bigInfoBox}></div>

          <label for="password" style={boxTitle}> Password</label>
          <div id="password" style={bigInfoBox}></div>


            <div style={smallBoxes}>
              <div style={smallBoxContainer}>
                <label for="height" style={boxTitle}> Height(cm)</label>
                <div id="height" style={smallInfoBox}></div>
              </div>

              <div style={emptySpace}></div>

              
              <div style={smallBoxContainer}>
                <label for="weight" style={boxTitle}> Weight(kg)</label>
                <div id="weight" style={smallInfoBox}></div>
              </div>
            
            </div>
          
        </div>

      

      {/*Nav bar*/}
      <Container-fluid>
        <Navbar variant="light" bg="light" fixed="bottom">
            <Nav.Link href="/home" >Home</Nav.Link>
            <Nav.Link href="/workout">Workout</Nav.Link>
            <Nav.Link href="" className="selected">Profile</Nav.Link>
        </Navbar>
      </Container-fluid>
    </div>
  //)
  
)



export default Profile;
