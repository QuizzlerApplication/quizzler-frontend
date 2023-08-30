import { QuizModalProps } from "./Modal";
import Modal from "./Modal";

export const DeleteQuizModal = ({ isOpen, onClose }:QuizModalProps) => {

    const handleDelete = () => {
        
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-xl font-semibold mb-4">Delete Quiz</h2>
                <p>Are you sure you want to delete this quiz?</p>
                <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={onClose}>
                    Cancel
                </button>
                <button className="bg-green-500 text-white px-4 py-2 mt-4 ml-4" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </Modal>
    );
};