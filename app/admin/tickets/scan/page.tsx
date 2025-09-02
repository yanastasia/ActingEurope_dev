"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CheckInResult {
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
  first_scan?: boolean;
}

interface ScanRecord extends CheckInResult {
  timestamp: string;
  payload: string;
}

export default function AdminScanPage() {
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, valid: 0, duplicates: 0, invalid: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const verifyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const updateStats = (newScan: CheckInResult) => {
    setStats(prev => ({
      total: prev.total + 1,
      valid: prev.valid + (newScan.ok && newScan.first_scan ? 1 : 0),
      duplicates: prev.duplicates + (newScan.ok && !newScan.first_scan ? 1 : 0),
      invalid: prev.invalid + (!newScan.ok ? 1 : 0)
    }));
  };

  const handleCheckIn = async (payload: string) => {
    if (!payload.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/tickets/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: payload.trim() }),
      });

      const data = await response.json();
      setResult(data);
      updateStats(data);
      
      // Add to scan history
      setScanHistory(prev => [{
        ...data,
        timestamp: new Date().toLocaleString(),
        payload: payload.trim()
      }, ...prev.slice(0, 49)]); // Keep last 50 scans

    } catch (error) {
      console.error('Check-in error:', error);
      const errorResult = {
        ok: false,
        reason: 'Network error or server unavailable'
      };
      setResult(errorResult);
      updateStats(errorResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOnly = async (payload: string) => {
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
      setResult({ ...data, first_scan: false }); // Mark as verify-only

    } catch (error) {
      console.error('Verify error:', error);
      setResult({
        ok: false,
        reason: 'Network error or server unavailable'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, isVerifyOnly = false) => {
    if (e.key === 'Enter') {
      const payload = e.currentTarget.value;
      if (isVerifyOnly) {
        handleVerifyOnly(payload);
      } else {
        handleCheckIn(payload);
      }
      e.currentTarget.value = ''; // Clear input after scan
    }
  };

  const clearHistory = () => {
    setScanHistory([]);
    setStats({ total: 0, valid: 0, duplicates: 0, invalid: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#021a4a] mb-2">Admin Ticket Scanner</h1>
          <p className="text-gray-600">Check-in attendees and verify tickets</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#021a4a]">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Scans</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
              <div className="text-sm text-gray-600">Valid Check-ins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.duplicates}</div>
              <div className="text-sm text-gray-600">Duplicate Scans</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.invalid}</div>
              <div className="text-sm text-gray-600">Invalid Tickets</div>
            </CardContent>
          </Card>
        </div>

        {/* Scanner Tabs */}
        <Tabs defaultValue="checkin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="checkin">Check-in Mode</TabsTrigger>
            <TabsTrigger value="verify">Verify Only</TabsTrigger>
          </TabsList>
          
          <TabsContent value="checkin">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Check-in Scanner</CardTitle>
                <p className="text-sm text-gray-600">Marks tickets as scanned and prevents duplicate entry</p>
              </CardHeader>
              <CardContent>
                <Input
                  ref={inputRef}
                  placeholder="Scan QR code to check-in attendee..."
                  onKeyPress={(e) => handleKeyPress(e, false)}
                  className="text-lg p-4"
                  autoComplete="off"
                  autoFocus
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Verify Only Scanner</CardTitle>
                <p className="text-sm text-gray-600">Verifies tickets without marking as scanned</p>
              </CardHeader>
              <CardContent>
                <Input
                  ref={verifyInputRef}
                  placeholder="Scan QR code to verify ticket..."
                  onKeyPress={(e) => handleKeyPress(e, true)}
                  className="text-lg p-4"
                  autoComplete="off"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#021a4a] mx-auto"></div>
                <p className="mt-2 text-gray-600">Processing ticket...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Display */}
        {result && (
          <Card className={result.ok ? "border-green-500" : "border-red-500"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={result.ok ? "default" : "destructive"}
                    className={result.ok ? "bg-green-500" : "bg-red-500"}
                  >
                    {result.ok ? "✓ VALID" : "✗ INVALID"}
                  </Badge>
                  {result.ok && result.first_scan === false && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      ALREADY SCANNED
                    </Badge>
                  )}
                  {result.ok && result.first_scan && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      CHECKED IN
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              {result.ok ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-700">Attendee</p>
                      <p className="text-xl">{result.attendeeName}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Seat</p>
                      <p className="text-xl">Row {result.seat?.row}, Seat {result.seat?.number}</p>
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
              <div className="flex items-center justify-between">
                <CardTitle>Scan History</CardTitle>
                <Button onClick={clearHistory} variant="outline" size="sm">
                  Clear History
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {scanHistory.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={scan.ok ? "default" : "destructive"}
                        className={scan.ok ? "bg-green-500" : "bg-red-500"}
                      >
                        {scan.ok ? "✓" : "✗"}
                      </Badge>
                      {scan.ok && scan.first_scan === false && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-xs">
                          DUP
                        </Badge>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">{scan.attendeeName || 'Unknown'}</span>
                        <span className="text-sm text-gray-500">
                          {scan.seat ? `Row ${scan.seat.row}, Seat ${scan.seat.number}` : scan.reason}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono">{scan.bookingReference}</div>
                      <div className="text-xs text-gray-500">{scan.timestamp}</div>
                    </div>
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