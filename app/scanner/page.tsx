"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogOut, Scan, CheckCircle, XCircle, Clock, Users, Camera, Shield } from "lucide-react";
import { useAuth } from "@/components/providers/supabase-auth-provider";
import { isScannerEmail } from "@/lib/auth";
import CameraScanner from "@/components/scanner/CameraScanner";

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

export default function ScannerPage() {
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, valid: 0, duplicates: 0, invalid: 0 });
  const [isValidating, setIsValidating] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const verifyInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    // Validate scanner session on mount
    const validateSession = async () => {
      if (loading) return; // Wait for auth to load
      
      if (!user || !user.email || !isScannerEmail(user.email)) {
        router.push("/auth/login?redirectTo=/scanner");
        return;
      }

      setIsValidating(false);
      
      // Auto-focus the input when component mounts
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    validateSession();
  }, [user, loading, router]);

  const updateStats = (newScan: CheckInResult) => {
    setStats(prev => ({
      total: prev.total + 1,
      valid: prev.valid + (newScan.ok && newScan.first_scan ? 1 : 0),
      duplicates: prev.duplicates + (newScan.ok && !newScan.first_scan ? 1 : 0),
      invalid: prev.invalid + (!newScan.ok ? 1 : 0),
    }));
  };

  const handleScan = async (payload: string, isVerifyOnly = false) => {
    if (!payload.trim()) return;
    
    setIsLoading(true);
    setResult(null);

    try {
      if (!user || !user.email || !isScannerEmail(user.email)) {
        router.push("/auth/login?redirectTo=/scanner");
        return;
      }

      const endpoint = isVerifyOnly ? "/api/verify-qr" : "/api/verify-qr";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrPayload: payload }),
      });

      const data = await response.json();
      
      if (response.status === 401) {
        // Session expired or invalid
        await signOut();
        router.push("/auth/login?redirectTo=/scanner");
        return;
      }

      setResult(data);
      
      if (!isVerifyOnly) {
        updateStats(data);
        
        const scanRecord: ScanRecord = {
          ...data,
          timestamp: new Date().toISOString(),
          payload,
        };
        
        setScanHistory(prev => [scanRecord, ...prev.slice(0, 49)]); // Keep last 50 scans
      }
      
    } catch (error) {
      console.error("Scan error:", error);
      setResult({
        ok: false,
        reason: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-gray-600">Validating scanner session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ticket Scanner</h1>
            <p className="text-gray-600">Scanner User: {user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Scans</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold">{stats.valid}</div>
              <div className="text-sm text-gray-600">Valid Check-ins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold">{stats.duplicates}</div>
              <div className="text-sm text-gray-600">Duplicates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="mx-auto h-8 w-8 text-red-600 mb-2" />
              <div className="text-2xl font-bold">{stats.invalid}</div>
              <div className="text-sm text-gray-600">Invalid</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="checkin" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checkin" className="text-sm">Check-in</TabsTrigger>
            <TabsTrigger value="verify" className="text-sm">Verify</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">History</TabsTrigger>
          </TabsList>

          {/* Info about Check-in vs Verify */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs text-blue-800">
              <strong>Check-in:</strong> Marks tickets as used and allows entry to the event.<br/>
              <strong>Verify:</strong> Only validates ticket authenticity without marking as used.
            </div>
          </div>

          <TabsContent value="checkin">
            <div className="space-y-6">
              {/* Camera Scanner Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Scan className="h-5 w-5" />
                    Camera Check-in
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CameraScanner 
                    onScan={(qrData) => handleScan(qrData)}
                    isLoading={isLoading}
                    disabled={false}
                  />
                </CardContent>
              </Card>

              {/* Handheld Scanner Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Scan className="h-5 w-5" />
                    Handheld Scanner Check-in (Backup)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="scan-input" className="text-sm font-medium">
                      Scan QR Code or Enter Ticket Data
                    </label>
                    <Input
                      id="scan-input"
                      ref={inputRef}
                      placeholder="Scan QR code or paste ticket data here..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleScan(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>• Use handheld QR scanner or paste ticket data</p>
                    <p>• Press Enter to process the scan</p>
                  </div>
                </CardContent>
              </Card>

              {/* Check-in Results */}
               {isLoading && (
                 <div className="flex items-center justify-center py-4">
                   <Loader2 className="h-6 w-6 animate-spin mr-2" />
                   <span>Processing scan...</span>
                 </div>
               )}

               {result && (
                 <Alert variant={result.ok ? "default" : "destructive"}>
                   <AlertDescription>
                     {result.ok ? (
                       <div className="space-y-2">
                         <div className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-green-600" />
                           <span className="font-semibold">
                             {result.first_scan ? "✅ Check-in Successful" : "⚠️ Already Checked In"}
                           </span>
                         </div>
                         <div className="text-sm space-y-1">
                           <div><strong>Booking:</strong> {result.bookingReference}</div>
                           <div><strong>Attendee:</strong> {result.attendeeName || "N/A"}</div>
                           <div><strong>Seat:</strong> Row {result.seat?.row}, Seat {result.seat?.number}</div>
                           <div><strong>Event:</strong> {result.event?.title}</div>
                           <div><strong>Date:</strong> {result.event?.date} at {result.event?.time}</div>
                           <div><strong>Venue:</strong> {result.event?.venue}</div>
                           {result.scanned_at && (
                             <div><strong>Previously scanned:</strong> {new Date(result.scanned_at).toLocaleString()}</div>
                           )}
                         </div>
                       </div>
                     ) : (
                       <div className="flex items-center gap-2">
                         <XCircle className="h-4 w-4 text-red-600" />
                         <span>{result.reason}</span>
                       </div>
                     )}
                   </AlertDescription>
                 </Alert>
               )}
             </div>
           </TabsContent>

          <TabsContent value="verify">
            <div className="space-y-6">
              {/* Camera Verify Section */}
              <Card>
                <CardHeader>
                   <CardTitle className="flex items-center gap-2 text-lg">
                     <Camera className="h-5 w-5" />
                     <Shield className="h-5 w-5" />
                     Camera Verify
                   </CardTitle>
                 </CardHeader>
                <CardContent>
                  <CameraScanner 
                    onScan={(qrData) => handleScan(qrData, true)}
                    isLoading={isLoading}
                    disabled={false}
                  />
                </CardContent>
              </Card>

              {/* Handheld Verify Section */}
              <Card>
                <CardHeader>
                   <CardTitle className="flex items-center gap-2 text-lg">
                     <Shield className="h-5 w-5" />
                     Handheld Scanner Verify (Backup)
                   </CardTitle>
                 </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="verify-input" className="text-sm font-medium">
                      Scan QR Code to Verify
                    </label>
                    <Input
                      id="verify-input"
                      ref={verifyInputRef}
                      placeholder="Scan QR code to verify ticket validity..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleScan(e.currentTarget.value, true);
                          e.currentTarget.value = "";
                        }
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>• Use handheld QR scanner or paste ticket data</p>
                    <p>• Press Enter to verify without checking in</p>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Results */}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Verifying ticket...</span>
                </div>
              )}

              {result && (
                <Alert variant={result.ok ? "default" : "destructive"}>
                  <AlertDescription>
                    {result.ok ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">✅ Valid Ticket</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div><strong>Booking:</strong> {result.bookingReference}</div>
                          <div><strong>Attendee:</strong> {result.attendeeName || "N/A"}</div>
                          <div><strong>Seat:</strong> Row {result.seat?.row}, Seat {result.seat?.number}</div>
                          <div><strong>Event:</strong> {result.event?.title}</div>
                          <div><strong>Date:</strong> {result.event?.date} at {result.event?.time}</div>
                          <div><strong>Venue:</strong> {result.event?.venue}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span>{result.reason}</span>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Scan History</CardTitle>
              </CardHeader>
              <CardContent>
                {scanHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No scans yet</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {scanHistory.map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {scan.ok ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <div>
                            <div className="font-medium">
                              {scan.ok ? scan.bookingReference : "Invalid Scan"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {scan.ok ? scan.attendeeName || "No name" : scan.reason}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {new Date(scan.timestamp).toLocaleTimeString()}
                          </div>
                          {scan.ok && (
                            <Badge variant={scan.first_scan ? "default" : "secondary"}>
                              {scan.first_scan ? "First scan" : "Duplicate"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}