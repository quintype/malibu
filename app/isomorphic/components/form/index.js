import React, { useState, useEffect } from "react";
import { string, bool } from "prop-types";

const Form = ({ formioUrl, disabled }) => {
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
    <div className={`bootstrap container`}>
      <link
        rel="stylesheet"
        href="https://toert.github.io/Isolated-Bootstrap/versions/4.1.0/iso_bootstrap4.1.0min.css"
      />
      <link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css" />
      {Formio.component && <Formio.component src={formioUrl} options={{ readOnly: disabled }} />}
    </div>
  );
};

Form.propTypes = {
  formioUrl: string,
  disabled: bool
};

export { Form };
