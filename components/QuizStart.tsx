import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import { QuizData } from '../types';

interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-center px-4">
      <div className="mb-8 p-6 rounded-full bg-blue-50">
        <BookOpen className="w-16 h-16 text-khan-blue" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-khan-text mb-4">
        Ujian Kewarganegaraan
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Uji pengetahuanmu tentang Pancasila, Gotong Royong, dan Norma dalam kehidupan bermasyarakat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm">
          <BookOpen className="w-8 h-8 text-khan-blue mb-2" />
          <span className="font-bold text-lg">{totalQuestions} Soal</span>
          <span className="text-sm text-gray-500">Pilihan Ganda & Esai</span>
        </div>
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm">
          <Clock className="w-8 h-8 text-khan-blue mb-2" />
          <span className="font-bold text-lg">~45 Menit</span>
          <span className="text-sm text-gray-500">Estimasi Waktu</span>
        </div>
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm">
          <Award className="w-8 h-8 text-khan-blue mb-2" />
          <span className="font-bold text-lg">Sertifikasi</span>
          <span className="text-sm text-gray-500">Nilai langsung keluar</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="bg-khan-blue hover:bg-khan-darkBlue text-white font-bold py-3 px-12 rounded shadow-sm transition-transform hover:scale-105 active:scale-95 text-lg"
      >
        Mulai Ujian
      </button>
    </div>
  );
};

export default QuizStart;