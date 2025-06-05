
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Camera, CameraOff } from "lucide-react";

interface WebcamPreviewProps {
  enabled: boolean;
}

const WebcamPreview = ({ enabled }: WebcamPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      if (enabled && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasPermission(false);
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

  if (!enabled || !hasPermission) {
    return (
      <Card className="fixed bottom-4 right-4 w-32 h-24 bg-craft-panel border-craft-border flex items-center justify-center shadow-lg">
        <CameraOff className="w-6 h-6 text-craft-text-secondary" />
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-32 h-24 bg-craft-panel border-craft-border overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute top-1 right-1">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    </Card>
  );
};

export default WebcamPreview;
