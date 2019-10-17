import React, {Component} from "react"
import { Navbar, Nav } from "react-bootstrap";


class nav extends Component{
    render(){
        if(this.props.selected==="home"){
            return(
                <Navbar bg="light" expand="lg" fixed="bottom" >
                    <Nav.Link  href="/flex" className="active">Flex</Nav.Link>                    
                    <Nav.Link href="/workout">Workout</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Navbar>
                )     
        }else if (this.props.selected==="workout"){
            return(
                <Navbar bg="light" expand="lg" fixed="bottom" >
                    <Nav.Link href="/flex">Flex</Nav.Link>
                    <Nav.Link href="/workout" className="active">Workout</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Navbar>
                )     
        } else {
            return(
                <Navbar bg="light" expand="lg" fixed="bottom" >
                    <Nav.Link href="/flex">Flex</Nav.Link>
                    <Nav.Link href="/workout">Workout</Nav.Link>
                    <Nav.Link href="/profile" className="active">Profile</Nav.Link>
                </Navbar>
                )     
        }

    }
}

export default nav;