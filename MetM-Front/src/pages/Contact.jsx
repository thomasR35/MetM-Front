// src/pages/Contact.jsx
//=====================================
import React from "react";
import { useContactForm } from "@/hooks/contactPage/useContactForm";
import "../styles/pages/_contact.scss";

export default function Contact() {
  const { formData, status, error, handleChange, handleSubmit } =
    useContactForm();

  return (
    <main
      id="main-content"
      role="main"
      className="contact-page"
      aria-labelledby="contact-title"
    >
      <h1 id="contact-title">Contactez-nous</h1>

      {/* Notifications de statut */}
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

        {/* Coordonnées */}
        <fieldset>
          <legend>Vos coordonnées</legend>

          <div className="form-group">
            <label htmlFor="contact-name">
              Nom <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.name}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.email}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Détails de la demande */}
        <fieldset>
          <legend>Détails de la demande</legend>

          <div className="form-group">
            <label htmlFor="contact-subject">
              Objet <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.subject}
              value={formData.subject}
              onChange={handleChange}
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
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.message}
              value={formData.message}
              onChange={handleChange}
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
