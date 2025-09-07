"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogOut, Scan, CheckCircle, XCircle, Clock, Users, Camera, Shield, Plus } from "lucide-react";
import { useAuth } from "@/components/providers/supabase-auth-provider";
import { hasFullAdminAccess } from "@/lib/auth";
import CameraScanner from "@/components/scanner/CameraScanner";
import { toast } from "sonner";

interface AddQRResult {
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
  added_at?: string;
}

interface QRRecord extends AddQRResult {
  timestamp: string;
  payload: string;
}

export default function AdminQRScannerPage() {
  const [result, setResult] = useState<AddQRResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrHistory, setQRHistory] = useState<QRRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, added: 0, duplicates: 0, invalid: 0 });
  const [isValidating, setIsValidating] = useState(true);
  const [attendeeName, setAttendeeName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    // Validate admin session on mount
    const validateSession = async () => {
      if (loading) return; // Wait for auth to load
      
      if (!user || !user.email || !hasFullAdminAccess(user.email)) {
        router.push("/auth/login?redirectTo=/admin/qr-scanner");
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

  const updateStats = (newScan: AddQRResult) => {
    setStats(prev => ({
      total: prev.total + 1,
      added: prev.added + (newScan.ok ? 1 : 0),
      duplicates: prev.duplicates + (newScan.reason === "Already exists" ? 1 : 0),
      invalid: prev.invalid + (!newScan.ok && newScan.reason !== "Already exists" ? 1 : 0),
    }));
  };

  const handleScan = async (payload: string) => {
    if (!payload.trim()) return;
    
    if (!attendeeName.trim()) {
      toast.error("Please enter attendee name");
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    try {
      if (!user || !user.email || !hasFullAdminAccess(user.email)) {
        router.push("/auth/login?redirectTo=/admin/qr-scanner");
        return;
      }

      const response = await fetch("/api/admin/add-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrPayload: payload, attendeeName: attendeeName.trim() }),
      });

      const data = await response.json();
      
      if (response.status === 401) {
        // Session expired or invalid
        await signOut();
        router.push("/auth/login?redirectTo=/admin/qr-scanner");
        return;
      }

      setResult(data);
      updateStats(data);
      
      const qrRecord: QRRecord = {
        ...data,
        timestamp: new Date().toISOString(),
        payload,
      };
      
      setQRHistory(prev => [qrRecord, ...prev.slice(0, 49)]); // Keep last 50 scans

      // Show toast notification
      if (data.ok) {
        toast.success(`QR code added successfully for ${data.attendeeName}`);
        setAttendeeName(''); // Clear name after successful scan
      } else {
        toast.error(data.reason || "Failed to add QR code");
      }

    } catch (error) {
      console.error("Error adding QR code:", error);
      const errorResult = {
        ok: false,
        reason: "Network error or server unavailable",
      };
      setResult(errorResult);
      updateStats(errorResult);
      toast.error("Failed to add QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualInput = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = inputRef.current?.value;
    if (payload) {
      await handleScan(payload);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
  };

  if (loading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Validating admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              Admin QR Scanner
            </h1>
            <p className="text-gray-600 mt-1">
              Scan externally generated QR codes to add them to the database
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Scanned</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Scan className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Successfully Added</p>
                  <p className="text-2xl font-bold text-green-600">{stats.added}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Duplicates</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.duplicates}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Invalid</p>
                  <p className="text-2xl font-bold text-red-600">{stats.invalid}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scanner Interface */}
        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Camera Scanner
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Manual Input
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera QR Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CameraScanner onScan={handleScan} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Manual QR Code Input
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualInput} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="Enter attendee name"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Paste or type QR code data here..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !attendeeName.trim()}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      Add QR
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Result Display */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.ok ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Scan Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.ok ? (
                <div className="space-y-2">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      QR code successfully added to the database!
                    </AlertDescription>
                  </Alert>
                  {result.bookingReference && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Booking Reference</p>
                        <p className="font-mono text-lg">{result.bookingReference}</p>
                      </div>
                      {result.attendeeName && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Attendee</p>
                          <p className="text-lg">{result.attendeeName}</p>
                        </div>
                      )}
                      {result.seat && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Seat</p>
                          <p className="text-lg">Row {result.seat.row}, Seat {result.seat.number}</p>
                        </div>
                      )}
                      {result.event && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Event</p>
                          <p className="text-lg">{result.event.title}</p>
                          <p className="text-sm text-gray-500">
                            {result.event.date} at {result.event.time} - {result.event.venue}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    {result.reason || "Failed to add QR code"}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Scan History */}
        {qrHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {qrHistory.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {record.ok ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {record.attendeeName || record.bookingReference || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(record.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={record.ok ? "default" : "destructive"}>
                      {record.ok ? "Added" : record.reason || "Failed"}
                    </Badge>
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