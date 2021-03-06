import ReactDOM from 'react-dom';

const Modal = (props) => {
    return ReactDOM.createPortal(
        props.children,
        document.querySelector('#popup-modal')
    );
};

export default Modal;
