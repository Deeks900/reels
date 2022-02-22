import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import UploadFile from './UploadFile'
import './Feed.css';
import { database } from "../Firebase";


export default function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState('')
  useEffect(()=>{
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
          setUserData(snapshot.data())
      })
      return ()=>{unsub()}
  }, [user])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="comp" style={{ width: "50%" }}>
        {console.log("Hi! I am speaking from Feed")}
        <h1 className="feed-heading">Welcome to feed</h1>
        <button className="feed-btn" onClick={logout}>Logout</button>   
      </div>
      <UploadFile user={userData}/>
    </div>
  );
}
