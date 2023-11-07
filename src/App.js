// src/App.js
import React, { useState, useEffect } from "react";
// import API from Amplify library
import { API,Auth } from "aws-amplify";
// import query definition
import { listTodos } from "./graphql/queries";
// src/App.js, import the withAuthenticator component and associated CSS
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({signOut, user}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listTodos });
      setPosts(postData.data.listTodos.items);
    } catch (err) {
      console.log({ err });
    }
  }
  //define the checkUser function after the existing fetchPosts() function
  async function checkUser(){
    const user = await Auth.currentAuthenticatedUser();
    console.log("user:", user);
    console.log("user attributes: ", user.attributes);
  }
  return (
    <div>
      <h1>Hello World DroidconKE 2023</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.location}</p>
          <p>{post.description}</p>
        </div>
      ))}

      <div>
        <button style={{padding:"5px",backgroundColor:"#000",color:"white"}} onClick={signOut}>sign out</button>
      </div>
    </div>
  );
}

export default withAuthenticator(App);

