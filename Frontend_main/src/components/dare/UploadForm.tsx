import { useState, useRef } from "react";
import { FileText, Image, Upload, X, Sparkles, Video, Music, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpeechInput } from "./SpeechInput";
import { ContextForm, ContextData } from "./ContextForm";

export type ContentType = "text" | "speech" | "image" | "video" | "audio";

interface UploadFormProps {
  onSubmit: (content: string, type: ContentType) => void;
  isAnalyzing: boolean;
}

export const UploadForm = ({ onSubmit, isAnalyzing }: UploadFormProps) => {
  const [text, setText] = useState("");
  const [speechTranscript, setSpeechTranscript] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ContentType>("text");
  const [context, setContext] = useState<ContextData>({
    source: "unknown",
    isThreat: "unsure",
    recognizePerson: "not_applicable",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptedFormats = () => {
    switch (activeTab) {
      case "image": return "image/*";
      case "video": return "video/*";
      case "audio": return "audio/*";
      default: return "*/*";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (activeTab === "text" && text.trim()) {
      onSubmit(text, "text");
    } else if (activeTab === "speech" && speechTranscript.trim()) {
      onSubmit(speechTranscript, "text"); // Speech becomes text for analysis
    } else if (mediaPreview) {
      onSubmit(mediaPreview, activeTab);
    }
  };

  const clearMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTabChange = (tab: ContentType) => {
    setActiveTab(tab);
    clearMedia();
    // Don't clear speech transcript when switching tabs so user can go back
  };

  const canSubmit = 
    activeTab === "text" ? text.trim().length > 0 : 
    activeTab === "speech" ? speechTranscript.trim().length > 0 :
    mediaPreview !== null;

  const getUploadInfo = () => {
    switch (activeTab) {
      case "image": return { formats: "JPG, PNG, WEBP, GIF", size: "10MB" };
      case "video": return { formats: "MP4, WEBM, MOV, AVI", size: "100MB" };
      case "audio": return { formats: "MP3, WAV, OGG, M4A", size: "50MB" };
      default: return { formats: "", size: "" };
    }
  };

  const renderMediaPreview = () => {
    if (!mediaPreview) return null;

    switch (activeTab) {
      case "image":
        return (
          <img
            src={mediaPreview}
            alt="Preview"
            className="w-full max-h-[300px] object-contain bg-muted/30"
          />
        );
      case "video":
        return (
          <video
            src={mediaPreview}
            controls
            className="w-full max-h-[300px] bg-muted/30"
          />
        );
      case "audio":
        return (
          <div className="p-8 bg-muted/30 flex flex-col items-center justify-center">
            <Music className="w-16 h-16 text-primary mb-4" />
            <audio src={mediaPreview} controls className="w-full max-w-md" />
          </div>
        );
      default:
        return null;
    }
  };

  const getMediaIcon = () => {
    switch (activeTab) {
      case "image": return <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />;
      case "video": return <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />;
      case "audio": return <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />;
      default: return <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as ContentType)}>
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted/50">
            <TabsTrigger value="text" className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger value="speech" className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Speech</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Paste article text, social media post, or any content you want to analyze for authenticity risk..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] resize-none bg-muted/30 border-muted focus:border-primary/50 focus:ring-primary/20"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {text.length} characters
            </div>
          </div>
        </TabsContent>

          <TabsContent value="speech" className="space-y-4">
            <SpeechInput 
              transcript={speechTranscript} 
              onTranscript={setSpeechTranscript} 
            />
          </TabsContent>

          {["image", "video", "audio"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept={getAcceptedFormats()}
                onChange={handleFileChange}
                className="hidden"
              />
              
              {!mediaPreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted hover:border-primary/50 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 hover:bg-primary/5"
                >
                  {getMediaIcon()}
                  <p className="text-lg font-medium mb-2">
                    Drop {type} here or click to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports {getUploadInfo().formats} up to {getUploadInfo().size}
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden">
                  {renderMediaPreview()}
                  <button
                    onClick={clearMedia}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {mediaFile && (
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-md bg-background/80 text-sm font-mono">
                      {mediaFile.name}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isAnalyzing}
          className="w-full mt-6 h-12 bg-dare-gradient hover:opacity-90 text-primary-foreground font-semibold transition-all duration-300 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Content
            </>
          )}
        </Button>
      </div>

      {/* Context Form */}
      <ContextForm context={context} onChange={setContext} />
    </div>
  );
};
