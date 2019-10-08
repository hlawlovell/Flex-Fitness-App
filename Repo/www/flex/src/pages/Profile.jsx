import React, { useState } from "react";
import {Helmet} from "react-helmet";
import Navbar from 'react-bootstrap/Navbar';
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import '../components/common.css';
import Logo from '../components/Logo';
import GenericDisplay from '../images/genericDisplay.png';

const changeButtonStyle = {
  fontSize: 44,
  width: '50%',
  opacity: 0,
  display: 'none'
};

const Button = styled.button`
  font-size: 15px;
  width: 47.5%;
`;

const DisplayPhoto = styled.img`
  height: 40px;
`;

const labelStyle = {
  width: '100%',
  textAlign: 'center'
}

const FormElements = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30%;
`;

const bigInfoBox = {
  width: '50%',
  height: '25px',
  border: 'solid 1px black'
}

const LongInput = styled.input`
  width: 50%;
  height: 25px;
  border: solid 1px black;
  flex-direction: column;
`;

const smallInfoBox = {
  width: '100%',
  height: '25px',
  border: 'solid 1px black'
}

const ShortInput = styled.input`
  width: 100%;
  height: 25px;
  border: solid 1px black;
`;

const EmptySpace = styled.div`
  height: 25px;
  width: 10%;
`;

const Label = styled.label`
  font-size: 10px;
  margin-top: 10px;
`;

const Recede = styled('span')`
  opacity: 0.5;
`;

const SmallBoxWrapper =styled.div`
  width: 100%;
  display: flex;
`;

const SmallBoxContainer = styled.div`
  width: 20%;
`;

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [updating, setUpdating] = useState(false);
  

  return (
      <div>

        {/*Handles head elements*/}
        <Helmet>
              <title>Flex</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            {/*Page Content*/}
            <Logo />

            <label for="pic_upload" style={labelStyle}> 
              <DisplayPhoto src={GenericDisplay} />
              <span style={{ display: 'block'}}>change</span> 
            </label> 
            <input id="pic_upload" style={changeButtonStyle} type="file" accept="image/*" name="display_pic"/>

        {updating ? (
          <div>
              <FormElements>
                <Label for="name"> Name</Label>
                <LongInput 
                  id="name"
                  type="text"
                  placeholder="John"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />

                <Label for="email"> Email</Label>
                <LongInput 
                  id="email"
                  type="text"
                  placeholder="John@usyd.edu.au"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />

                <Label for="password"> 
                  Password <Recede> (min. 6 characters) </Recede>
                </Label>
                <LongInput 
                  id="password"
                  type="text"
                  placeholder="p4ssw0rd"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  />


                <SmallBoxWrapper>
                  <SmallBoxContainer>
                    <Label for="height"> Height(cm)</Label>
                    <ShortInput 
                      id="height" 
                      type="number"
                      placeholder="200"
                      value={height}
                      onChange={e => {
                        setHeight(e.target.value);
                      }}  
                    />
                  </SmallBoxContainer>

                  <EmptySpace/>

                  <SmallBoxContainer>
                    <Label for="weight"> Weight(kg)</Label>
                    <ShortInput 
                      id="weight" 
                      type="number"
                      placeholder="100"
                      value={weight}
                      onChange={e => {
                        setWeight(e.target.value);
                      }}  
                    />
                  </SmallBoxContainer>
                </SmallBoxWrapper>
                <Button
                  onClick={() => {
                    setUpdating(false);
                    // update(name, email, password, height, weight);
                  }}
                >Save
                </Button>
                
              </FormElements>
        </div>
        ) : (
          <div>
            
              
              <FormElements>
                
                <Label for="name"> Name</Label>
                <div id="name" style={bigInfoBox}></div>

                <Label for="email"> Email</Label>
                <div id="email" style={bigInfoBox}></div>

                <Label for="password" > Password</Label>
                <div id="password" style={bigInfoBox}></div>


                <SmallBoxWrapper>
                  <SmallBoxContainer>
                    <Label for="height" > Height(cm)</Label>
                    <div id="height" style={smallInfoBox}></div>
                  </SmallBoxContainer>

                  <EmptySpace/>

                  <SmallBoxContainer>
                    <Label for="weight" > Weight(kg)</Label>
                    <div id="weight" style={smallInfoBox}></div>
                  </SmallBoxContainer>
                </SmallBoxWrapper>
                <Button
                  onClick={() => {
                    setUpdating(true);
                  }}
                >Update
                </Button>
                
                <Button>Log Out</Button>
                
              </FormElements>
        </div>
        )}

        {/*Nav bar*/}
        <Container-fluid>
              <Navbar variant="light" bg="light" fixed="bottom">
                  <Nav.Link href="/home" >Home</Nav.Link>
                  <Nav.Link href="/workout">Workout</Nav.Link>
                  <Nav.Link href="" className="selected">Profile</Nav.Link>
              </Navbar>
            </Container-fluid>
      </div>
      
      
   

  );
};


export default Profile;
