import React, { Component } from 'react';

export default class Modal extends Component {
  constructor() {
    super();

    this.state = {
      show: false
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { show } = this.props;

    if (show) {
      this.setState({ show: true });
      document.body.classList.add('no-scroll');
    } else {
      this.setState({ show: false });
      document.body.classList.remove('no-scroll');
    }

    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const ESCAPE_KEY = 27;
    switch (e.keyCode) {
      case ESCAPE_KEY:
        this.setState({ show: false });
        break;
      default:
        break;
    }
  }

  onCloseModal(e) {
    e.preventDefault();

    this.setState({ show: false });
    document.body.classList.remove('no-scroll');
  }

  onShowModal(e) {
    e.preventDefault();

    this.setState({ show: true });
    document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.body.classList.remove('no-scroll');
  }

  render() {
    const { show } = this.state;
    const { buttonText, closeText, heading } = this.props;
    return (
      <>
        {buttonText && (
          <button className="modal-btn" onClick={this.onShowModal}>
            {buttonText}
          </button>
        )}

        <div className={show ? `modal show` : `modal`}>
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="heading">{heading}</h2>
                <button className="close-modal" onClick={this.onCloseModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="modal-body">{this.props.children}</div>

              <div className="modal-footer">
                <button className="btn-main" onClick={this.onCloseModal}>
                  {closeText ? closeText : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
