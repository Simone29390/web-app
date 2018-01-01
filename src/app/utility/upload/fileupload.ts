
export class FileUpload {

  name: string;
  url: string;
  file: File;
  complete: boolean;
  progress: number;

  constructor(file: File) {
    this.file = file;
    this.complete = false;
  }

}
