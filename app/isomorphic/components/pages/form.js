import React from "react";
import { shape, string } from "prop-types";

import { Form } from "../form";

const FormPage = props => {
  const { headline, subheadline, status, "formio-url": formioUrl } = props.data.form;
  const isClosed = status === "closed";
  return (
    <div className="container">
      <h1>{headline}</h1>
      <h2>{subheadline}</h2>
      {isClosed && <p>The form is closed for submissions.</p>}
      <Form formioUrl={formioUrl} disabled={isClosed} />
    </div>
  );
};

FormPage.propTypes = {
  data: shape({
    form: {
      "formio-url": string,
      headline: string,
      subheadline: string,
      status: string
    }
  })
};

export { FormPage };
