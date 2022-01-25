import React, { useEffect, useState, useRef } from 'react'
import Navbaar from './Navbaar'
import jwt_decode from 'jwt-decode';
import { TextField, FormControl } from '@mui/material'
import { Navigate } from 'react-router'
import { Col, Row } from "react-bootstrap";
import {updateuser} from '../config/Myservice'

export default function Setting() {
    const [flag, setflag] = useState(false)
    const [user, setuser] = useState({})
    const [count, setcount] = useState(0)
    const [state, setstate] = useState({})
    

    useEffect(()=>{
        let token = localStorage.getItem('_token');
        console.log(token)
            let decode = jwt_decode(token);
        console.log(decode)

            setstate(decode)  
            setuser(decode)  
            console.log(state)
    },[count])

    const editdetails=()=>{
        setflag(true)
    }

    const updatedetails=()=>{
        let formData = {
            id:state.id,
            name:state.name,
            email:state.email,
            contact: state.contact,
            firmname:state.firmname
          }
             updateuser(formData).then(res=>{
                 setcount(count+1)
                 console.log(res.data)
                 localStorage.setItem("_token",res.data.token);

             })
            setflag(false)
    }
    return (
        <>
            <Navbaar/>
            <div>
            <h1 className='text-center mt-3'>Your details</h1>
            <div className='container-fluid text-center mt-3'>
                <p style={{fontSize: 20}}><label className='font-weight-bold'>Name:</label> {user.name}</p>
                <p style={{fontSize: 20}}><label className='font-weight-bold'>Contact:</label> {user.contact}</p>
                <p style={{fontSize: 20}}><label className='font-weight-bold'>Firm Name:</label> {user.firmname}</p>
                <p style={{fontSize: 20}}><label className='font-weight-bold'>Email:</label> {user.email}</p>
           </div>

            {flag ?
            <div className='container-fluid'>
           <Row>
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, name:e.target.value})}
                  name="name"
                  id="name"
                  label="Full Name"
                  value={state.name}
                />
                {/* <span className="text-danger">{errors.errname}</span> */}
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, contact:e.target.value})}
                  name="contact"
                  id="contact"
                  label="Contact"
                  value={state.contact}

                />
                {/* <span className="text-danger">{errors.errcontact}</span> */}
              </FormControl>
            </Col>
          
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, firmname:e.target.value})}
                  name="firmname"
                  id="firmname"
                  label="Enter firmname"
                  value={state.firmname}

                />
                {/* <span className="text-danger">{errors.errfirmname}</span> */}
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, email:e.target.value})}
                  name="email"
                  id="email"
                  label="Enter Email"
                  value={state.email}

                />
                {/* <span className="text-danger">{errors.erremail}</span> */}
              </FormControl>
            </Col>
            <div>
            <button className='ml-3 mt-2 btn btn-primary' onClick={()=>updatedetails()}>Update</button>
            </div>
          </Row>
          </div>
          : <div className='text-center m-2 '> <button className='btn btn-primary' onClick={()=>editdetails()}>Edit</button></div> }
          </div>
          
        </>
    )
}