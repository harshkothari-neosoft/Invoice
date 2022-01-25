import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import Navbaar from './Navbaar';
import { Navigate } from 'react-router'
import { Col, Row } from "react-bootstrap";
import { Card, CardContent } from '@mui/material'
import {fetchdata, deleteinvoice, updateinvoice} from '../config/Myservice'
import { useNavigate } from "react-router";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

export default function Dashboard() {
    const navigate =  useNavigate();
    const [state, setstate] = useState(0)
    const [status, setstatus] = useState({invoices:[],paymentReceived:0, pendingAmount:0, totalAmount:0, paidInvoice:0, unpaidInvoice:0,totalInvoice:0  })
    useEffect(async() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            let data = []
           await fetchdata({email:decode.email}).then(res=>{
                data=[...res.data]
                console.log(res.data)
            })
            console.log(status.invoices)
            console.log(data)
            let total=0
            let upaid=0
            let pamount=0
            let totalinvoice=0
            data.forEach(ele=>{
                console.log(ele)
                totalinvoice +=1
                if(ele.status == "UNPAID"){
                    upaid +=1
                    ele.product.forEach(item=>{
                    total += item.total
                    pamount +=item.total
                    })
                }
                else{
                    ele.product.forEach(item=>{
                    total += item.total
                    })
                }
            })
            setstatus({invoices:data, paymentReceived: total-pamount, pendingAmount:pamount, totalAmount:total, paidInvoice:totalinvoice-upaid, unpaidInvoice:upaid,totalInvoice:totalinvoice })
        }
     }, [state])

     const delinvoice=(ele)=>{
         console.log(ele,"In delete invoice")
        deleteinvoice(ele)
        setstate(state+1)
     }

     const upinvoice=(ele)=>{
        updateinvoice(ele)
        setstate(state+1)
     }
 console.log(status)
    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div>
            <Navbaar/>
            
            <Row className='m-3'>
            <Col>
            <Card>
                <CardContent>
             <MonetizationOnIcon style={{fontSize: 35}}/>  <label className='font-weight-bold'>Payment Received: </label><br/> {status.paymentReceived}
                </CardContent>
           </Card>
            </Col>
            <Col>
            <Card>
                <CardContent>
               <PendingActionsIcon style={{fontSize: 35}}/> <label className='font-weight-bold'> Pending Amount: </label> <br/> {status.pendingAmount}
                </CardContent>
           </Card>
            </Col>
            <Col>
            <Card>
                <CardContent>
                <AccountBalanceWalletIcon  style={{fontSize: 35}}/>  <label className='font-weight-bold'> Total Amount: </label><br/> {status.totalAmount}
                </CardContent>
           </Card>
            </Col>
           
           </Row>

           <Row className='m-3'>
            <Col>
            <Card>
                <CardContent>
               <DescriptionIcon style={{fontSize: 35}}/> <label className='font-weight-bold'>  Paid Invoice: </label> <br/> {status.paidInvoice}
                </CardContent>
           </Card>
            </Col>
            <Col>
            <Card>
                <CardContent>
                <PendingActionsIcon style={{fontSize: 35}}/>  <label className='font-weight-bold'>  Unpaid Invoice: </label> <br/> {status.unpaidInvoice}
                </CardContent>
           </Card>
            </Col>
            <Col>
            <Card>
                <CardContent>
                
               <ReceiptIcon style={{fontSize: 35}}/> <label className='font-weight-bold'> Total Invoice: </label> <br/> {status.totalInvoice}
                </CardContent>
           </Card>
            </Col>
           
           </Row>
            <div className='container'>
           <table className='table'>
               <thead>
                   <tr>
                    <th>Receivers Name</th>
                    <th>Receivers email</th>
                    <th>Receivers due date</th>
                    <th>Status</th>
                    <th>Action</th>
                   </tr>
               </thead>

               <tbody>
                {status.invoices.map(ele=>
                
                   <tr>
                       <td>{ele.rname}</td>
                       <td>{ele.remail}</td>
                       <td>{ele.rdate}</td>
                       <td>{ele.status}</td>
                       <td>
                           <button onClick={() => navigate('/preview', { state: {user:ele}})} className='btn btn-success'>Preview</button>
                           <button onClick={()=> upinvoice(ele)} className='btn btn-info mx-2'>Update</button>
                           <button onClick={()=>delinvoice(ele)} className='btn btn-danger'>Delete</button>
                       </td>
                   </tr>
                   )}
               </tbody>
           </table>
           </div>
        </div>
        : <Navigate to="/"></Navigate>}
        </>
    )
}
