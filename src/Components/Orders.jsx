import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { Order } from '.';


function Orders() {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                })))
            })
        } else {
            setOrders([])
        }
    }, [user])

    return (
    <div className='Orders'>
        <h1>Your Orders</h1>
        <div className="orders__order">
            {orders?.map((order, index) => {
                return <Order key={index} order={order} />
            })
                
            }
        </div>
    </div>
    )
}

export default Orders
