import React from 'react';
import { Link } from 'react-router-dom';
import LogsTableRow from './AdminLogsTableRow';

class LogsTable extends React.Component {
  renderLogs() {
    if (this.props.apiResponse.length > 0) {
      const allLogs = this.props.apiResponse.map((log) => {
        let time = new Date(log.EPOCH * 1000).toLocaleString();
        return (
          <LogsTableRow
            key={log.LOG_ITEM_ID}
            logID={log.LOG_ITEM_ID}
            userID={log.USER_ID}
            userName={`${log.FIRST_NAME} ${log.LAST_NAME}`}
            event={log.EVENT}
            time={time}
          />
        );
      });
      return <tbody>{allLogs}</tbody>;
    }
  }

  render() {
    return (
      <table className="ui striped stackable table">
        <thead>
          <tr>
            <th className="collapsing">Log ID</th>
            <th className="collapsing">User (id-name)</th>
            <th className="center aligned">Event</th>
            <th>Time</th>
          </tr>
        </thead>
        {this.renderLogs()}
        <tfoot className="full-width">
          <tr>
            <th colSpan="4">
              <button
                className="ui medium button"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default LogsTable;
