import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllOrders } from '../../redux/Actions/OrderActions';

const Order = () => {
    let { orders } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllOrders())
    }, [dispatch])

    return (
        <div className='my-5'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserEmail</th>
                        <th scope="col">Kitab Adi</th>
                        <th scope="col">Miqdari</th>
                        <th scope="col">Qiymet</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders &&
                        orders.map((order) => (
                            <tr key={order.id}>
                                <th scope="row">{order.id}</th>
                                <td>{order.userEmail}</td>
                                <td>{order.bookName}</td>
                                <td>{order.totalQuantity}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Order