// src/pages/OrdersHistoryPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "@/api/orders";
import "@/styles/pages/_ordersHistory.scss";

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders()
      .then((ords) => setOrders(ords))
      .catch((err) => console.error("❌ Erreur fetchMyOrders :", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main id="main-content" role="main" className="orders-history">
        <h1>Mes commandes</h1>
        <p role="status" aria-live="polite">
          Chargement de l’historique de vos commandes…
        </p>
      </main>
    );
  }

  return (
    <main id="main-content" role="main" className="orders-history">
      <h1>Mes commandes</h1>

      {orders.length === 0 ? (
        <p role="alert">Vous n’avez pas encore passé de commande.</p>
      ) : (
        <section aria-label="Liste des commandes">
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-info">
                  <h2>Commande #{order.id}</h2>
                  <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Total : {order.total.toFixed(2)} €</p>
                </div>
                <Link
                  to={`/order/${order.id}`}
                  className="details-link"
                  aria-label={`Voir les détails de la commande ${order.id}`}
                >
                  Détails
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
