import React from 'react';
import { Mail, Building, User, Briefcase } from 'lucide-react';
import type { EmailResult } from '../types';

interface ResultsDisplayProps {
  results: EmailResult[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {result.firstName} {result.lastName}
                  </p>
                  <p className="text-gray-400 text-sm flex items-center">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {result.jobTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Building className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-gray-300">{result.companyName}</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <a
                  href={`mailto:${result.emailAddress}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-mono"
                >
                  {result.emailAddress}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium text-sm">Context</h4>
              <p className="text-gray-300 text-sm bg-black/20 rounded-lg p-3 leading-relaxed">
                {result.context}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;
