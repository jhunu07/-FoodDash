import React, { useCallback, useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

 const [searchParams] = useSearchParams();
  const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
  try {
    const response = await axios.post(`${url}/api/order/verify`, {
      success,
      orderId
    });
    
    if (response.data.success) {
      // Small delay to ensure order is updated in database
      setTimeout(() => {
        navigate('/myorders');
      }, 1000);
    } else {
      navigate("/");
    }
  } catch {
    navigate("/");
  }
}, [navigate, orderId, success, url]);
    useEffect(() =>{
       verifyPayment(); 
    }, [verifyPayment])

  return (
    <div className='verify'>
        <div className='spinner'></div>
     
    </div>
  )
}

export default Verify
