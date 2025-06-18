"use client";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { File, Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setResumeAnalysis } from "@/Store/Slice/Analyser/index";
import { useNavigate } from "react-router-dom";

function FileUploadComponent() {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allowedTypes = ["application/pdf"];

  const handleUpload = async (selectedFile) => {
    if (!selectedFile || !allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a valid PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);
    try {
      const res = await axios.post(
        "https://craftmycv-vc78.onrender.com/api/chatmodels/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data) {
        dispatch(setResumeAnalysis(res.data));
        toast.success("Resume analyzed successfully!");
        setFiles([]); // clear file after success
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Upload error:", error?.response || error.message || error);
      toast.error("Failed to analyze resume.");
    } finally {
      setUploading(false);
    }
  };

  const onFileReject = React.useCallback((file, message) => {
    toast.error(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  return (
    <div className="w-full mx-auto space-y-4">
      <FileUpload
        maxFiles={1}
        multiple={false}
        maxSize={5 * 1024 * 1024}
        className="bg-zinc-800 rounded-2xl p-6"
        value={files}
        onValueChange={setFiles}
        onFileReject={onFileReject}
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-white" />
            </div>
            <p className="font-medium text-sm">Drag & drop your PDF resume</p>
            <p className="text-white text-xs">Only PDF allowed (max 5MB)</p>
          </div>
          <FileUploadTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-fit text-black"
            >
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>

        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file}>
              <File />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>

      <Button
        onClick={() => handleUpload(files[0]?.file ?? files[0])}
        disabled={files.length === 0 || uploading}
        className="w-full bg-green-600 text-white hover:bg-green-700"
      >
        {uploading ? "Analyzing..." : "Analyze Resume"}
      </Button>
    </div>
  );
}

export default FileUploadComponent;
