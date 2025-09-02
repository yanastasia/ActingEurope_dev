'use client';

import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CameraOff, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CameraScannerProps {
  onScan: (qrData: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
}

export default function CameraScanner({ 
  onScan, 
  isLoading = false, 
  disabled = false, 
  title = "Camera QR Scanner",
  description = "Use your device camera to scan QR codes"
}: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize code reader
    codeReaderRef.current = new BrowserMultiFormatReader();
    
    // Get available video devices
    getVideoDevices();
    
    return () => {
      stopScanning();
    };
  }, []);

  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      
      // Select rear camera by default if available
      const rearCamera = videoDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear') ||
        device.label.toLowerCase().includes('environment')
      );
      
      if (rearCamera) {
        setSelectedDeviceId(rearCamera.deviceId);
      } else if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error getting video devices:', err);
      setError('Failed to access camera devices');
    }
  };

  const startScanning = async () => {
    if (!codeReaderRef.current || !videoRef.current) return;
    
    try {
      setError('');
      setIsScanning(true);
      
      // Request camera permission
      const constraints = {
        video: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          facingMode: selectedDeviceId ? undefined : { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setHasPermission(true);
      
      // Start video preview
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      
      // Start scanning
      codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId || null,
        videoRef.current,
        (result, error) => {
          if (result) {
            onScan(result.getText());
            // Continue scanning - don't stop after first scan
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error('Scanning error:', error);
          }
        }
      );
      
    } catch (err: any) {
      console.error('Error starting camera:', err);
      setHasPermission(false);
      setIsScanning(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else {
        setError('Failed to start camera. Please check your camera settings.');
      }
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };

  const switchCamera = async () => {
    if (devices.length <= 1) return;
    
    const currentIndex = devices.findIndex(device => device.deviceId === selectedDeviceId);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % devices.length;
    const nextDevice = devices[nextIndex];
    
    setSelectedDeviceId(nextDevice.deviceId);
    
    if (isScanning) {
      stopScanning();
      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        startScanning();
      }, 100);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full h-64 bg-black rounded-lg object-cover"
            playsInline
            muted
          />
          
          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Camera preview will appear here</p>
              </div>
            </div>
          )}
          
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Scanning overlay */}
              <div className="absolute inset-4 border-2 border-blue-500 rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
                Point camera at QR code
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {!isScanning ? (
            <Button 
              onClick={startScanning} 
              disabled={disabled || isLoading}
              className="flex-1"
            >
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          ) : (
            <Button 
              onClick={stopScanning} 
              variant="destructive"
              disabled={disabled}
              className="flex-1"
            >
              <CameraOff className="mr-2 h-4 w-4" />
              Stop Camera
            </Button>
          )}
          
          {devices.length > 1 && (
            <Button 
              onClick={switchCamera} 
              variant="outline"
              disabled={disabled || isLoading}
              size="icon"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {devices.length > 1 && (
          <div className="text-sm text-gray-600">
            Camera: {devices.find(d => d.deviceId === selectedDeviceId)?.label || 'Unknown'}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>• Point your camera at a QR code to scan automatically</p>
          <p>• Make sure the QR code is well-lit and clearly visible</p>
          <p>• The scanner will continue scanning until you stop it</p>
        </div>
      </CardContent>
    </Card>
  );
}