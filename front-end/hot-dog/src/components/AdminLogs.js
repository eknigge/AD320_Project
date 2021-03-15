import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import LogsTable from './AdminLogsTable';

class AdminLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch('http://localhost:5000/admin/logs')
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/logs.svg" alt="logs icon"></img>
            Logs
          </h1>
          <Box>
            <label>Pick a user to see their logs</label>
            <select>
              <option>All users</option>
              <option>1</option>
              <option>2</option>
            </select>
          </Box>
          <LogsTable apiResponse={this.state.apiResponse}></LogsTable>
        </Box>
      </AdminMain>
    );
  }
}

export default AdminLogs;
