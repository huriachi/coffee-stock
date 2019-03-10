import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { DirectoryEntry, Entry, File, FileEntry } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  constructor(
    private camera: Camera,
    private crop: Crop,
    private file: File
  ) {}

  /**
   * Wrapper function that retrieves a picture from the photo library.
   */
  public getPictureFromAlbum(): Promise<string> {
    return this.getPictureFromSource(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  /**
   * Wrapper function that retrieves a picture from the camera.
   */
  public getPictureFromCamera(): Promise<string> {
    return this.getPictureFromSource(this.camera.PictureSourceType.CAMERA);
  }

  /**
   * Retrieves a picture from the specified source. It allows for cropping.
   * 
   * @param sourceType The source from which to retrieve the photo.
   */
  private getPictureFromSource(sourceType: number): Promise<string> {
    const cameraOptions: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: sourceType,
      correctOrientation: true
    };
    const cropOptions = {quality: 100, targetWidth: -1, targetHeight: -1};

    return this.camera.getPicture(cameraOptions)
      .then((imagePath) => {
        return this.crop.crop(imagePath, cropOptions);
      })
      .then((cropPath) => {        
        return cropPath;
      })
  }

  /**
   * Persists a picture to the local filesystem.
   * 
   * @param picture The path of the picture to persist.
   */
  public savePicture(picture: string) {
    return this.file.resolveLocalFilesystemUrl(picture)
      .then((file) => {
        return this.copyPicture(file);
      });
  }

  /**
   * Removes a picture from the local filesystem.
   * 
   * @param picture The path of the picture to delete.
   */
  public deletePicture(picture: string) {
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(picture)
        .then((file) => {
          file.remove(() => {
            resolve();
          }, (error) => {
            reject(error);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Updates a picture on disk by deleting the previous entry and persisting the
   * new one.
   * 
   * @param newPicture The path of the new picture.
   * @param oldPicture The path of the old picture.
   */
  public updatePicture(newPicture: string, oldPicture: string): Promise<FileEntry | void> {
    if (newPicture !== oldPicture) {
      return this.deletePicture(oldPicture)
        .catch((error) => {
          // The image has not been found.
        })
        .then(() => {
          return this.savePicture(newPicture)
        });
    }
    return Promise.resolve();
  }

  /**
   * Persists a picture to our application directory.
   * 
   * @param file The file to persist.
   */
  private copyPicture(file: Entry): Promise<FileEntry> {
    return new Promise((resolve, reject) => {
      this.checkPictureDirectory()
        .then((directory) => {
          file.copyTo(directory, Date.now().toString(), (entry: FileEntry) => {
            resolve(entry)
          }, (error) => {
            reject(error)
          });
        });
    });
  }

  /**
   * Validates that the picture directory is present and, if not, it creates it.
   */
  private checkPictureDirectory(): Promise<DirectoryEntry> {
    return this.file.checkDir(this.file.dataDirectory, 'pictures')
      .then(() => {
        return this.file.resolveDirectoryUrl(`${this.file.dataDirectory}/pictures`);
      })
      .catch(() => {
        return this.file.createDir(this.file.dataDirectory, 'pictures', false);
      });
  }
}
