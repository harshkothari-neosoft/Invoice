import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf'
import {email} from '../config/Myservice'

const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};

export default function Preview() {
    const [userprofile, setstateuserprofile] = useState(0)
    const [usertotal, setusertotal] = useState(0)
    const { state } = useLocation();
    const ref = React.createRef();

    useEffect(()=>{
        let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            setstateuserprofile(decode)  
            console.log(state)
            let sum =0
            state.user.product.forEach(ele=>{
                sum+=ele.total
            })
            setusertotal(sum)
    },[])

    const sendmail = () => {
        let xyz = userprofile.email
        let abc =state.user.remail;
        console.log(abc, "line 37");
        const input = document.getElementById("divToPrint");
        console.log(input);

        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 15,40,180,160);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            email(formData,abc, xyz)
            // .then((res) => {
            //     console.log(res,"line 52");
            // });
        });
    };

    console.log(state)

    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div className="container">
            <nav class="navbar">
                <div class="container-fluid">
                    <Link to="/dashboard"><button className='btn btn-info'>Go Back</button></Link>
                    <div  className=" d-flex justify-content-sm-end">
                    <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0.6} y={0.3} scale={0.6}>
                            {({ toPdf }) => (
                                <button className='btn btn-info' onClick={() => {
                                    // sendData();
                                    toPdf();
                                }} variant="contained">
                                    Download
                                </button>
                            )}
                        </ReactToPdf>
                    </div>
                    <button onClick={sendmail} className='btn btn-info'>Send Email</button>
                </div>
            </nav>

            <div ref={ref} id='divToPrint'>
            <nav class="navbar  navbar-light bg-light">
                <div class="container-fluid" style={{ height: "168px" }}>
                    <img src="images/logo.png" alt="" height="85px" width="130px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                    <h3 style={{ marginRight: "20px", marginTop: "5px" }}>Invoice</h3>
                </div>
            </nav>
            <div className='row m-0 border'>
                <div className='col text-left mt-3 ml-4'>
                    <h5>From</h5>
                    <h6>{userprofile.firmname}</h6>
                    <h6>{userprofile.email}</h6>
                    <h6>{userprofile.contact}</h6>
                    <br />
                    <h5>To</h5>
                    <h6>{state.user.rname}</h6>
                    <h6>{state.user.remail}</h6>
                    <h6>{state.user.raddress}</h6>
                </div>
                <div className='col text-right mr-4'>
                    <h5 className='mt-3' style={{ textAlign: "right", marginRight: "15px" }}>Status</h5>
                    <h6 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "20px" }}>{state.user.status}</h6>
                    <br />
                    <h5 style={{ textAlign: "right", marginRight: "15px" }}>Due Date</h5>
                    <h6 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.rdate}</h6>
                    <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                    <h6 style={{ textAlign: "right", marginRight: "15px" }}>NGN {usertotal}</h6>
                </div>

            </div>
            <br />
            <div className="container-fluid">

                <table class="table m-4">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Item</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {state.user.product.map((ele, index) =>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{ele.title}</td>
                                <td>{ele.quantity}</td>
                                <td>{ele.price}</td>
                                <td>{ele.total}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        : <Navigate to="/"></Navigate>}
        </>
    )
}