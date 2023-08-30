import { useRouter } from "next/router"; // Import the useRouter hook
import { QuizModalProps } from "./Modal";
import Modal from "./Modal";
import { deleteQuiz } from "@/api/quizData";

export const DeleteQuizModal = ({ quizId, isOpen, onClose }: QuizModalProps) => {
    const router = useRouter(); // Initialize the useRouter hook

    const handleDelete = async () => {
        try {
            await deleteQuiz(quizId); // Assuming deleteQuiz returns a promise or can be awaited
            onClose();
            router.push("/dashboard"); // Redirect to the dashboard after successful deletion
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
                <button className="bg-green-500 text-white px-4 py-2 mt-4 ml-4" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </Modal>
    );
};
