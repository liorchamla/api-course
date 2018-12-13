import React from "react";
import { Link } from "react-router-dom";

const FormFooter = ({ submitLabel, returnLabel, returnUrl }) => {
  return (
    <div className="form-group">
      <button type="submit" className="btn btn-success">
        {submitLabel}
      </button>
      {returnLabel && returnUrl && (
        <Link className="btn btn-link" to={returnUrl}>
          {returnLabel}
        </Link>
      )}
    </div>
  );
};

export default FormFooter;
