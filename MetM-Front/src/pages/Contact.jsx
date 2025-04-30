// src/pages/Contact.jsx
import React, { useState } from "react";
import { sendContactForm } from "@/api/contactApi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [error, setError] = useState(""); // message d’erreur général

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const result = await sendContactForm(formData);
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.message || "Erreur serveur");
      }
    } catch (err) {
      setStatus("error");
      setError(err.message);
      console.error("Contact form error:", err);
    }
  };

  return (
    <main
      id="main-content"
      role="main"
      className="contact-page"
      aria-labelledby="contact-title"
    >
      <h1 id="contact-title">Contactez-nous</h1>

      {/* zone de notification de statut */}
      <div id="form-status" role="status" aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <p className="success-message">
            👍 Votre message a bien été envoyé !
          </p>
        )}
        {status === "error" && (
          <p className="error-message">⚠️ Une erreur est survenue : {error}</p>
        )}
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        aria-labelledby="contact-form-title"
        aria-describedby="form-status"
        noValidate
      >
        <h2 id="contact-form-title" className="sr-only">
          Formulaire de contact
        </h2>

        <fieldset>
          <legend>Vos coordonnées</legend>

          <div className="form-group">
            <label htmlFor="contact-name">
              Nom <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.email}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Détails de la demande</legend>

          <div className="form-group">
            <label htmlFor="contact-subject">
              Objet <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.subject}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.message}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="form-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi en cours…" : "Envoyer"}
        </button>
      </form>
    </main>
  );
}
