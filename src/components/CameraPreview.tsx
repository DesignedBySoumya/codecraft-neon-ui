
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface CameraPreviewProps {
  enabled: boolean;
}

const CameraPreview = ({ enabled }: CameraPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      if (enabled && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error("Error accessing camera:", error);
        }
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <Card className="fixed bottom-4 right-4 w-32 h-24 bg-craft-panel border-craft-border flex items-center justify-center">
        <Camera className="w-6 h-6 text-craft-text-secondary" />
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-32 h-24 bg-craft-panel border-craft-border overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />
    </Card>
  );
};

export default CameraPreview;
