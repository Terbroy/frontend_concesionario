import { useDispatch } from "react-redux";
import LoginCard from "../components/login/LoginCard";
import { useEffect } from "react";
import { loading } from "../store/slices/loader.slice";

const Login = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(loading(false))
    },[])
  

    return(
        <div className="login">
            <LoginCard/>
        </div>
    )
}

export default Login;