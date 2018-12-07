import React from "react";
import moment from "moment";

export const formatAmount = amount => `${amount.toLocaleString("ft-FR")} €`;

export const formatInvoiceStatus = status => {
  const STATUS_CLASSES = {
    paid: "success",
    sent: "primary",
    canceled: "secondary",
    late: "danger"
  };

  const STATUS_LABELS = {
    paid: "Payée",
    sent: "Envoyée",
    canceled: "Annulée",
    late: "En retard"
  };

  return (
    <span className={`badge badge-${STATUS_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
};

export const formatDate = date => {
  return moment(date).format("DD/MM/YYYY");
};

export default {
  amount: formatAmount,
  invoiceStatus: formatInvoiceStatus,
  date: formatDate
};
