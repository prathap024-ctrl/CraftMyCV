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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = async () => {
    for (const resumeFile of files) {
      const formData = new FormData();
      formData.append("file", resumeFile);

      try {
        const res = await axios.post(
          "https://craftmycv-1.onrender.com/api/chatmodels/analyze",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.data) {
          dispatch(setResumeAnalysis(res.data));
          navigate("/dashboard");
          toast.success("Resume analyzed successfully!");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to analyze resume.");
      }
    }
  };

  const onFileReject = React.useCallback((file, message) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  return (
    <div className="w-full mx-auto space-y-4">
      <FileUpload
        maxFiles={2}
        maxSize={5 * 1024 * 1024}
        className="bg-zinc-800 rounded-2xl p-6"
        value={files}
        onValueChange={setFiles}
        onFileReject={onFileReject}
        multiple
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-white" />
            </div>
            <p className="font-medium text-sm">Drag & drop PDF resume here</p>
            <p className="text-white text-xs">
              Or click to browse (max 2 files, up to 5MB each)
            </p>
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
        onClick={handleUpload}
        disabled={files.length === 0}
        className="w-full bg-green-600 text-white hover:bg-green-700"
      >
        Analyze Resume
      </Button>
    </div>
  );
}

export default FileUploadComponent;
