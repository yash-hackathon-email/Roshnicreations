import { db } from '../utils/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';

export const saveOrder = async (order) => {
  try {
    const newOrder = {
      ...order,
      orderId: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      status: 'Processing',
      timeline: [
        { status: 'Placed', timestamp: new Date().toISOString(), details: 'Order has been received.' }
      ]
    };
    
    const ordersRef = collection(db, "orders");
    await addDoc(ordersRef, newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error saving order: ", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return [];
  }
};

export const updateOrderStatus = async (docId, newStatus, trackingTimeline = null) => {
  try {
    const orderRef = doc(db, "orders", docId);
    if (trackingTimeline) {
       await updateDoc(orderRef, { status: newStatus, timeline: trackingTimeline });
    } else {
       await updateDoc(orderRef, { status: newStatus });
    }
  } catch (error) {
    console.error("Error updating order: ", error);
  }
};
