// src/services/contactService.js
import { sendContactForm } from "@/api/contactApi";

/**
 * Envoie les données du formulaire de contact au back.
 * @param {{ name:string, email:string, subject:string, message:string }} data
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitContactForm(data) {
  return sendContactForm(data);
}
