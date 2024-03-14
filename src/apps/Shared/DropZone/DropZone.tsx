import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";
import { Upload } from "@/assets/Icon/Upload";

export const DropZone = ({
  className,
  setFile,
}: {
  className?: string;
  setFile?: any;
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: className,
      })}
    >
      {/* <input {...getInputProps()} className="w-[50px] h-[50px] bg-red-500" /> */}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="w-full flex justify-between items-center px-20">
          <p>Drag files here</p>
          <p>Or</p>
          <div className="input-div text-sm">
            {/* <input className="input" name="file" type="file" /> */}
            Browse
            <Upload className="w-[20px]"/>
          </div>
        </div>
      )}
    </div>
  );
};
