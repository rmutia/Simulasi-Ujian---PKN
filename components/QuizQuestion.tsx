import React from 'react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  currentAnswer: string | undefined;
  onAnswer: (answer: string) => void;
  questionIndex: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentAnswer,
  onAnswer,
  questionIndex,
  totalQuestions,
}) => {
  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Chapter & Difficulty Header */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4 uppercase tracking-wide font-bold">
        <span>{question.chapter}</span>
        <span className={`px-2 py-0.5 rounded text-xs text-white ${
          question.difficulty === 'hard' ? 'bg-red-400' : 
          question.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
        }`}>
          {question.difficulty}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-10 shadow-sm mb-6">
        <h2 className="text-2xl font-serif text-khan-text mb-8 leading-relaxed">
          {question.question}
        </h2>

        {question.type === 'multiple_choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = currentAnswer === option;
              return (
                <div
                  key={index}
                  onClick={() => onAnswer(option)}
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    flex items-center group
                    ${isSelected 
                      ? 'border-khan-blue bg-blue-50 shadow-inner' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center
                    ${isSelected ? 'border-khan-blue bg-khan-blue' : 'border-gray-400 group-hover:border-gray-500'}
                  `}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-lg text-gray-800">{option}</span>
                </div>
              );
            })}
          </div>
        )}

        {question.type === 'essay' && (
          <div className="space-y-4">
            <textarea
              value={currentAnswer || ''}
              onChange={(e) => onAnswer(e.target.value)}
              placeholder="Ketik jawabanmu di sini..."
              className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-khan-blue focus:ring-0 text-lg resize-none"
            />
            <p className="text-sm text-gray-500 italic">
              *Jawaban esai akan diperiksa secara manual oleh guru.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;