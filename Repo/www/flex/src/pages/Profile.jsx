import React, { useState, useEffect } from "react";
import {Helmet} from "react-helmet";
import Nav from '../components/nav'
import styled from "styled-components";
import '../components/common.css';
import Logo from '../components/Logo';
import GenericDisplay from '../images/genericDisplay.png';
import axios from 'axios';

const ChangeButton = styled.button`
  fontSize: 44;
  width: 50%;
  opacity: 0;
  display: none;
`;

const Button = styled.button`
  font-size: 15px;
  font-weight: 400;
  color: white;
  background: none;
  border-color: #1A2227;
  text-decoration: none;
  width: 25%; 
  text-align: center;
  border-radius: 40px;
  margin-left: 11%;

  & span {
    color: #0000ff;
    cursor: pointer;
  }
  :hover {
    background-color: white;
    border-color: white;
    color: #1A2227;
  }
`;

const DisplayPhoto = styled.img`
  height: 60px;
`;

const ChangeButtonLabel = styled.label`
  width: 100%;
  text-Align: center;
  margin-left: 0.5%;
`;

const FormElements = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 35%;
`;

const LongInfoBox = styled.div`
  width: 50%;
  height: 25px;
  border: solid 1px black;
  background: white;
`;

const LongInput = styled.input`
  width: 50%;
  height: 25px;
  border: solid 1px black;
  background:'white';
  flex-direction: column;
`;

const ShortInfoBox = styled.div`
  width: 100%;
  height: 25px;
  border: solid 1px black;
  background: white;
`;

const ShortInput = styled.input`
  width: 100%;
  height: 25px;
  border: solid 1px black;
  background: white;
`;

const EmptySpace = styled.div`
  height: 25px;
  width: 10%;
`;

const Label = styled.label`
  font-size: 15px;
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

const Update = (name, email, password, height, weight) => {
  axios
    .put('http://localhost:3000/profiles/', {
      name,
      email,
      password,
      height,
      weight
    })
    .then();
}

const Logout = () => {
    localStorage.clear();
    window.location.href = '/';
}

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [updating, setUpdating] = useState(false);
  

  useEffect(() => {
    axios.get('http://localhost:3000/profiles/').then(response => {
      setName(response.name);
      setEmail(response.email);
      setPassword(response.password);
      setHeight(response.height);
      setWeight(response.weight);
    });
  }, []);

  return (
      <div>

        {/*Handles head elements*/}
        <Helmet>
              <title>Flex</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            {/*Page Content*/}
            <Logo />

            <ChangeButtonLabel for="pic_upload"> 
              <DisplayPhoto src={GenericDisplay} />
              <span style={{ color:'rgb(192, 192, 192)', display: 'block'}}>change</span> 
            </ChangeButtonLabel> 
            <ChangeButton id="pic_upload" type="file" accept="image/*" name="display_pic"/>

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
                    Update(name, email, password, height, weight);
                  }}
                >Save
                </Button>
                
              </FormElements>
        </div>
        ) : (
          <div>
            
              
              <FormElements>
                
                <Label for="name"> Name</Label>
                <LongInfoBox 
                  id="name"
                  value={name}
                />

                <Label for="email"> Email</Label>
                <LongInfoBox 
                  id="email"
                  value={email}
                />

                <Label for="password" > Password</Label>
                <LongInfoBox 
                  id="password"
                  value={password}
                />


                <SmallBoxWrapper>
                  <SmallBoxContainer>
                    <Label for="height" > Height(cm)</Label>
                    <ShortInfoBox 
                      id="height"
                      value={height}
                    />
                  </SmallBoxContainer>

                  <EmptySpace/>

                  <SmallBoxContainer>
                    <Label for="weight" > Weight(kg)</Label>
                    <ShortInfoBox id="weight"></ShortInfoBox>
                  </SmallBoxContainer>
                </SmallBoxWrapper>
                <Button
                  onClick={() => {
                    setUpdating(true);
                  }}
                  style={{marginTop: '10px'}}
                >Update
                </Button>
                
                <Button
                  style={{marginTop: '10px'}}
                  onClick={() => {
                    Logout();
                  }}
                >Log Out</Button>
                
              </FormElements>
        </div>
        )}

        {/*Nav bar*/}
        <Container-fluid>
        <Nav  selected={"profile"}/>
            </Container-fluid>
      </div>
  );
};


export default Profile;