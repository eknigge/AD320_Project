import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import Error from './Error';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name cannot be empty'),
  lastName: Yup.string().required('Last Name cannot be empty'),
  email: Yup.string().email(),
  role: Yup.string().required('Please select a role'),
});

class EditUser extends React.Component {
  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/users.svg" alt="user icon"></img>
            Users
          </h1>
          <Link to="/admin/users">
            <button className="ui button">Back to users</button>
          </Link>

          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              role: '',
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="ui form">
                {`Debug message: ${JSON.stringify(values)}`}
                <h3 className="ui centered dividing header">
                  {this.props.match.params.id
                    ? `Editing User ID - ${this.props.match.params.id}`
                    : 'Creating New User'}
                </h3>
                <div className="two fields">
                  <div
                    className={`field ${
                      touched.firstName && errors.firstName ? `error` : null
                    }`}
                  >
                    <label htmlFor="firstName">First Name</label>
                    <Field as="input" type="text" name="firstName"></Field>
                    <Error
                      touched={touched.firstName}
                      message={errors.firstName}
                    />
                  </div>
                  <div
                    className={`field ${
                      touched.lastName && errors.lastName ? `error` : null
                    }`}
                  >
                    <label htmlFor="lastName">Last Name</label>
                    <Field as="input" type="text" name="lastName"></Field>
                    <Error
                      touched={touched.lastName}
                      message={errors.lastName}
                    />
                  </div>
                </div>
                <div
                  className={`field ${
                    touched.email && errors.email ? `error` : null
                  }`}
                >
                  <label htmlFor="email">Email</label>
                  <Field as="input" type="text" name="email"></Field>
                  <Error touched={touched.email} message={errors.email} />
                </div>
                <div
                  className={`field ${
                    touched.role && errors.role ? `error` : null
                  }`}
                >
                  <label htmlFor="role">Role</label>
                  <Field as="select" name="role">
                    <option value="">select a role</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="VENDOR">Vendor</option>
                    <option value="ADMIN">Admin</option>
                  </Field>
                  <Error touched={touched.role} message={errors.role} />
                </div>
                <button
                  className="ui large green button"
                  type="submit"
                  disabled={
                    !touched.firstName ||
                    !touched.lastName ||
                    !touched.role ||
                    errors.firstName ||
                    errors.lastName ||
                    errors.email ||
                    errors.role ||
                    isSubmitting
                  }
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </Box>
      </AdminMain>
    );
  }
}

export default EditUser;
