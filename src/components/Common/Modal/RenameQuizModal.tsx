import { useState } from "react";
import { QuizModalProps } from "./Modal";
import Modal from "./Modal";
import { renameQuiz } from "@/api/quizData";

export const RenameQuizModal = ({quizId, isOpen, onClose }:QuizModalProps) => {

    const [newTitle, setNewTitle] = useState('');

    const handleRename = (id:string , title:string) => {
        renameQuiz(id, title)
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
                <button className="bg-red-500 text-white px-4 py-2 mt-4" 
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4" 
                    onClick={()=>handleRename(quizId, newTitle )}
                >
                    Rename
                </button>
            </div>
        </Modal>
    );
};