import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";


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

/*   const compareDates = ((d1,d2)=>{
    let f1 = (d1).split("T")
    let d1 = f1[0].split("-")
    let t1 = (f1[1].replace("Z","")).split(":")

    let f2 = (d2).split("T")
    let d2 = f2[0].split("-")
    let t2 = (f2[1].replace("Z","")).split(":")

    if (d1[2]>d2[2]){
      return d1
    }else{
      if ()
    }

  }) */

  const formatDate = ((date)=>{
    let dt = (date).split("T")
    let d = dt[0].split("-")
    let t = (dt[1].replace("Z","")).split(":")
      return <Text>{d[0]}/{d[1]}/{d[2]} - {t[0]}:{t[1]}</Text>
  })


  const [userInfo, setUserInfo] = useState([])
  const [messages, setMessages] = useState([])

  const updateMessages= ((m)=>{
      setMessages(m)
  })

  

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
    updateMessages
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