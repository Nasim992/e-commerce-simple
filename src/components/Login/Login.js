import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from '../Home/Home';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const  fbprovider = new firebase.auth.FacebookAuthProvider();
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn : false,
    name:'',
    email : '',
    password : '',
    photo: '',
    error:''
  });

const [loggedInUser,setLoggedInUser] = useContext(UserContext);

const history = useHistory();

const location = useLocation();

let { from } = location.state || { from: { pathname: "/" } };


   const handleSignIn = ()=> { // sign in user

    firebase.auth().signInWithPopup(provider).then(response=>{
      const {displayName,photoURL,email} = response.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo:photoURL
      }

      setUser(signedInUser);
    })
    .catch(error=> {
      console.log(error.message);
    })

  }
  const handleSignOut = ()=>{ // Sign out user
   firebase.auth().signOut()
   .then(response=>{
    const signedOutUser = {
      isSignedIn : false,
      name:'',
      email : '',
      photo: '',
      success : false
    }
    setUser(signedOutUser);
   })
   .catch((error)=>{
      console.log(error);
   })
  }
  const handleSubmit = (event)=>{
    if(user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(response=> {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name);

      })
      .catch(error=>{
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(response=> {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success=true;
        setUser(newUserInfo); 
        setLoggedInUser(newUserInfo);
        history.replace(from);
        

      })
      .catch(error=>{
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    event.preventDefault();
  }


    const handleBlur=(event)=> { // added new user 
        const newUser = {...user}; // copy user state 
        newUser[event.target.name] = event.target.value;

        setUser(newUser);
      }

      const updateUserName = name=> {
        const  user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('User updated successfully');
        }).catch(function(error) {
          console.log(error);
        });
      }

      const handleFbSignIn=()=>{
        firebase.auth().signInWithPopup(fbprovider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(user);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }

  return (
    <div style={{textAlign:'center'}}>
     {
       user.isSignedIn ?  <button onClick={handleSignOut}>Sign Out</button>: <button onClick={handleSignIn}>Sign In with google</button>
     }
     <button onClick={handleFbSignIn}>Sign in with facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome :{user.name}</p>
        <img src={user.photo} alt="image" srcset=""/>
      <p>Email : {user.email}</p>
        </div>
      }
       <h1>Our own authentication system</h1>
         <h5>Name:{user.name}</h5>
        <h5>Email:{user.email}</h5>
        <h5>Password:{user.password}</h5>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign UP</label><br></br>
       <form onSubmit={handleSubmit}>
       
    {
      newUser &&  <input type="text" onBlur={handleBlur} name="name"placeholder="Enter your Name" required id=""/>
    }
    <br/><br/>
       <input type="email" onBlur={handleBlur} name="email" id="" placeholder="Enter Your Email Address"required/><br/><br/>
       <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter your password" required/><br/><br/>
       <input type="submit" value="Submit"/>
       </form>
       <p style={{color:'red'}}>{user.error}</p>
       {
         user.success && <p style={{color:'green'}}>User {newUser ?'created':'logged in'} successfully</p>
       }
     
    
    </div>
  );
}

export default Login;
