// src/pages/OrderDetailPage.jsx
//==============================
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axiosConfig";
import "@/styles/pages/_orderDetail.scss";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/orders/${orderId}`)
      .then(({ data }) => setOrder(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p>Chargement…</p>;
  if (!order) return <p>Commande introuvable.</p>;

  return (
    <main id="main-content" className="order-detail">
      <article className="order-details">
        <h1>Détails de la commande #{order.order.id}</h1>
        <p>Date : {new Date(order.order.order_date).toLocaleString()}</p>
        <p>Total : {parseFloat(order.order.total_amount).toFixed(2)} €</p>
        <p>Statut : {order.order.status}</p>
      </article>
      <h2>Articles</h2>
      <ul className="orders-list">
        {order.items.map((item) => (
          <li
            key={item.product_id + "-" + item.custom_image_id}
            className="order-card"
          >
            <img
              src={item.product_image_url || "/images/placeholder.png"}
              alt={item.product_name}
              className="order-thumb"
            />
            <div className="order-info">
              <h3>
                {item.product_name} × {item.quantity}
              </h3>
              <p>
                {(parseFloat(item.product_price) * item.quantity).toFixed(2)} €
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
