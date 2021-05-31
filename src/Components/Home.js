import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";
import "./Home.css";

function Home(props){
    return(
        <Card className="homeCard">
            <Card.Header as="h5">Home Page</Card.Header>
            <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Card.Text>
                    To search for a results go to calendar view
                </Card.Text>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Card.Body>
        </Card>

    );
}

export default Home;