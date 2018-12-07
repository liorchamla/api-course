import React from "react";

import { Link } from "react-router-dom";

const ClientDisplay = ({ client }) => {
  return (
    <Link to={`/clients/${client.id}`} className="d-flex align-items-center">
      <img src={client.avatar} alt="" className="avatar" /> {client.firstName}{" "}
      {client.lastName}
    </Link>
  );
};

export default ClientDisplay;
