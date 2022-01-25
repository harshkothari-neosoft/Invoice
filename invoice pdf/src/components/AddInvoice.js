import React, {useState, useRef} from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import {Button, TextField, FormControl } from '@mui/material'
import jwt_decode from 'jwt-decode';
import Navbaar from './Navbaar';
import { useNavigate } from "react-router";
import { Navigate } from 'react-router'
import {addinvoice} from '../config/Myservice'
export default function AddInvoice() {
    const navigate =  useNavigate();
    const [flag, setflag] = useState(false)
    const [productdata, setproductdata] = useState([])
    const title = useRef(null)
    const quantity = useRef(null)
    const price = useRef(null)
    const discount = useRef(null)
    const remail = useRef(null)
    const rname = useRef(null)
    const raddress = useRef(null)
    const rdate = useRef(null)

    const submitproduct=()=>{
        const newproduct = {
            title:title.current.value, 
            quantity:parseInt(quantity.current.value), 
            price: parseInt(price.current.value), 
            discount: parseInt(discount.current.value),
            total: ((price.current.value - (price.current.value * discount.current.value / 100)) * quantity.current.value)
        }
        setproductdata([...productdata, newproduct])
        setflag(false)
    }

    const submitdata=()=>{
        let token = localStorage.getItem('_token');
        let decode = jwt_decode(token);
        const newdata = {
            email: decode.email,
            remail: remail.current.value,
            rname: rname.current.value,
            raddress: raddress.current.value,
            rdate: rdate.current.value,
            product: productdata,
            status: "UNPAID"
        }
        addinvoice(newdata).then(res=>{
            console.log(res.data, "line 44")
        })
        console.log(newdata)
        navigate('/dashboard')
    }
    return (
      <>
      {localStorage.getItem('_token')!=undefined ?
        <div>
            <Navbaar/>
            <h3 className='text-center mt-3'>Add New Invoice</h3>
            <div className='container-fluid'>
           <Row>
               <Col>
               <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                //   onBlur={handler}
                  name="rname"
                  id="rname"
                  inputRef={rname}
                  type="text"
                  label="Receiver Name"
                />
                </FormControl>
               </Col>

               <Col>
               <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                //   onBlur={handler}
                  name="remail"
                  id="remail"
                  inputRef={remail}
                  type="text"
                  label="Receiver Email"
                />
                </FormControl>
               </Col>

               <Col>
               <FormControl sx={{ my: 1, width: "36ch" }}>
               <TextField
                //   onBlur={handler}
                  name="raddress"
                  id="raddress"
                  inputRef={raddress}
                  type="text"
                  label="Receiver Address"
                />
                </FormControl>
               </Col>

               <Col>
                <FormControl sx={{ my: 1, width: "36ch" }}>
               <TextField
                //   onBlur={handler}
                  name="rdate"
                  id="rdate"
                  inputRef={rdate}
                  type="date"
                />
                </FormControl>
               </Col>

           </Row>
           </div>
           <div className='container-fluid mt-5'>
           <table className='table'>
               <thead>
                   <tr>
                    <th>Sr No.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                   </tr>
               </thead>

               <tbody>
                {productdata.map((ele, index)=>
                   <tr>
                       <td>{index+1}</td>
                       <td>{ele.title}</td>
                       <td>{ele.quantity}</td>
                       <td>{ele.price}</td>
                       <td>{ele.discount}</td>
                       <td>{ele.total}</td>
                   </tr>
                   )}
               </tbody>
           </table>
           </div>

             {/* products input */}
             {flag ? <>
            <div className='container-fluid'>
                <Row>
                    <Col>
                    <FormControl sx={{ my: 1, width: "36ch" }}>
               <TextField
                //   onBlur={handler}
                  name="title"
                  id="title"
                  inputRef={title}
                  type="text"
                  label="Item Name"
                />
                </FormControl>
                    </Col>

                    <Col>
                    <FormControl sx={{ my: 1, width: "36ch" }}>
               <TextField
                //   onBlur={handler}
                  name="quantity"
                  id="quantity"
                  inputRef={quantity}
                  type="number"
                  label="Quantity"
                />
                </FormControl>
                    </Col>

                    <Col>
                    <FormControl sx={{ my: 1, width: "36ch" }}>
               <TextField
                //   onBlur={handler}
                  name="price"
                  id="price"
                  inputRef={price}
                  type="text"
                  label="Price"
                />
                </FormControl>
                    </Col>

                    <Col>
                    <FormControl sx={{ my: 1, width: "36ch" }}>
               <TextField
                //   onBlur={handler}
                  name="discount"
                  id="discount"
                  inputRef={discount}
                  type="number"
                  label="discount"
                />
                </FormControl>
                    </Col>
                </Row>
            </div>
            <div className='text-center mt-3'>
            <button onClick={()=> submitproduct()} className='btn btn-info' >Submit Product</button>
            </div>
            </>  : <div className='text-center mt-3'>
            <button onClick={()=> setflag(true)} className='btn btn-info' >Add New Product</button>
            </div>}
            <div className='text-center mt-3'>
            <button onClick={()=> submitdata()} className='btn btn-info' >Submit</button>
            </div>
        </div>
        : <Navigate to="/"></Navigate>}
        </>
    )
}
