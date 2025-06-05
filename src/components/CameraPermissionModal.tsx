
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera } from "lucide-react";

interface CameraPermissionModalProps {
  isOpen: boolean;
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
}

const CameraPermissionModal = ({ 
  isOpen, 
  onPermissionGranted, 
  onPermissionDenied 
}: CameraPermissionModalProps) => {
  const [permissionState, setPermissionState] = useState<'pending' | 'denied'>('pending');
  const [isRequesting, setIsRequesting] = useState(false);

  const requestCameraPermission = async () => {
    setIsRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach(track => track.stop());
      onPermissionGranted();
    } catch (error) {
      console.error("Camera permission denied:", error);
      setPermissionState('denied');
      onPermissionDenied();
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (isOpen && permissionState === 'pending') {
      requestCameraPermission();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" closeButton={false}>
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-craft-accent" />
            <DialogTitle>Camera Access Required</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <Camera className="w-16 h-16 text-craft-text-secondary" />
          
          {permissionState === 'pending' ? (
            <div className="text-center space-y-2">
              <p className="text-craft-text-primary">
                Camera access is required to participate in the live contest.
              </p>
              <p className="text-craft-text-secondary text-sm">
                Please allow access to continue.
              </p>
              {isRequesting && (
                <p className="text-craft-accent text-sm">
                  Requesting camera permission...
                </p>
              )}
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-craft-error">
                ❗ Camera access denied. Please refresh and allow camera permission to begin the contest.
              </p>
              <Button 
                onClick={() => {
                  setPermissionState('pending');
                  requestCameraPermission();
                }}
                className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraPermissionModal;
