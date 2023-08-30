import React from 'react'
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { QuizModalProps } from './Modal';


const EditQuizModal = ({ quizId, isOpen, onClose }: QuizModalProps) => {

    const handleEditQuestion = async () => {
        try {
            
        } catch (error) {
            // Handle error if needed
            console.error("Error deleting quiz:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-xl font-semibold mb-4">Delete Quiz</h2>
                <p>Are you sure you want to delete this quiz?</p>
                <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={onClose}>
                    Cancel
                </button>
                <button className="bg-green-500 text-white px-4 py-2 mt-4 ml-4" onClick={handleEditQuestion}>
                    Delete
                </button>
            </div>
        </Modal>
    )
}

export default EditQuizModal