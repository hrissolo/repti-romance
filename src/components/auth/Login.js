import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Input, Icon, Image } from 'semantic-ui-react'
import "./Login.css";

export const Login = props => {
  const email = useRef();
  const existDialog = useRef();
  const history = useHistory();



  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/reptiles?email=${email.current.value}`)
      .then(res => res.json())
      .then(user => (user.length ? user[0] : false));
  };

  const handleLogin = e => {
    e.preventDefault();

    existingUserCheck().then(exists => {
      if (exists) {
        localStorage.setItem("lizard_user", exists.id);
        history.push("/");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <Button
          className="button--close"
          onClick={e => existDialog.current.close()}
        >
          Close
        </Button>
      </dialog>

      <section>
        
        <Form className="form--login" onSubmit={handleLogin}>
          <h1 className="form-login-txt">Repti-Romance</h1>
          
          <img className="loginIMG" src="https://media.giphy.com/media/ejJgnxKlKVe5ucRPtC/giphy.gif"/>
          
          <div className="login-content">
          <h2 className="signinTxt">Sign in to get slitherin'~</h2>
          <Form.Field>
            <input
              size= "large"
              label="Email Address"
              ref={email}
              type="email"
              id="email"
              className="form-control"
              placeholder="@ Email address"
              required
              autoFocus
            />
          </Form.Field>
            <Button color="olive" type="submit">Sign in</Button>
            <Link className="reggieLink" to="/register">Not a member yet?</Link>
            </div>
            
          </Form>
        
      </section>
    </main>
  );
};

