
const ModalWindow: React.FC<{content: React.ReactNode}> = ({content}) => {
    
    return (
        <div className="modal">
            <div className="modal-content">
                {content}
            </div>
        </div>
    );
};

export default ModalWindow;
