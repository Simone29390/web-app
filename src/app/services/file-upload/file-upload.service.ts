import {Injectable} from '@angular/core';
import {StringUtils} from "../../utility/string.utils";

@Injectable()
export class FileUploadService {
  public UNSUPPORTED_EXTENSION: number = 1;
  public NO_FILE_SELECTED: number = 2;

  constructor(  ) { }

  /**
   *
   * @param evt
   * @param {string} fileType
   * @returns {any}
   */
  public getFile( evt: any, fileType: string ) : any {
    let tgt = evt.target || window.event.srcElement,
        files = tgt.files,
        fileTypeMatch;

    // Check mimeType
    fileTypeMatch = Boolean(
      files && files.length &&
      files[0].type.match( fileType )
    );

    // If file type mismatch, advice current user with MatSnackBar
    if( !fileTypeMatch )
        return { success: false, error: this.UNSUPPORTED_EXTENSION };

    // Check file object
    if ( files && files.length )
      return { success: true, file: files[ 0 ] };

    return { success: false, error: this.NO_FILE_SELECTED };
  }

  /**
   *
   * @param {File} file
   * @returns {Promise<string | number>}
   */
  public getBase64( file: File ) : Promise<string | number> {
    // Wrap of this object
    let self = this;

    // FileReader support
    if ( FileReader && file ) {
      let fr = new FileReader();

      fr.readAsDataURL( file );

      return new Promise(( resolve ) => {
        fr.onload = function () {
          resolve( fr.result );
        };
      });
    } else {
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
      return new Promise(( resolve, reject ) => {
        reject( self.NO_FILE_SELECTED );
      });
    }
  }
}
