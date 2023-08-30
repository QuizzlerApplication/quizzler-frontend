export interface Question {
    _id: string;
    questionTitle: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizData {
    __v: number;
    _id: string;
    quizTitle: string;
    questions: Question[];
    numberOfCorrectQuestions: number;
    numberOfQuestions: number;
}

export interface Answer {
    answerText: string;
    isCorrect: boolean;
}