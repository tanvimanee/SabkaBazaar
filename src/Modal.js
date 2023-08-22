import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Added to Cart"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Item Added to Cart</h2>
        <p>Your item has been successfully added to the cart!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default CustomModal;
