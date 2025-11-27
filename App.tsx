import React, { useState, useEffect } from 'react';
import { quizData } from './services/quizData';
import QuizStart from './components/QuizStart';
import QuizQuestion from './components/QuizQuestion';
import QuizSummary from './components/QuizSummary';
import { UserAnswers } from './types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'summary'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const questions = quizData.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    window.scrollTo(0, 0);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setStep('summary');
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Header Component
  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-16">
      <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-2xl tracking-tight text-khan-text">
                <span className="text-khan-green">Simulasi</span>
            </span>
            <span className="hidden sm:inline-block text-gray-300 text-2xl mx-2">|</span>
            <span className="hidden sm:inline-block text-gray-500 font-medium">Ujian Pancasila</span>
        </div>
        {step === 'quiz' && (
             <div className="text-sm font-bold text-gray-500">
                {currentQuestionIndex + 1} / {questions.length}
             </div>
        )}
      </div>
      {step === 'quiz' && (
        <div className="h-1 bg-gray-200 w-full">
            <div 
                className="h-full bg-khan-blue transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
      )}
    </header>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-khan-text font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {step === 'start' && (
          <QuizStart onStart={handleStart} totalQuestions={questions.length} />
        )}

        {step === 'quiz' && (
          <div className="flex flex-col min-h-[60vh] justify-between">
            <QuizQuestion
              question={currentQuestion}
              currentAnswer={userAnswers[currentQuestion.id]}
              onAnswer={handleAnswer}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />

            {/* Navigation Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg md:relative md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className={`flex items-center px-4 py-2 font-bold rounded transition-colors ${
                            currentQuestionIndex === 0 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-khan-blue hover:bg-blue-50'
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Sebelumnya
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-khan-blue hover:bg-khan-darkBlue text-white font-bold py-3 px-8 rounded shadow-sm transition-transform hover:scale-105 active:scale-95 flex items-center"
                    >
                        {currentQuestionIndex === questions.length - 1 ? (
                            <>Selesai <Check className="w-5 h-5 ml-2" /></>
                        ) : (
                            <>Selanjutnya <ChevronRight className="w-5 h-5 ml-2" /></>
                        )}
                    </button>
                </div>
            </div>
             {/* Spacer for fixed footer on mobile */}
             <div className="h-20 md:hidden"></div>
          </div>
        )}

        {step === 'summary' && (
          <QuizSummary
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleStart}
          />
        )}
      </main>
    </div>
  );
}

export default App;