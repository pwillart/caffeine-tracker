// RegisterForm.js
import React, {useState} from 'react';
import AuthService from "../../services/AuthService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Message from "../partials/Message";
import {useHistory} from "react-router";

const RegisterForm = () => {

    const [user, setUser] = useState({ name: "", email: "", password: "", password_confirm: ""});
    const [message, setMessage] = useState(null);
    const history = useHistory();

    const onChange = e => {
        setMessage(null); // Clear error message
        setUser({...user, [e.target.name]: e.target.value});
    }

    const resetForm = () => {
        setUser({name: "", email: "", password: "", password_confirm: ""});
    }

    const onSubmit = async e => {
        e.preventDefault();
        let validationErrors = [];
        // Verify if all fields are filled in
        if (user.name === '') validationErrors.push('Name is mandatory');
        if (user.email === '') validationErrors.push('Email is mandatory');
        if (user.password === '') validationErrors.push('Password is mandatory');
        // Verify if passwords are the same
        if (user.password !== user.password_confirm) validationErrors.push('Passwords don\'t match');
        if (validationErrors.length > 0) {
            setMessage({msgBody: validationErrors.join('<br/>'), msgError: true});
            return;
        }
        await AuthService.register(user).then(data => {
            setMessage(data.message);
            // Redirect user to login page if successful registration
            if (data.status === 'success') {
                resetForm();
                history.push('/dashboard');
            } else {
                Object.keys(data.errors).forEach(key => {
                    validationErrors.push(data.errors[key]);
                });
                setMessage({msgBody: validationErrors.join('<br/>'), msgError: true});
            }
        });
    }

    return (
        <Form className="ml-5" onSubmit={onSubmit}>
            <h3 className="mb-3">Please register</h3>
            <Form.Row>
                <Col>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter name" autoComplete="name" value={user.name} onChange={onChange}/>
                    </Form.Group>
                </Col>
            </Form.Row>
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
                    <Form.Group controlId="password_confirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control name="password_confirm" type="password" placeholder="Confirm password" autoComplete="current-password" value={user.password_confirm} onChange={onChange}/>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Button className="btn btn-primary btn-block mt-3 mb-3" type="submit" onSubmit={onSubmit}>Register</Button>
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

export default RegisterForm;
