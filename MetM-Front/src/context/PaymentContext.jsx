// src/context/PaymentContext.js
import React, { createContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../services/stripe/stripe";

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
