import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Type, Image as ImageIcon, Upload, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface InputSectionProps {
  onSubmitText: (text: string) => void;
  onSubmitImage: (file: File) => void;
  isLoading?: boolean;
}

export function InputSection({ onSubmitText, onSubmitImage, isLoading }: InputSectionProps) {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  }, []);

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1,
    multiple: false
  });

  const handleSubmit = () => {
    setError(null);
    if (mode === 'text') {
      if (!text.trim()) {
        setError("Please enter some text to analyze.");
        return;
      }
      if (text.length < 10) {
        setError("Please enter at least 10 characters for a meaningful analysis.");
        return;
      }
      onSubmitText(text);
    } else {
      if (!file) {
        setError("Please upload an image to analyze.");
        return;
      }
      onSubmitImage(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Content Risk Assessment</h2>
        <p className="text-zinc-400">Analyze digital content for authenticity risks and safety signals.</p>
      </div>

      {/* Mode Switcher */}
      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 w-fit mx-auto shadow-inner">
        <button
          onClick={() => { setMode('text'); setError(null); }}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
            mode === 'text' 
              ? "bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-blue-500/30" 
              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
          )}
        >
          <Type className="w-4 h-4" />
          Text Analysis
        </button>
        <button
          onClick={() => { setMode('image'); setError(null); }}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
            mode === 'image' 
              ? "bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-blue-500/30" 
              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
          )}
        >
          <ImageIcon className="w-4 h-4" />
          Image Analysis
        </button>
      </div>

      {/* Input Area */}
      <div className="glass-panel p-6 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors">
        <AnimatePresence mode="wait">
          {mode === 'text' ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <label htmlFor="text-input" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" />
                  Content to Analyze
                </label>
                <span className="text-xs text-zinc-500">{text.length} chars</span>
              </div>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste article text, social media post, or message here..."
                className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all shadow-inner custom-scrollbar"
                disabled={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {!file ? (
                <div
                  {...getRootProps()}
                  className={cn(
                    "h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-300 cursor-pointer",
                    isDragActive ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "border-white/20 hover:border-blue-500/50 hover:bg-white/5",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input {...getInputProps()} disabled={isLoading} />
                  <div className={cn("p-3 rounded-full mb-4 transition-colors", isDragActive ? "bg-blue-500/20" : "bg-white/5")}>
                    <Upload className={cn("w-6 h-6", isDragActive ? "text-blue-400" : "text-zinc-400")} />
                  </div>
                  <p className="text-sm font-medium text-zinc-300 mb-1">
                    {isDragActive ? "Drop image here..." : "Drag & drop an image"}
                  </p>
                  <p className="text-xs text-zinc-500">or click to browse (JPEG, PNG, WebP up to 5MB)</p>
                </div>
              ) : (
                <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 group/img bg-black/40 flex items-center justify-center">
                  {previewUrl && (
                    <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                  )}
                  {!isLoading && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); setPreviewUrl(null); }}
                        className="px-4 py-2 bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 rounded-lg text-sm font-medium transition-colors border border-white/10 hover:border-rose-500/30"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 flex items-center gap-2 text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 0 20px rgba(37,99,235,0.4)" } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            onClick={handleSubmit}
            disabled={isLoading}
            className={cn(
              "px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2",
              isLoading 
                ? "bg-blue-500/50 text-white/70 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
            )}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Initializing Assessment...
              </>
            ) : (
              "Run Assessment"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
