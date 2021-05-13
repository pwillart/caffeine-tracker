// LoginForm.js
import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Message from "../partials/Message";
import {useHistory} from "react-router";

const LoginForm = () => {

    const authContext = useContext(AuthContext);

    //const [user, setUser] = useState({ email: "", password: ""});
    const [user, setUser] = useState({ email: "pwillart72@gmail.com", password: "1234"});
    const [message, setMessage] = useState(null);
    const history = useHistory();

    const onChange = e => {
        setMessage(null); // Clear error message
        setUser({...user, [e.target.name]: e.target.value});
    }

    const resetForm = () => {
        setUser({email: "", password: ""});
    }

    const onSubmit = async e => {
        e.preventDefault();
        // Verify if all fields are filled in
        if (user.email === '' || user.password === '') {
            setMessage({msgBody: "Please enter your credentials", msgError: true});
            return;
        }
        await AuthService.login(user).then(data => {
            // Redirect user to dashboard if login is successful
            if (data.status === 'success') {
                authContext.setUser(data.user);
                authContext.setIsAuthenticated(true);
                resetForm();
                history.push('/dashboard');
            }
            // Else show message returned from api
            else {
                setMessage({msgBody: data.message, msgError: true});
            }
        });
    }

    return (
        <Form className="ml-5" onSubmit={onSubmit}>
            <h3 className="mb-3">Please Log in</h3>
            <Form.Row>
                <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Group controlId="email">
                        <Form.Control name="email" type="text" placeholder="Enter email" autoComplete="username email" value={user.email} onChange={onChange}/>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Group controlId="password">
                        <Form.Control name="password" type="password" placeholder="Enter password" autoComplete="current-password" value={user.password} onChange={onChange}/>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Button className="btn btn-primary btn-block mt-3 mb-3" type="submit" onSubmit={onSubmit}>Log in</Button>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    {message ? <Message message={message}/> : null}
                </Col>
            </Form.Row>
        </Form>
    );
}

export default LoginForm;
