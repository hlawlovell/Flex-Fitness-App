import React, { useState, useEffect } from "react";
import {Helmet} from "react-helmet";
import Nav from '../components/nav'
import styled from "styled-components";
import '../components/common.css';
import Logo from '../components/Logo';
import GenericDisplay from '../images/genericDisplay.png';
import axios from 'axios';
import { Formik } from 'formik';


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
  background: white;
  flex-direction: column;
`;

const ShortInfoBox = styled.div`
  width: 100%;
  height: 25px;
  border: solid 1px black;
  background: white;
`;

const ShortInput = styled.input`
  width: 50%;
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
const ErrorMessage = styled.div`
  color: red;
`;



const Update = (name, email, password, height, weight) => {
  axios
    .put('http://52.63.210.110:8001/profiles/', {
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
    axios.get('http://52.63.210.110:8001/profiles/').then(response => {
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
            <Formik
              initialValues={{name: name, email: email, password1: password, password2: password, height: height, weight: weight}}
              validate={values => {
                let errors = {};

                // validate email
                if (!values.email) {
                  errors.email = "Enter an email address";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }
                
                // validate password
                if (!values.password1) {
                    errors.password1 = "Enter a password";
                } else if (values.password1.length < 6) {
                  errors.password1 = "Password must be minimum 6 characters";
                } else if (values.password1 !== values.password2) {
                  errors.password2 = "Password does not match";
                } 
                
                // validate name
                if (!values.name) {
                  errors.name = "Enter a name";
                }
                
                // validate height
                if (!values.height) {
                  errors.height = "Enter height";
                } else if (values.height < 0) {
                  errors.height = "Enter positive height value";
                }

                // validate weight
                if (!values.weight) {
                  errors.weight = "Enter weight";
                }
                return errors
              }}
              onSubmit={values => {
                console.log("testing")
                setUpdating(false);
                Update(values.name, values.email, values.password1, values.height, values.weight);
              }}
              >
                {({ handleSubmit,
                    handleChange,
                    values,
                    touched,
                    isValid,
                    errors}) => (
                        <form onSubmit={handleSubmit}>
                          <FormElements>
                            <Label for="name"> Name</Label>
                            <LongInput 
                              name="name"
                              type="text"
                              placeholder="John"
                              value={values.name}
                              onChange={handleChange}
                            />
                            <ErrorMessage>{errors.name && touched.name && errors.name}</ErrorMessage> 

                            <Label for="email"> Email</Label>
                            <LongInput 
                              name="email"
                              type="text"
                              placeholder="John@usyd.edu.au"
                              value={values.email}
                              onChange={handleChange}
                            />
                            <ErrorMessage>{errors.email && touched.email && errors.email}</ErrorMessage> 
                          

                            <Label for="password1"> 
                              Password <Recede> (min. 6 characters) </Recede>
                            </Label>
                            <LongInput 
                              name="password1"
                              type="password"
                              placeholder="Password"
                              value={values.password1}
                              onChange={handleChange}
                              />
                              <ErrorMessage>{errors.password1 && touched.password1 && errors.password1}</ErrorMessage> 

                            <Label for="password2"> 
                              Confirm Password
                            </Label>
                            <LongInput 
                              name="password2"
                              type="password"
                              placeholder="Confirm Password"
                              value={values.password2}
                              onChange={handleChange}
                              />
                              <ErrorMessage>{errors.password2 && touched.password2 && errors.password2}</ErrorMessage> 

                            <SmallBoxWrapper>
                              <SmallBoxContainer>
                                <Label for="height"> Height(cm)</Label>
                                <ShortInput 
                                  name="height" 
                                  type="number"
                                  placeholder="200"
                                  value={values.height}
                                  onChange={handleChange}
                                />
                                <ErrorMessage>{errors.height && touched.height && errors.height}</ErrorMessage> 
                              </SmallBoxContainer>

                              <EmptySpace/>

                              <SmallBoxContainer>
                                <Label for="weight"> Weight(kg)</Label>
                                <ShortInput 
                                  id="weight" 
                                  type="number"
                                  placeholder="100"
                                  value={values.weight}
                                  onChange={handleChange}  
                                />
                                <ErrorMessage>{errors.weight && touched.weight && errors.weight}</ErrorMessage> 
                              </SmallBoxContainer>
                            </SmallBoxWrapper>
                            <Button
                              type="submit"
                            >Save
                            </Button>
                          </FormElements>
                        </form>    
                    )}
              </Formik>
        </div>
        ) : (
          <div>
            
              <FormElements >
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