import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
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
  const scannerRef = useRef(null);
  const [flashlight, setFlashlight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [isScanning, setIsScanning] = useState(false);

  // Initialize and start scanner on mount
  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 280, height: 280 },
      aspectRatio: 1,
    };

    const html5QrCode = new Html5Qrcode("qr-reader-container");
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: facingMode },
          config,
          onScanSuccess,
          onScanError
        );
        setIsScanning(true);
      } catch (err) {
        console.error(err);
        setError("Unable to access camera. Please check permissions.");
      }
    };

    startScanner();

    // Cleanup on unmount
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear();
      }
    };
  }, []);

  // Switch camera when facingMode changes
  useEffect(() => {
    if (scannerRef.current && isScanning) {
      const switchCamera = async () => {
        try {
          await scannerRef.current.stop();
          await scannerRef.current.start(
            { facingMode: facingMode },
            { fps: 10, qrbox: { width: 280, height: 280 } },
            onScanSuccess,
            onScanError
          );
        } catch (err) {
          console.error("Error switching camera", err);
        }
      };
      switchCamera();
    }
  }, [facingMode]);

  // Handle successful QR scan
  const onScanSuccess = (decodedText, decodedResult) => {
    if (!isLoading && !showResult) {
      setIsLoading(true);
      setScanResult(decodedText);

      // Stop scanner immediately so it doesn't keep scanning
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(() => {});
        setIsScanning(false);
      }

      // Simulate processing & navigation
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);

        // Extract shop ID from decodedText (customize this logic)
        const shopId = decodedText?.split("_")[1] || "1";

        // Navigate to shop details
        setTimeout(() => {
          navigate(`/shop/${shopId}`);
        }, 2000);
      }, 1500);
    }
  };

  const onScanError = (err) => {
    // Ignore frequent "No QR code found" errors
    if (err.includes("No QR code")) return;
    console.warn("QR Error:", err);
  };

  const toggleFlashlight = async () => {
    setFlashlight(!flashlight);
    // Note: html5-qrcode doesn't have native flashlight control.
    // You would need the browser MediaStream API to toggle it manually.
    // This UI button is kept for visual consistency.
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !scannerRef.current) return;

    setIsLoading(true);
    const html5QrCode = scannerRef.current;

    // Stop live camera if it's running
    if (isScanning) {
      html5QrCode.stop().catch(() => {});
      setIsScanning(false);
    }

    html5QrCode
      .scanFile(file, true)
      .then((decodedText) => {
        setScanResult(decodedText);
        setIsLoading(false);
        setShowResult(true);

        const shopId = decodedText?.split("_")[1] || "1";
        setTimeout(() => navigate(`/shop/${shopId}`), 2000);
      })
      .catch((err) => {
        console.error("File scan error", err);
        setError("Could not read QR code from image.");
        setIsLoading(false);
        // Restart camera after error
        if (scannerRef.current) {
          scannerRef.current.start(
            { facingMode: facingMode },
            { fps: 10, qrbox: { width: 280, height: 280 } },
            onScanSuccess,
            onScanError
          );
          setIsScanning(true);
        }
      });
  };

  const resetScanner = () => {
    setShowResult(false);
    setScanResult(null);
    setError(null);
    setIsLoading(false);

    // Restart camera
    if (scannerRef.current && !isScanning) {
      scannerRef.current.start(
        { facingMode: facingMode },
        { fps: 10, qrbox: { width: 280, height: 280 } },
        onScanSuccess,
        onScanError
      );
      setIsScanning(true);
    }
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="mx-auto max-w-md h-full relative">
        
        {/* The QR Reader Container */}
        <div id="qr-reader-container" className="w-full h-full bg-black"></div>

        {/* Scanner Overlay (UI Layer on top of camera) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/60">
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-transparent"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#D9A441]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#D9A441]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#D9A441]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#D9A441]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11/12 h-0.5 bg-[#D9A441] animate-pulse opacity-75 shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-28 left-0 right-0 text-center pointer-events-auto">
            <p className="text-white text-sm font-medium drop-shadow-md">
              {isLoading ? "Processing QR Code..." : "Place QR code in the frame"}
            </p>
            <p className="text-white/70 text-xs mt-1 drop-shadow-md">
              {isLoading ? "Please wait..." : "Hold camera steady"}
            </p>
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
                onChange={handleFileUpload}
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
          <div className="absolute top-20 left-4 right-4 bg-red-500/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 shadow-lg pointer-events-auto">
            <AlertCircle size={18} className="text-white flex-shrink-0" />
            <p className="text-white text-xs flex-1">{error}</p>
            <button onClick={() => setError(null)} className="text-white hover:text-red-200">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Scan Result Modal */}
        {showResult && scanResult && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 pointer-events-auto z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-up shadow-2xl">
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
                className="w-full mt-4 py-2.5 rounded-xl text-white font-semibold transition-transform active:scale-95"
                style={{ backgroundColor: THEME.ink }}
              >
                Go to Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}