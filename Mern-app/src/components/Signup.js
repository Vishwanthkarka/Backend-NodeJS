import React,{useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import axios from "axios"

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm();

  // state for image
  let [img,setImg] = useState(null);

  //on image select 
  const onImageSelect=  (event) => {
    setImg(event.target.files[0])
  }

const navigate = useNavigate()
  const onFormsubmit = (userObj) => {
   
    //create FormData object
    let formData = new FormData()

    // append values to it 
    formData.append("userObj",JSON.stringify(userObj))
    formData.append("photo",img);

    axios.post('http://localhost:4000/user-api/create-user',formData)
    .then(res=> {console.log(res)
      alert(res.data.message)

      // if user created
      if(res.data.message === 'New user Created'){
        navigate("/login")
      }
    })


    .catch(error => {
      console.log(error)
      alert('something went wrong')

    })

 
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
          {errors.password&&<p className="text-danger">*Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Password"{...register("email",{required:true})} />
          {errors.email&&<p className="text-danger">*Email is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="city"{...register("city",{required:true})} />
          {errors.city &&<p className="text-danger">*city is required</p>}
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Select the Image</Form.Label>
    <Form.Control type="file" {...register("photo",{required:true})} onChange={(event) => onImageSelect(event)} />
  </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
