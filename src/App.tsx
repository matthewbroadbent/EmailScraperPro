import React, { useState } from 'react';
import { Mail, Sparkles, Download, Search, Users, Target, Zap } from 'lucide-react';
import PromptInput from './components/PromptInput';
import ResultsDisplay from './components/ResultsDisplay';
import ApiKeyModal from './components/ApiKeyModal';
import { optimizePrompt } from './utils/promptOptimizer';
import { generateEmails } from './utils/openaiService';
import type { EmailResult } from './types';

function App() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<EmailResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }

    setLoading(true);
    try {
      const optimized = optimizePrompt(prompt);
      setOptimizedPrompt(optimized);
      
      const emailResults = await generateEmails(optimized, apiKey);
      setResults(emailResults);
    } catch (error) {
      console.error('Error generating emails:', error);
      alert('Error generating emails. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (results.length === 0) return;

    const headers = ['First Name', 'Last Name', 'Job Title', 'Email Address', 'Company Name', 'Context'];
    const csvContent = [
      headers.join(','),
      ...results.map(result => [
        result.firstName,
        result.lastName,
        result.jobTitle,
        result.emailAddress,
        result.companyName,
        `"${result.context}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75"></div>
                  <div className="relative bg-white p-4 rounded-full">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
                EmailScraper <span className="gradient-text">Pro</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up">
                AI-powered email discovery with intelligent prompt optimization for maximum accuracy and results
              </p>
            </div>
          </div>
        </header>

        {/* Features */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI Optimization</h3>
                <p className="text-gray-300 text-sm">Automatically optimizes your prompts for better AI understanding and results</p>
              </div>
              <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Precise Targeting</h3>
                <p className="text-gray-300 text-sm">Find specific professionals with detailed job functions and company criteria</p>
              </div>
              <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Instant Export</h3>
                <p className="text-gray-300 text-sm">Export results to CSV format ready for your CRM or outreach tools</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="glass-effect rounded-3xl p-8 mb-8">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>

          {optimizedPrompt && (
            <div className="glass-effect rounded-2xl p-6 mb-8 animate-slide-up">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                Optimized Prompt
              </h3>
              <p className="text-gray-300 text-sm bg-black/20 rounded-lg p-4 font-mono">
                {optimizedPrompt}
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="glass-effect rounded-3xl p-8 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Results ({results.length})
                </h2>
                <button
                  onClick={exportToCSV}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
              <ResultsDisplay results={results} />
            </div>
          )}
        </main>
      </div>

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSave={setApiKey}
      />
    </div>
  );
}

export default App;
