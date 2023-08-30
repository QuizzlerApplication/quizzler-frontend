import create from 'zustand';
import { Question } from '@/models/quizzes';

type State = {
  editQuestionData: Question | null; // Replace 'Question' with your actual type
  editQuizId: string;
};

type Actions = {
  setEditQuestionData: (data: Question | null) => void; // Replace 'Question' with your actual type
  setEditQuizId: (quizId: string) => void;
};

export const useQuestionStore = create<State & Actions>((set) => ({
  editQuestionData: null,
  editQuizId: '',
  setEditQuestionData: (data) => set({ editQuestionData: data }),
  setEditQuizId: (quizId) => set({ editQuizId: quizId }),
}));
