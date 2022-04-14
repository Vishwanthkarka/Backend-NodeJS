import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFormsubmit = (users) => {
    console.log(users)
  }
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
