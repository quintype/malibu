import React, { useState, useEffect } from "react";
import { string } from "prop-types";

import styles from "./styles.m.css";

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
    <div className={`bootstrap ${styles["form-container"]}`}>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link
        rel="stylesheet"
        href="https://toert.github.io/Isolated-Bootstrap/versions/4.0.0-beta/iso_bootstrap4.0.0min.css"
      />
      <link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css" />
      {Formio.component && <Formio.component src={formioUrl} />}
    </div>
  );
};

Form.propTypes = {
  formioUrl: string
};

export { Form };
