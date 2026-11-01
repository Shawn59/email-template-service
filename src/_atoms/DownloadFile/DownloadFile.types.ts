import type { DropzoneOptions, FileError } from 'react-dropzone';

export type onRejectType = (file: File, error: FileError) => void;

export interface IDropZoneAtom {
  onAccept: (files: File[]) => void;
  onReject: onRejectType;
  options: DropzoneOptions;
}
