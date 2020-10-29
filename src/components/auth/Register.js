import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Icon } from 'semantic-ui-react'
import "./Login.css";


export const Register = props => {
  const username = useRef();
  const email = useRef();
  const species = useRef();
  const lookingFor = useRef();
  const photo = useRef();
  const bio = useRef();
  const conflictDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/reptiles?email=${email.current.value}`)
      .then(res => res.json())
      .then(user => !!user.length);
  };

  const handleRegister = e => {
    e.preventDefault();

    existingUserCheck().then(userExists => {
      if (!userExists) {
        fetch("http://localhost:8088/reptiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.current.value,
            username: `${username.current.value}`,
            species: species.current.value,
            lookingFor: lookingFor.current.value,
            photo: photo.current.value,
            bio: bio.current.value, 
          })
        })
          .then(_ => _.json())
          .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("lizard_user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  return (
    
    <main className="container--register" style={{ textAlign: "left" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <Button
          className="button--close"
          onClick={e => conflictDialog.current.close()}
        >
          Close
        </Button>
      </dialog>
      
      <Form className="form--login" onSubmit={handleRegister}>
        <div className="register-form-align">
        <h1 className="form-register-txt">
          Join now!
        </h1>
          <Form.Group><Form.Field>
          <div className="registerLabel">Create a Username</div>

          <input
            
            ref={username}
            type="text"
            name="username"
            width={5}
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          /></Form.Field>
          <Form.Field>

          <div className="registerLabel">Species</div>
            <input
            ref={species}
            width={5}
            type="text"
            name="species"
            className="form-control"
            placeholder="Species"
            required
          />
          
          </Form.Field></Form.Group>
      
      <Form.Field>

      <div className="registerLabel">Email Address</div>
<input
            
            ref={email}
            width={16}
            type="text"
            name="email"
            className="form-control"
            placeholder="Email address"
            required/>
      </Form.Field>
          <div className="registerLabel">I'm looking for...</div>

          <Form.Field><input
            ref={lookingFor}
            width={8}
            type="text"
            name="lookingFor"
            className="form-control"
            placeholder="Lookin' for"
            required
          /></Form.Field>
          
          <div className="registerLabel"> Here's my best angle</div>
          <Form.Field><input
            ref={photo}
            type="text"
            name="photo"
            className="form-control"
            placeholder="A photo of me"
            required
          /></Form.Field>
        
        
        <Form.Field>
        <div className="registerLabel">Bio</div>
        <input
            label="Bio"
            ref={bio}
            type="text"
            name="bio"
            className="form-control"
            placeholder="A little about me."
            required
          /></Form.Field>
        
          <Button color="olive" type="submit"> Create Account </Button>
          </div>
      </Form>
    </main>
    
  );
};
