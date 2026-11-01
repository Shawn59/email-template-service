import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './DownloadFile.module.scss';
import type { IDropZoneAtom } from './DownloadFile.types';

export const DownloadFile: FC<IDropZoneAtom> = ({ onAccept, onReject, options, children }) => {
  const { getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length) {
        onAccept(acceptedFiles);
      }
      if (fileRejections.length) {
        onReject(fileRejections[0].file, fileRejections[0].errors[0]);
      }
    },
    ...options,
  });

  return (
    <div onClick={open} className={styles.downloadFile}>
      {children}
      <input {...getInputProps()} />
    </div>
  );
};
