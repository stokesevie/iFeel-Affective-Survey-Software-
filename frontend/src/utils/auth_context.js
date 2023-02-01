import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [staff, setStaff] = useState(false)
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const loginUser = async (username, password, navigation) => {

    const response = await fetch("http://backend-production-94f0.up.railway.app/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));

      localStorage.setItem("authTokens", JSON.stringify(data));
      
    } else {
      alert("Something went wrong!");
    }

  };

  const listFormatDate = ((date)=>{

  })

  const compare = ((d1,d2,time = false)=>{
    if (time){
      if (d1[3]>d2[3]){
        return d1
      }else if (d1[3]<d2[3]){
        return d2
      }else{
        if (d1[4]>d2[4]){
          return d1
        }else if (d1[4]<d2[4]){
          return d2
        } else{
          return d1
        }
      }
    }else{
    if (d1[0]>d2[0]){
      return d1
    }else if (d1[0]<d2[0]){
      return d2
    } else{
      if (d1[1]>d2[1]){
        return d1
      }else if (d1[1]<d2[1]) {
        return d2
      }else{
        if (d1[2]>d2[2]){
          return d1
        }else if (d1[2]<d2[2]){
          return d2
        }else{
          compare(d1,d2,true)
        }
      }
    }
  }

  })

  const formatDate = ((date)=>{
    let dt = (date).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")
    let format = d.concat(t)
      return <Text>{format[0]}/{format[1]}/{format[2]} - {format[3]}:{format[4]}</Text>
  })


  const [userInfo, setUserInfo] = useState([])
  const [messages, setMessages] = useState([])
  const [courses, setCourses] = useState([])

  const updateMessages= ((m)=>{
      setMessages(m)
  })

  const updateCourses = ((c)=>{
    setCourses(c)
  }
  )
  

  const fetchUserInfo = async ()=>{
        const response = await fetch(`http://backend-production-94f0.up.railway.app/users/`+ user.user_id, {
          method : 'GET',
          headers :{
              'Content-Type' : 'application/json',
          },
      })
      .then(res => res.json())
      .then(data => {
          setUserInfo(data)
      });

  }




  useEffect(()=>{
    if (user){
      fetchUserInfo()
    }
  },[user])

  useEffect(()=>{
    setStaff(userInfo.is_staff)
  },[userInfo])

  const logoutUser = (navigation) => {
    setAuthTokens(null);
    setUser(null);
    setUserInfo(null)
    localStorage.removeItem("authTokens");
    navigation.push("Login")
  };

  const contextData = {
    user,
    setUser,
    userInfo,
    staff,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
    messages,
    updateMessages,
    updateCourses,
    courses
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};