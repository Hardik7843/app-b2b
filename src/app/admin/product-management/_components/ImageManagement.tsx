"use client";

import { useEffect, useState } from "react";
import { Plus, Upload, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteImage, uploadImage } from "@/actions/admin/Images/Image";
import Image from "next/image";

interface ImageUploaderProps {
  initialImages?: string[];
  onChange?: (urls: string[]) => void;
}

export default function ImageManager({
  initialImages = [],
  onChange,
}: ImageUploaderProps) {
  const [imageInputs, setImageInputs] = useState<
    { sequence: number; image: string; uploading: boolean }[]
  >([]);

  const [uploading, setUploading] = useState(false);

  const [deleting, setDeleting] = useState(false);

  // preload existing images
  useEffect(() => {
    setImageInputs(
      initialImages.map((url, idx) => ({
        sequence: idx + 1,
        image: url,
        uploading: false,
      }))
    );
  }, [initialImages]);

  // push changes up
  useEffect(() => {
    onChange?.(imageInputs.map((i) => i.image).filter(Boolean));
  }, [imageInputs, onChange]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sequence: number
  ) => {
    setUploading(uploading);
    const file = e.target.files?.[0];
    if (!file) return;

    setImageInputs((prev) =>
      prev.map((i) => (i.sequence === sequence ? { ...i, uploading: true } : i))
    );

    try {
      const url = await uploadImage(file);
      setImageInputs((prev) =>
        prev.map((i) =>
          i.sequence === sequence ? { ...i, image: url, uploading: false } : i
        )
      );
    } catch {
      setImageInputs((prev) =>
        prev.map((i) =>
          i.sequence === sequence ? { ...i, uploading: false } : i
        )
      );
    }

    setUploading(false);
  };

  const handleDelete = async (sequence: number, url: string) => {
    setDeleting(true);
    try {
      await deleteImage(url);
      setImageInputs((prev) => prev.filter((i) => i.sequence !== sequence));
    } catch (err) {
      console.error("Delete failed", err);
    }
    setDeleting(false);
  };

  return (
    <div className="space-y-4">
      <div>
        {imageInputs.length > 0 && (
          <div className="flex flex-col md:flex-row gap-2">
            {imageInputs.map((input) => (
              <div
                key={input.sequence}
                className="border rounded-lg p-2 flex flex-col items-center gap-2"
              >
                {input.image ? (
                  <div>
                    <div className="relative aspect-square w-40">
                      <Image
                        // className="rounded-t-2xl"
                        alt="Product Image"
                        fill
                        src={input.image}
                      />
                    </div>
                    <Button
                      disabled={deleting}
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(input.sequence, input.image)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-1">
                    <Upload />
                    <span className="text-sm">
                      {input.uploading ? "Uploading..." : "Upload"}
                    </span>
                    <input
                      disabled={uploading}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, input.sequence)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Button
          className="bg-admin-button-primary"
          type="button"
          onClick={() => {
            if (
              imageInputs.length > 0 &&
              imageInputs[imageInputs.length - 1].image
            ) {
              setImageInputs((prev) => [
                ...prev,
                { sequence: prev.length + 1, image: "", uploading: false },
              ]);
            }
          }}
        >
          <Plus /> Add Image
        </Button>
      </div>
    </div>
  );
}
