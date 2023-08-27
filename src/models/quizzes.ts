interface Question {
    _id: string;
    questionTitle: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizData {
    _id: string;
    quizTitle: string;
    questions: Question[];
    __v: number;
}