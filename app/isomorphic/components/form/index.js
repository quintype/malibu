import React, { useState, useEffect } from "react";
import { string } from "prop-types";

const Form = ({ formioUrl }) => {
  const [Formio, setFormComponent] = useState({});
  useEffect(() => {
    // SSR is not supported by react-formio
    import(/* webpackChunkName: "qtc-react-formio" */ "react-formio")
      .then(Formio => {
        setFormComponent({ component: Formio.Form });
      })
      .catch(error => console.error("Error loading formio component", error));
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css" />
      {Formio.component && <Formio.component src={formioUrl} />}
    </>
  );
};

Form.propTypes = {
  formioUrl: string
};

export { Form };
