import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import {
  Image as ImageIcon,
  Flashlight,
  FlashlightOff,
  ArrowLeft,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
};

export default function QRScannerPage() {
  const navigate = useNavigate();
  const [flashlight, setFlashlight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");

  // Handle successful QR scan
  const handleScan = (result) => {
    if (result) {
      setIsLoading(true);
      setScanResult(result?.text);
      
      // Simulate processing
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
        
        // In real app, result.text would contain the shop ID or URL
        // Example: If QR code contains shop ID like "shop_123"
        const shopId = result?.text?.split("_")[1] || "1";
        
        // Navigate to shop details after 2 seconds
        setTimeout(() => {
          navigate(`/shop/${shopId}`);
        }, 2000);
      }, 1500);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    setError("Unable to access camera. Please check permissions.");
  };

  const toggleFlashlight = () => {
    setFlashlight(!flashlight);
    // In real implementation, this would control the device flashlight
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  };

  const resetScanner = () => {
    setShowResult(false);
    setScanResult(null);
    setError(null);
    setIsLoading(false);
  };

  const renderScanner = () => (
    <div className="relative h-full bg-black">
      {/* QR Reader */}
      <div className="relative h-full w-full">
        <QrReader
          onResult={handleScan}
          onError={handleError}
          constraints={{
            facingMode: facingMode,
            aspectRatio: 1,
          }}
          videoStyle={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          videoId="qr-video"
          scanDelay={500}
        />
        
        {/* Scanner Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dark overlay with cutout */}
          <div className="absolute inset-0 bg-black/50">
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Transparent center */}
                <div className="absolute inset-0 bg-transparent"></div>
                
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#D9A441]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#D9A441]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#D9A441]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#D9A441]"></div>
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11/12 h-0.5 bg-[#D9A441] animate-pulse opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Text */}
          <div className="absolute bottom-28 left-0 right-0 text-center pointer-events-auto">
            <p className="text-white text-sm font-medium">
              {isLoading ? "Processing QR Code..." : "Place QR code in the frame"}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {isLoading ? "Please wait..." : "Hold camera steady"}
            </p>
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors pointer-events-auto"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h2 className="text-white font-semibold text-sm bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-auto">
          Scan QR Code
        </h2>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
        <div className="flex justify-center gap-6 pointer-events-auto">
          <button 
            onClick={toggleFlashlight}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          >
            {flashlight ? (
              <Flashlight size={24} className="text-white" />
            ) : (
              <FlashlightOff size={24} className="text-white" />
            )}
          </button>
          
          <button 
            onClick={switchCamera}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </button>
          
          <label className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors cursor-pointer pointer-events-auto">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Handle image upload for QR scanning
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    // Here you would process the image for QR code
                    // For now, simulate scanning
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      // Navigate to shop with ID
                      navigate(`/shop/1`);
                    }, 2000);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <ImageIcon size={24} className="text-white" />
          </label>
        </div>

        <div className="mt-4 text-center pointer-events-auto">
          <p className="text-white/60 text-xs">
            Or upload a QR code from your gallery
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute top-20 left-4 right-4 bg-red-500/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
          <AlertCircle size={18} className="text-white flex-shrink-0" />
          <p className="text-white text-xs flex-1">{error}</p>
          <button onClick={() => setError(null)} className="text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Scan Result Modal */}
      {showResult && scanResult && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-[#0F1638]">QR Code Scanned!</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Successfully scanned QR code. Redirecting to shop...
            </p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-[#D9A441] rounded-full animate-progress"></div>
            </div>
            <button
              onClick={() => navigate(`/shop/1`)}
              className="w-full mt-4 py-2.5 rounded-xl text-white font-semibold"
              style={{ backgroundColor: THEME.ink }}
            >
              Go to Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-black">
      <div className="mx-auto max-w-md h-full relative">
        {renderScanner()}
      </div>
    </div>
  );
}