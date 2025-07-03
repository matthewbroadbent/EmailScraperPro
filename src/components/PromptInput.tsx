import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSearch, loading }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSearch();
    }
  };

  const examplePrompt = "Please provide me with up to 50 email addresses of deal sourcers or deal originators or people with similar job functions in a venture capital company based in the UK. The VC should be mid to low tier - not one of the biggest. I would like you to return the data in spreadsheet format with firstname, lastname, jobtitle, emailaddress, companyname, context. The last field provides some background as to why you have returned this email address. You should not return general email addresses such as info@ or admin@ or sourcing@. The should all be corporate email addresses - not @gmail.com. Thank you.";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Describe Your Email Search</h2>
        <button
          onClick={() => setPrompt(examplePrompt)}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Use Example
        </button>
      </div>
      
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe the type of professionals you're looking for, their job functions, company criteria, location, and any specific requirements..."
          className="w-full h-40 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-sm"
          disabled={loading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          Ctrl + Enter to search
        </div>
      </div>

      <button
        onClick={onSearch}
        disabled={loading || !prompt.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Emails...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 mr-2" />
            Generate Email List
          </>
        )}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Our AI will optimize your prompt for better results and token efficiency
      </p>
    </div>
  );
};

export default PromptInput;
