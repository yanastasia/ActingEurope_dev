"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

type UploadedFile = {
  url: string
  filename: string
  size: number
  originalName: string
}

export default function UploadPhotosPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    // Limit to 5 files
    const limited = files.slice(0, 5)
    setSelectedFiles(limited)
    setUploaded([])
    setError(null)
  }

  const onUpload = async () => {
    if (selectedFiles.length === 0) return
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      for (const f of selectedFiles) {
        formData.append('files', f)
      }
      const res = await fetch('/api/upload/multi', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Upload failed')
      }
      const data = await res.json()
      setUploaded(data.files || [])
    } catch (e: any) {
      setError(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Photos (up to 5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="file" multiple accept="image/*" onChange={onSelectFiles} />

            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="border rounded p-2">
                    <div className="text-sm mb-2 truncate">{file.name}</div>
                    <div className="relative h-32 w-full">
                      {/* preview using object URL */}
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button onClick={onUpload} disabled={uploading || selectedFiles.length === 0}>
                {uploading ? 'Uploading…' : 'Upload'}
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedFiles.length} selected (max 5)
              </span>
            </div>

            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}

            {uploaded.length > 0 && (
              <div className="mt-4">
                <div className="font-medium mb-2">Uploaded Files</div>
                <div className="grid grid-cols-2 gap-4">
                  {uploaded.map((f, idx) => (
                    <div key={idx} className="border rounded p-2">
                      <div className="text-sm mb-1 truncate">{f.originalName}</div>
                      <div className="relative h-32 w-full">
                        <Image src={f.url} alt={f.filename} fill className="object-cover rounded" />
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground truncate">{f.url}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              Tip: After upload, you can attach these URLs to theatres or use the sync tool at <code>/api/sync-photos</code> if images are recorded in the database.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}