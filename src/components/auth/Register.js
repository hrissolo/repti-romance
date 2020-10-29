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
        <button
          className="button--close"
          onClick={e => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      
      <Form className="form--login" onSubmit={handleRegister}>
        <h1 className="form-register-txt">
          Join now!
        </h1>
          <Form.Group>
          <input
            label="Create a Username"
            ref={username}
            type="text"
            name="username"
            width={8}
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          />
          <input
            label="Email Address"
            ref={email}
            width={8}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          /></Form.Group>
      
          <input
            ref={species}
            label="Species"
            type="species"
            name="species"
            className="form-control"
            placeholder="Species"
            required
          />
          
          <input
            ref={lookingFor}
            label="I'm looking for..."
            type="lookingFor"
            name="lookingFor"
            className="form-control"
            placeholder="Lookin' for"
            required
          />
          
          <input
            ref={photo}
            label="Here's my best angle"
            type="photo"
            name="photo"
            className="form-control"
            placeholder="A photo of me"
            required
          />
        
        
          <input
            label="Bio"
            ref={bio}
            type="bio"
            name="bio"
            className="form-control"
            placeholder="A little about me."
            required
          />
        
          <Button type="submit"> Create Account </Button>
        
      </Form>
    </main>
    
  );
};
