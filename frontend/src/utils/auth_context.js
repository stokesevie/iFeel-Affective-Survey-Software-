
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
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
  const url = `http://127.0.0.1:8000`

  let updateToken = async ()=> {

    let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'refresh':authTokens?.refresh})
    })

    let data = await response.json()
    
    if (response.status === 200){
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
    }else{
        logoutUser()
    }

    if(loading){
        setLoading(false)
    }
}


  const loginUser = async (username, password,navigation) => {
   
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
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
      try{
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigation.navigate("Pending")}
      catch{
        updateToken()
      }
    } else {
      alert("Something went wrong!");
    }

    //error messages here

  };

  const [messages, setMessages] = useState([])
  const [courses, setCourses] = useState([])


  const updateMessages= ((m)=>{
      setMessages(m)
  })
  const updateCourses = ((c)=>{
    setCourses(c)
  }
  )


  const logoutUser = (navigation) => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigation.navigate("Login")
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
    updateMessages,
    updateCourses,
    messages,
    courses,
    url
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};