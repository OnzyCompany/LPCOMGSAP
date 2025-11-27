import React, { useState } from 'react';
import { generateImage, fastGenerate } from '../services/geminiService';
import { ImageSize } from '../types';
import { Download, Loader2, Sparkles, Wand2, Zap } from 'lucide-react';

const ImageGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setGeneratedUrl(null);
    try {
      const url = await generateImage(prompt, size);
      setGeneratedUrl(url);
    } catch (e) {
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt) return;
    setEnhancing(true);
    try {
      // Use Flash Lite for fast prompt enhancement
      const enhanced = await fastGenerate(`Rewrite this image prompt to be more descriptive and artistic for a high-end AI image generator. Keep it under 50 words. Prompt: "${prompt}"`);
      if (enhanced) setPrompt(enhanced.trim());
    } catch (e) {
      // silent fail
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                    <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-white">AI Studio Generator</h3>
                    <p className="text-slate-400 text-sm">Powered by Gemini 3 Pro Vision</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the image you want to create (e.g., 'A futuristic city made of glass floating in the clouds')..."
                        className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none placeholder:text-slate-600"
                    />
                    <button
                        onClick={handleEnhancePrompt}
                        disabled={enhancing || !prompt}
                        className="absolute bottom-4 right-4 text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
                    >
                        {enhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                        Enhance Prompt (Flash Lite)
                    </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-700">
                        {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    size === s 
                                    ? 'bg-slate-700 text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Art
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Result Area */}
            {generatedUrl && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700 group/image shadow-2xl">
                        <img 
                            src={generatedUrl} 
                            alt="Generated Art" 
                            className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <a 
                                href={generatedUrl} 
                                download="lumina-generated.png"
                                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/20"
                            >
                                <Download className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default ImageGen;
