import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle, XCircle, AlertCircle, RefreshCcw } from 'lucide-react';
import { Question, UserAnswers } from '../types';

interface QuizSummaryProps {
  questions: Question[];
  userAnswers: UserAnswers;
  onRestart: () => void;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ questions, userAnswers, onRestart }) => {
  // Calculate Scores
  const mcQuestions = questions.filter(q => q.type === 'multiple_choice');
  const essayQuestions = questions.filter(q => q.type === 'essay');
  
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  mcQuestions.forEach(q => {
    const userAnswer = userAnswers[q.id];
    if (!userAnswer) {
      unansweredCount++;
    } else if (userAnswer === q.answer_key) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalScore = Math.round((correctCount / mcQuestions.length) * 100);

  const data = [
    { name: 'Benar', value: correctCount, color: '#00a60e' },
    { name: 'Salah', value: incorrectCount, color: '#d92916' },
    { name: 'Kosong', value: unansweredCount, color: '#717171' },
  ].filter(item => item.value > 0);

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Ringkasan Hasil</h2>
        <p className="text-gray-500 mb-8">Pilihan Ganda Dinilai Otomatis</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-48 h-48 relative flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-4xl font-bold text-gray-800">{totalScore}%</span>
                    <span className="text-xs text-gray-500 uppercase font-bold">Akurasi</span>
                </div>
            </div>

            <div className="text-left space-y-4">
                <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-khan-green mr-3" />
                    <div>
                        <p className="font-bold text-xl">{correctCount}</p>
                        <p className="text-sm text-gray-500">Jawaban Benar</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <XCircle className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                        <p className="font-bold text-xl">{incorrectCount}</p>
                        <p className="text-sm text-gray-500">Jawaban Salah</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-gray-500 mr-3" />
                    <div>
                        <p className="font-bold text-xl">{essayQuestions.length}</p>
                        <p className="text-sm text-gray-500">Esai (Menunggu Review)</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-700">Detail Jawaban</h3>
        </div>
        <div className="divide-y divide-gray-100">
            {questions.map((q, idx) => {
                const userAnswer = userAnswers[q.id];
                const isCorrect = userAnswer === q.answer_key;
                
                if (q.type === 'multiple_choice') {
                    return (
                        <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    {isCorrect ? (
                                        <CheckCircle className="w-6 h-6 text-khan-green" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Soal {idx + 1} • {q.chapter}</div>
                                    <p className="text-gray-800 font-medium mb-3">{q.question}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                            <span className="block text-xs font-bold uppercase mb-1 opacity-70">Jawabanmu</span>
                                            {userAnswer || <span className="italic text-gray-400">Tidak dijawab</span>}
                                        </div>
                                        {!isCorrect && (
                                             <div className="p-3 rounded border bg-green-50 border-green-200">
                                                <span className="block text-xs font-bold uppercase mb-1 opacity-70">Jawaban Benar</span>
                                                {q.answer_key}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors bg-blue-50/30">
                             <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <AlertCircle className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Esai {idx + 1} • {q.chapter}</div>
                                    <p className="text-gray-800 font-medium mb-3">{q.question}</p>
                                    <div className="p-4 bg-white border border-gray-200 rounded text-gray-600 italic">
                                        "{userAnswer || 'Tidak dijawab'}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
            onClick={onRestart}
            className="flex items-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded shadow-lg transition-transform hover:scale-105"
        >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Ulangi Ujian
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;