import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  state = {
    status: '',
  }

  componentDidMount() {
    // handles the closing of the modal on Enter or Escape for better UX
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 || e.keyCode === 13) {
        this.props.onClose();
      }
    });
  }


  // this will pass the focus to the modal once the component updates
  componentDidUpdate() {
    if (this.props.isOpen) {
      var closeBtn = this.refs.closeBtn
      closeBtn.focus()
    }
  }

  getCurrentTime() {
    const today = new Date();
    const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timezone = today.getTimezoneOffset();
      return `${date} ${time}  (GMT -${timezone/60+1})`;
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10
    };

    const southboundStyle = {
      marginTop: "24px"
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal">
          {this.props.children}
          <div id="modalContent">
            <p>Station Name: <span className="grey">{this.props.content.name}</span></p>
            <p>Address: <span className="grey">{this.props.content.address}</span></p>
            <p>City: <span className="grey">{this.props.content.city}</span></p>
            <p>Country: <span className="grey">{this.props.content.country}</span></p>
            <p>Time of Query: <span className="grey">{this.getCurrentTime()}</span></p>
            { this.props.trainInfo.length > 0 ?
              <div>
                <table>
                  <tbody>
                    <tr>
                      <th colSpan="5">Northbound</th>
                    </tr>
                    <tr>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Due In</th>
                      <th>Train Type</th>
                    </tr>
                    { (!this.props.trainInfo) ? console.log('ERROR') :
                      this.props.trainInfo.map( train => {
                        if (train.direction === "Northbound") {
                          return train =
                          <tr key={Math.random(5090897439)}>
                             <td style={{background: '#555'}}>{train.Origin}</td>
                             <td style={{background: '#3a3a3a'}}>{train.Destination}</td>
                             <td style={{background: '#555'}}>{train.expectedArrival} min</td>
                             <td style={{background: '#3a3a3a'}}>{train.trainType}</td>
                           </tr>
                        }
                       })
                    }
                  </tbody>
                </table>
                <table style={southboundStyle}>
                  <tbody>
                    <tr>
                      <th colSpan="5">SouthBound</th>
                    </tr>
                    <tr>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Due In</th>
                      <th>Train Type</th>
                    </tr>
                    {
                      this.props.trainInfo.map( train => {
                        if (train.direction === "Southbound") {
                          return train =
                          <tr key={Math.random(5090897439)}>
                             <td style={{background: '#555'}}>{train.Origin}</td>
                             <td style={{background: '#3a3a3a'}}>{train.Destination}</td>
                             <td style={{background: '#555'}}>{train.expectedArrival} min</td>
                             <td style={{background: '#3a3a3a'}}>{train.trainType}</td>
                           </tr>
                        }
                       })
                    }
                  </tbody>
                </table>
              </div>
              : <div>{this.props.content.status}</div> }
              <div className="footer">
                <button id="close" ref="closeBtn" onClick={this.props.onClose} style={{float: 'right'}}>
                  Close
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.object
};

export default Modal;
