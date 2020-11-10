import React from "react";
import { shape, string } from "prop-types";

import { Form } from "../form";

const FormPage = props => {
  return (
    <div>
      <h1>{props.data.form.headline}</h1>
      <h2>{props.data.form.subheadline}</h2>
      <Form formioUrl={props.data.form["formio-url"]} />
    </div>
  );
};

FormPage.propTypes = {
  data: shape({
    form: {
      "formio-url": string,
      headline: string,
      subheadline: string
    }
  })
};

export { FormPage };
