import React,{useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useSelector,useDispatch} from "react-redux"
import {userLogin} from '../slices/userSlices'
import { useNavigate } from "react-router-dom";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
let Dispatch = useDispatch()
  let {userObj,isError,isLoading,isSuccess,errMsg} = useSelector(state=> state.user)
  const onFormsubmit = (userCredentialObject) => {
 Dispatch(userLogin(userCredentialObject))
  }
//get navigate functon to navigate programatically
let navigate = useNavigate();

    //this to be executed when either isSuccess or isError changed
    useEffect(() => {
      if (isSuccess) {
        navigate("/userdashboard");
      }
    }, [isSuccess, isError]);
  return (
    <div>
      <h1 className="display-2 text-center text-info"> Signup</h1>
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormsubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username"{...register("username",{required:true})} />
        {errors.username&&<p className="text-danger">*Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password"{...register("password",{required:true})} />
          {errors.password&&<p className="text-danger">*password is required</p>}
        </Form.Group>

      

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
