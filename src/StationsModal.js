import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

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
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#FDFDFD',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 'auto',
      margin: '0 auto',
      padding: 30
    };

    const buttonStyle = {
      backgroundColor: '#074481',
      padding: '10px 16px',
      border: '1px solid white',
      borderRadius: '10px',
      color: '#FEFEFE'
    }

    return (

      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}
          <div id="modalContent">
            <p>Station Name: {this.props.content.name}</p>
            <p>Address: {this.props.content.address}</p>
            <p>City: {this.props.content.city}</p>
            <p>Country: {this.props.content.country}</p>
          </div>

          <div className="footer">
            <button id="close" ref="closeBtn" onClick={this.props.onClose} style={buttonStyle}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
