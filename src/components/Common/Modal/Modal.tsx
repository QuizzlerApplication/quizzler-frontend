import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export interface QuizModalProps{
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }:ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-75">
                    
                </div>
            </div>
            <div className="bg-white rounded-lg p-6 z-20">
                {children}
            </div>
        </div>
    );
};

export const DeleteQuizModal = ({ isOpen, onClose }:QuizModalProps) => {

    const handleDelete = () => {
        // Call a function to update the quiz title with newTitle
        // ... //
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

export const RenameQuizModal = ({ isOpen, onClose }:QuizModalProps) => {
    const [newTitle, setNewTitle] = useState('');

    const handleRename = () => {
        // Call a function to update the quiz title with newTitle
        // ...
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-xl font-semibold mb-4">Rename Quiz</h2>
                <input
                    type="text"
                    placeholder="New Quiz Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border rounded p-2 mb-4 w-full"
                />
                <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={onClose}>
                    Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4" onClick={handleRename}>
                    Rename
                </button>
            </div>
        </Modal>
    );
};


export default Modal;
