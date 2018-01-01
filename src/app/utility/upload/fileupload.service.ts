import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import {FileUpload} from './fileupload';

@Injectable()
export class UploadFileService {
  constructor() {}

  pushFileToStorage(
    fileUpload: FileUpload,
    basePath: string,
    progress: { percentage: number },
    fileUploaded: { data: Array<FileUpload> }): Promise<any> {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${basePath}/${fileUpload.file.name}`).put( fileUpload.file );

    fileUploaded.data.push( fileUpload );

    return new Promise(( resolve, reject ) => {
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot ) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;

          progress.percentage = Math.round(( snap.bytesTransferred / snap.totalBytes ) * 100);
          fileUpload.progress = progress.percentage;
        },
        ( error ) => {
          // fail
          console.log( error );

          reject({ success: false, error: error });
        },
        () => {
          // success
          fileUpload.url = uploadTask.snapshot.downloadURL;
          fileUpload.name = fileUpload.file.name;
          fileUpload.complete = true;

          resolve({ success: true, file: fileUpload });
        }
      );
    });

  }

  public deleteFileUpload(fu: FileUpload, basePath: string) {
    this.deleteFileStorage( fu.name, basePath );
  }

  private deleteFileStorage(name: string, basePath: string ) {
    const storageRef = firebase.storage().ref();

    storageRef.child(`${basePath}/${name}`).delete()
      .catch(error => console.error( error ) );
  }
}
