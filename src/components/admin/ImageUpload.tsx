"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, ImagePlus } from "lucide-react";
import { uploadImage } from "@/lib/upload";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setError("");
      setUploading(true);

      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      try {
        const url = await uploadImage(file);
        onChange(url);
        setPreview(url);
      } catch {
        setError("Upload gagal. Coba lagi.");
        setPreview(value || null);
      } finally {
        setUploading(false);
        URL.revokeObjectURL(localPreview);
      }
    },
    [onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
  });

  const handleRemove = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative group rounded-xl border border-gray-200 bg-gray-50 p-2">
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full rounded-lg object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
              Ganti Gambar
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
          } ${uploading ? "pointer-events-none opacity-50" : ""}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
              <p className="mt-3 text-sm text-gray-500">Uploading...</p>
            </>
          ) : isDragActive ? (
            <>
              <ImagePlus className="h-10 w-10 text-blue-500" />
              <p className="mt-3 text-sm font-medium text-blue-600">
                Lepaskan file di sini...
              </p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="mt-3 text-sm font-medium text-gray-700">
                Klik atau seret gambar ke sini
              </p>
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG, WEBP (maks. 5MB)
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}

      {value && !uploading && (
        <p className="mt-1.5 text-xs text-gray-400 truncate">
          URL: {value}
        </p>
      )}
    </div>
  );
}
