import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import Error from './Error';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  lat: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(-90, 'Latitude cannot be less than -90')
    .max(90, 'Latitude cannot be more than 90')
    .required('Latitude cannot be empty, must be a valid number'),
  lng: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(-180, 'Longitude cannot be less than -180')
    .max(180, 'Longitude cannot be more than 180')
    .required('Longitude cannot be empty, must be a valid number'),
  menuID: Yup.number().required('Please select a menu'),
});

class EditCart extends React.Component {
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
      fetch(`http://localhost:5000/admin/carts/edit/${id}`)
        .then((res) => res.json())
        .then((res) => this.setState({ apiResponse: res }))
        .catch((error) => console.log(error));
    } else if (this.props.match.url === '/admin/carts/new') {
      fetch(`http://localhost:5000/admin/carts/new`)
        .then((res) => res.json())
        .then((res) => this.setState({ apiResponse: res }))
        .catch((error) => console.log(error));
    }
  }

  renderAllMenus() {
    if (this.state.apiResponse.allMenus) {
      return this.state.apiResponse.allMenus.map((menuID) => (
        <option key={menuID} value={`${menuID}`}>
          {menuID}
        </option>
      ));
    }
  }

  renderVacantVendors() {
    if (this.state.apiResponse.vendors) {
      return this.state.apiResponse.vendors.map((vendor) => (
        <option key={vendor.User_ID} value={`${vendor.User_ID}`}>
          {`${vendor.User_ID}-${vendor.First_Name} ${vendor.Last_Name}`}
        </option>
      ));
    }
  }

  // TODO: add error message display
  sendRequest(values) {
    if (this.props.match.url === '/admin/carts/new') {
      fetch(`http://localhost:5000/admin/carts/new`, {
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
        `http://localhost:5000/admin/carts/edit/${this.props.match.params.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartID: parseInt(this.props.match.params.id),
            ...values,
          }),
        }
      )
        .then((res) => res.text())
        .then((res) => {
          this.setState({ formSuccess: true, resMessage: res });
        })
        .catch((err) => console.log(err));
    }
  }
  refreshPage() {
    window.location.reload();
  }

  render() {
    const { lat, lng, status, menuID, vendorID } = this.state.apiResponse;

    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/hot-dog-cart.svg" alt="cart"></img>
            Carts
          </h1>
          <Link to="/admin/carts">
            <button className="ui button">Back to carts</button>
          </Link>
          <button
            onClick={this.refreshPage}
            className="ui inverted primary button"
          >
            Refresh
          </button>
          <Box>
            <p>
              Useful Link:{' '}
              <a
                href="https://www.latlong.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Latitude & Longitude from address
              </a>
            </p>
          </Box>

          <div
            className={`ui success message ${
              this.state.formSuccess ? null : `hidden`
            }`}
          >
            <h4 className="header">{this.state.resMessage}</h4>
            <p>
              Refresh the page or go back to the carts page to see the latest
              changes
            </p>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={{
              lat: lat || '',
              lng: lng || '',
              menuID: menuID || '',
              vendorID: vendorID || '',
              status: status || false,
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
              <form className={`ui form`} onSubmit={handleSubmit}>
                {/* {`Debug message: ${JSON.stringify(values)}`} */}
                <h3 className="ui centered dividing header">
                  {this.props.match.params.id
                    ? `Editing Cart ID - ${this.props.match.params.id}`
                    : 'Creating New Cart'}
                </h3>
                <div className="two fields">
                  <div
                    className={`field ${
                      touched.lat && errors.lat ? `error` : null
                    }`}
                  >
                    <label htmlFor="lat">Latitude</label>
                    <Field
                      as="input"
                      type="text"
                      name="lat"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lat}
                    ></Field>
                    <Error touched={touched.lat} message={errors.lat} />
                  </div>
                  <div
                    className={`field ${
                      touched.lng && errors.lng ? `error` : null
                    }`}
                  >
                    <label htmlFor="lng">Longitude</label>
                    <Field
                      as="input"
                      type="text"
                      name="lng"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lng}
                    ></Field>
                    <Error touched={touched.lng} message={errors.lng} />
                  </div>
                </div>
                <div className="two fields">
                  <div
                    className={`field ${
                      touched.menuID && errors.menuID ? `error` : null
                    }`}
                  >
                    <label>Menu ID</label>
                    <Field as="select" name="menuID">
                      <option value="">assign a menu</option>
                      {this.renderAllMenus()}
                    </Field>
                    <Error touched={touched.menuID} message={errors.menuID} />
                  </div>
                  <div className="field">
                    <label>(Optional) Vendor ID</label>
                    <Field as="select" name="vendorID">
                      <option value="">(Optional) assign a vendor</option>
                      {this.renderVacantVendors()}
                      <option
                        value="remove"
                        style={{ color: 'crimson', fontStyle: 'italic' }}
                      >
                        Release vendor from this cart
                      </option>
                    </Field>
                  </div>
                </div>
                <div className="field">
                  <label>Status</label>
                  <div className="inline field">
                    <div className="ui toggle checkbox">
                      <Field type="checkbox" name="status" />
                      <label>{`${
                        values.status ? `Available` : `Unavailable`
                      }`}</label>
                    </div>
                  </div>
                </div>
                <button
                  className="ui large green button"
                  type="submit"
                  disabled={
                    !touched.lat ||
                    !touched.lng ||
                    !touched.menuID ||
                    errors.lat ||
                    errors.lng ||
                    errors.menuID ||
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

export default EditCart;
