import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <div className='order-header'>
        <h3>Orders</h3>
        <p>Manage customer orders and update their status.</p>
      </div>
      <div className="order-list">
        {orders.map((order, index) => (
          <article key={index} className={`order-card ${index === 0 ? 'latest-order' : ''}`}>
            <div className='order-card-top'>
              <div className='order-customer'>
                <img src={assets.parcel_icon} alt="" className='order-icon' />
                <div>
                  <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
              </div>
              <div className='order-top-right'>
                {index === 0 && <span className='latest-badge'>This is latest</span>}
                <p className='order-total'>{currency}{order.amount}</p>
              </div>
            </div>

            <div className='order-items-box'>
              <p className='order-label'>Order Items</p>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
            </div>

            <div className='order-address-box'>
              <p className='order-label'>Delivery Address</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
            </div>

            <div className='order-card-footer'>
              <p className='order-count'>Items: {order.items.length}</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status} name="" id="">
                <option value="Placed">Placed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Prepared">Prepared</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Food Processing">Food Processing</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Order
