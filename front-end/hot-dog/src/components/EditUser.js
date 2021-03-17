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
  email: Yup.string(),
  role: Yup.string().required('Please select a role'),
});

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      formSuccess: false,
      resMessage: '',
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    let id = this.props.match.params.id;
    if (!isNaN(id)) {
      fetch(`http://localhost:5000/admin/users/edit/${id}`)
        .then((res) => res.json())
        .then((res) => this.setState({ apiResponse: res }))
        .catch((error) => console.log(error));
    }
  }

  sendRequest(values) {
    if (this.props.match.url === '/admin/users/new') {
      fetch(`http://localhost:5000/admin/users/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((res) => res.text())
        .then((res) => {
          this.setState({ formSuccess: true, resMessage: res });
        })
        .catch((err) => console.log(err));
    } else {
      fetch(
        `http://localhost:5000/admin/users/edit/${this.props.match.params.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: parseInt(this.props.match.params.id),
            ...values,
          }),
        }
      )
        .then((res) => res.text())
        .then((res) => {
          this.setState({ formSuccess: true, resMessage: res }, () =>
            console.log(res)
          );
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { First_Name, Last_Name, Email, Permission } = this.state.apiResponse;

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

          <div
            className={`ui success message ${
              this.state.formSuccess ? null : `hidden`
            }`}
          >
            <h4 className="header">{this.state.resMessage}</h4>
            <p>Go back to the users page to see the latest changes</p>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: First_Name || '',
              lastName: Last_Name || '',
              email: Email || '',
              role: Permission || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              this.sendRequest(values);
              resetForm();
              setSubmitting(false);
            }}
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
              <form className="ui form" onSubmit={handleSubmit}>
                {/* {`Debug message: ${JSON.stringify(values)}`} */}
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
