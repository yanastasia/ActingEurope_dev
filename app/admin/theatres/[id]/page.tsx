"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Upload, ArrowLeft, Save, Trash2 } from "lucide-react"
import { isAdmin } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

// Helper function to fix company names
const fixCompanyName = (name: string): string => {
  return name
    .replace(/OSAIK "39 Monkeys"/g, 'OSAIK "36 Monkeys"')
    .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК "36 Маймуни"')
    .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАИК "36 Мајмуни"')
    .replace(/ОСАИК "39 Мајмуна"/g, 'ОСАИК "36 Мајмуна"');
};

interface Theatre {
  id: string
  name: string
  city: string
  country: string
  description: string
  history: string
  website: string
  founded_year: number
  content_language: string
  translation_group: string
  images: TheatreImage[]
  tags: TheatreTag[]
  _count: {
    events: number
  }
}

interface TheatreImage {
  id: string
  url: string
  alt_text: string
}

interface TheatreTag {
  id: string
  name: string
}

export default function EditTheatrePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [theatre, setTheatre] = useState<Theatre | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    description: "",
    history: "",
    website: "",
    founded_year: new Date().getFullYear(),
    content_language: "en",
    translation_group: ""
  })
  const [images, setImages] = useState<TheatreImage[]>([])
  const [tags, setTags] = useState<TheatreTag[]>([])
  const [newTag, setNewTag] = useState("")
  const [uploadingImages, setUploadingImages] = useState<File[]>([])

  const fetchTheatre = useCallback(async () => {
    try {
      const response = await fetch(`/api/theatres/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch theatre")
      }
      const data = await response.json()
      setTheatre(data)
      setFormData({
        name: data.name,
        city: data.city,
        country: data.country,
        description: data.description,
        history: data.history,
        website: data.website,
        founded_year: data.founded_year,
        content_language: data.content_language,
        translation_group: data.translation_group
      })
      setImages(data.images || [])
      setTags(data.tags || [])
    } catch (error) {
      console.error("Error fetching theatre:", error)
      toast({
        title: "Error",
        description: "Failed to fetch theatre data",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }, [params.id, toast])

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const admin = await isAdmin()
      if (!admin) {
        router.push("/auth/login")
        return
      }
      await fetchTheatre()
    }
    checkAdminAndFetch()
  }, [params.id, router, fetchTheatre])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (files: FileList) => {
    const newFiles = Array.from(files)
    setUploadingImages(prev => [...prev, ...newFiles])

    for (const file of newFiles) {
      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", "theatre")

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        const data = await response.json()
        setImages(prev => [...prev, {
          id: `temp-${Date.now()}`,
          url: data.url,
          alt_text: file.name
        }])
      } catch (error) {
        console.error("Error uploading image:", error)
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        })
      }
    }

    setUploadingImages(prev => prev.filter(f => !newFiles.includes(f)))
  }

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.some(tag => tag.name === newTag.trim())) {
      setTags(prev => [...prev, {
        id: `temp-${Date.now()}`,
        name: newTag.trim()
      }])
      setNewTag("")
    }
  }

  const removeTag = (tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const userRole = localStorage.getItem("actingEurope_userRole");
      const response = await fetch(`/api/theatres/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userRole}`
        },
        body: JSON.stringify({
          ...formData,
          images: images.map(img => ({ url: img.url, alt_text: img.alt_text })),
          tags: tags.map(tag => ({ name: tag.name }))
        })
      })

      if (!response.ok) {
        throw new Error("Failed to update theatre")
      }

      toast({
        title: "Success",
        description: "Theatre updated successfully"
      })

      router.push("/admin/theatres")
    } catch (error) {
      console.error("Error updating theatre:", error)
      toast({
        title: "Error",
        description: "Failed to update theatre",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this theatre? This action cannot be undone.")) {
      return
    }

    try {
      const userRole = localStorage.getItem("actingEurope_userRole");
      const response = await fetch(`/api/theatres/${params.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${userRole}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete theatre")
      }

      toast({
        title: "Success",
        description: "Theatre deleted successfully"
      })

      router.push("/admin/theatres")
    } catch (error) {
      console.error("Error deleting theatre:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete theatre",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p>Loading theatre data...</p>
        </div>
      </div>
    )
  }

  if (!theatre) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p>Theatre not found</p>
          <Button onClick={() => router.push("/admin/theatres")} className="mt-4">
            Back to Theatres
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/theatres")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Theatres
            </Button>
            <h1 className="text-3xl font-bold text-secondary-blue">
              Edit Theatre: {fixCompanyName(theatre.name)}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="gap-2"
              disabled={theatre._count.events > 0}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
        {theatre._count.events > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            This theatre has {theatre._count.events} associated events and cannot be deleted.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Edit theatre basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Theatre Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter theatre name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="founded_year">Founded Year</Label>
                <Input
                  id="founded_year"
                  type="number"
                  value={formData.founded_year}
                  onChange={(e) => handleInputChange("founded_year", parseInt(e.target.value))}
                  placeholder="Enter founded year"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="Enter website URL"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="content_language">Content Language</Label>
                <Select
                  value={formData.content_language}
                  onValueChange={(value) => handleInputChange("content_language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bg">Bulgarian</SelectItem>
                    <SelectItem value="mk">Macedonian</SelectItem>
                    <SelectItem value="sr">Serbian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="translation_group">Translation Group</Label>
                <Input
                  id="translation_group"
                  value={formData.translation_group}
                  onChange={(e) => handleInputChange("translation_group", e.target.value)}
                  placeholder="Enter translation group ID"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Upload and manage theatre images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="images">Upload Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="cursor-pointer"
                />
              </div>
              {uploadingImages.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Uploading {uploadingImages.length} image(s)...
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <Image
                      src={image.url}
                      alt={image.alt_text}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Description & History</CardTitle>
            <CardDescription>Edit theatre description and history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter theatre description"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="history">History</Label>
              <Textarea
                id="history"
                value={formData.history}
                onChange={(e) => handleInputChange("history", e.target.value)}
                placeholder="Enter theatre history"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Manage theatre tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter tag name"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag}>Add Tag</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="gap-2">
                    {tag.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag.id)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}