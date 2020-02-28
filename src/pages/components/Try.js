import React from 'react';
import { useFormik } from 'formik';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.link) {
    errors.link = 'Required';
  } else if (values.link.length > 20) {
    errors.link = 'Must be 20 characters or less';
  }

/*   if (!values.description) {
    errors.description = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.description)) {
    errors.description = 'Invalid email address';
  } */

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 15) {
    errors.description = 'Must be 15 characters or less';
  }

  return errors;
};

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      name: '',
      link: '',
      description: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      <label htmlFor="link">Link</label>
      <input
        id="link"
        name="link"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.link}
      />
      {formik.errors.link ? <div>{formik.errors.link}</div> : null}
      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.errors.description ? <div>{formik.errors.description}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;