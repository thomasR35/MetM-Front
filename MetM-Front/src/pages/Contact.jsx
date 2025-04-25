import React, { useState } from "react";
import { sendContactForm } from "@/api/contactApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const result = await sendContactForm(formData);
    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
      console.error(result.message);
    }
  };

  return (
    <main className="contact-page" role="main" aria-labelledby="contact-title">
      <h1 id="contact-title">Contactez-nous</h1>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        aria-describedby="form-status"
        noValidate
      >
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
              required
              value={formData.name}
              onChange={handleChange}
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
              required
              value={formData.email}
              onChange={handleChange}
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
              required
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
              required
              rows={6}
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

        <div
          id="form-status"
          role="status"
          aria-live="polite"
          className="form-status"
        >
          {status === "success" && (
            <p className="success-message">Votre message a bien été envoyé !</p>
          )}
          {status === "error" && (
            <p className="error-message">
              Une erreur est survenue lors de l’envoi. Merci de réessayer.
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default Contact;
