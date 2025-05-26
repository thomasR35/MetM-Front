import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axiosConfig";
import "@/styles/pages/_orderDetail.scss";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/orders/${orderId}`)
      .then(({ data }) => {
        // ↘ On récupère la partie "order" et la partie "items"
        setOrder(data.order);
        setItems(data.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading)
    return (
      <main id="main-content" className="order-detail">
        <p>Chargement…</p>
      </main>
    );
  if (!order)
    return (
      <main id="main-content" className="order-detail">
        <p>Commande introuvable.</p>
      </main>
    );

  return (
    <main id="main-content" className="order-detail">
      <section aria-label="Détails de la commande" className="order-details">
        <h1>Détails de la commande #{order.id}</h1>

        <div className="order-info">
          <p>Date : {new Date(order.order_date).toLocaleString()}</p>
          <p>Total : {parseFloat(order.total_amount).toFixed(2)} €</p>
          <p>Statut : {order.status}</p>
        </div>

        {/* Affichage des order_items */}
        <div className="order-items">
          <h2>Articles</h2>
          <ul>
            {items.map((it) => (
              <li key={it.product_id} className="order-item">
                <span className="item-name">
                  {it.product_name ?? "Produit supprimé"} × {it.quantity}
                </span>
                <span className="item-price">
                  {it.product_price
                    ? (parseFloat(it.product_price) * it.quantity).toFixed(2)
                    : "–"}{" "}
                  €
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
