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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <main className="contact-page">
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Nom :
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email :
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Objet :
          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
          />
        </label>

        <label className="message-label">
          Message :
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </label>

        <button
          type="submit"
          className="form-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer"}
        </button>

        {status === "success" && (
          <p className="success-message">Message envoyé !</p>
        )}
        {status === "error" && (
          <p className="error-message">Erreur lors de l'envoi.</p>
        )}
      </form>
    </main>
  );
};

export default Contact;
