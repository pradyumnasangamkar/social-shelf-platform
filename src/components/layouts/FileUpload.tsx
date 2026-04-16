import { IKUpload } from "imagekitio-next";
import React, { useState } from "react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

export default function FileUpload({
  onSuccess,
  folderPath = "SocialShelf/uploads",
  FileName = `FIle_Name_${Date.now()}`,
}: {
  onSuccess: (response: IKUploadResponse) => void;
  folderPath?: string;
  FileName?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={FileName}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        folder={folderPath}
        validateFile={(file: File) => {
          const validTypes = ["image/png", "image/jpeg", "image/webp"];
          if (!validTypes.includes(file.type)) {
            setError("Invalid File type ");
          }

          if (file.size > 5 * 1024 * 1024) {
            // 5 megabytes limit
            setError("File size is too Large");
          }

          return true;
        }}
      />

      {uploading && <p className="text-sm text-gray-500"> Uploading...</p>}

      {error && <p className="text-sm text-red-500"> {error} </p>}
    </div>
  );
}
