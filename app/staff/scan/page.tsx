"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface VerificationResult {
  ok: boolean;
  reason?: string;
  bookingReference?: string;
  attendeeName?: string;
  seat?: { row: number; number: number };
  event?: {
    title: string;
    date: string;
    time: string;
    venue: string;
  };
  scanned_at?: string;
}

export default function StaffScanPage() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState<(VerificationResult & { timestamp: string; payload: string })[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleScan = async (payload: string) => {
    if (!payload.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/tickets/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: payload.trim() }),
      });

      const data = await response.json();
      setResult(data);
      
      // Add to scan history
      setScanHistory(prev => [{
        ...data,
        timestamp: new Date().toLocaleTimeString(),
        payload: payload.trim()
      }, ...prev.slice(0, 9)]); // Keep last 10 scans

    } catch (error) {
      console.error('Scan error:', error);
      setResult({
        ok: false,
        reason: 'Network error or server unavailable'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const payload = e.currentTarget.value;
      handleScan(payload);
      e.currentTarget.value = ''; // Clear input after scan
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-submit if input looks like a complete QR payload
    const value = e.target.value;
    if (value.length > 20 && value.includes('-')) {
      handleScan(value);
      e.target.value = ''; // Clear input after scan
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#021a4a] mb-2">Staff Ticket Scanner</h1>
          <p className="text-gray-600">Scan QR codes to verify tickets</p>
        </div>

        {/* Scanner Input */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                ref={inputRef}
                placeholder="Focus here and scan QR code..."
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
                className="text-lg p-4"
                autoComplete="off"
                autoFocus
              />
              <p className="text-sm text-gray-500">
                Point your handheld scanner at this input field. The QR code will be automatically processed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#021a4a] mx-auto"></div>
                <p className="mt-2 text-gray-600">Verifying ticket...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verification Result */}
        {result && (
          <Card className={result.ok ? "border-green-500" : "border-red-500"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant={result.ok ? "default" : "destructive"}
                  className={result.ok ? "bg-green-500" : "bg-red-500"}
                >
                  {result.ok ? "✓ VALID TICKET" : "✗ INVALID TICKET"}
                </Badge>
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              {result.ok ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-700">Attendee</p>
                      <p className="text-lg">{result.attendeeName}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Seat</p>
                      <p className="text-lg">Row {result.seat?.row}, Seat {result.seat?.number}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Event</p>
                      <p className="text-lg">{result.event?.title}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Date & Time</p>
                      <p className="text-lg">{result.event?.date} at {result.event?.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Venue</p>
                    <p className="text-lg">{result.event?.venue}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Booking Reference</p>
                    <p className="text-lg font-mono">{result.bookingReference}</p>
                  </div>
                  {result.scanned_at && (
                    <div className="mt-4 p-3 bg-yellow-100 rounded">
                      <p className="text-yellow-800">
                        ⚠️ Previously scanned at: {new Date(result.scanned_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-red-600">
                  <p className="text-lg font-semibold">Verification Failed</p>
                  <p>{result.reason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scanHistory.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={scan.ok ? "default" : "destructive"}
                        className={scan.ok ? "bg-green-500" : "bg-red-500"}
                      >
                        {scan.ok ? "✓" : "✗"}
                      </Badge>
                      <span className="font-mono text-sm">{scan.payload.substring(0, 20)}...</span>
                      {scan.ok && (
                        <span className="text-sm">{scan.attendeeName}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{scan.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}