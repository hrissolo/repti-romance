import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
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
            username: `${username.current.value}`
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
    <main style={{ textAlign: "left" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={e => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Join now!
        </h1>
          <div>
          <label htmlFor="inputUsername">Create a Username </label>
          <input
            ref={username}
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          /></div>
        <div>
          <label htmlFor="inputEmail">Email Address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          /></div>
        <div>
          <label htmlFor="inputSpecies">Species</label>
          <input
            ref={species}
            type="species"
            name="species"
            className="form-control"
            placeholder="Species"
            required
          /></div>
        <div>
          <label htmlFor="inputLookingFor">I'm looking for ... </label>
          <input
            ref={lookingFor}
            type="lookingFor"
            name="lookingFor"
            className="form-control"
            placeholder="Lookin' for"
            required
          /></div>
        <div>
          <label htmlFor="inputPhoto">Here's my best angle</label>
          <input
            ref={photo}
            type="photo"
            name="photo"
            className="form-control"
            placeholder="A photo of me"
            required
          /></div>
        <div>
          <label htmlFor="inputBio">Bio</label>
          <input
            ref={bio}
            type="bio"
            name="bio"
            className="form-control"
            placeholder="A little about me."
            required
          /></div>  
        
          <button type="submit"> Create Account </button>
        
      </form>
    </main>
    
  );
};
