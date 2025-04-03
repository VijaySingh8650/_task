
type TypeOfPageProps = {
    isOpen: boolean,
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<TypeOfPageProps> = ({ isOpen, onClose, title, children }) => {
    
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
