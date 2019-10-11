import React from "react";
import styled from "styled-components";
import logo from '../images/logo.png';

const ImgLogo = styled.img`
  margin: 0;
  display: inline-block;
  max-height: 35px;
`;


const Logo = () => <ImgLogo src={logo} alt='Flex' />;
export default Logo;