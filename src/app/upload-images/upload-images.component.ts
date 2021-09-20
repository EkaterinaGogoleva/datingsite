//tutorial 7
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileService } from '../_services/profile.service';


@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(private ProfileService: ProfileService,) { }

  ngOnInit(): void {
    this.imageInfos = this.ProfileService.getFiles();
  }
 /* The progressInfos is an array that contains items for display upload progress of each images. Each item will have 2 fields: percentage & fileName.

Next we define selectFiles() method. It helps us to get the selected Images that we’re gonna upload.*/

selectFiles(event: any): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;

  this.previews = [];
  if (this.selectedFiles && this.selectedFiles[0]) {
    const numberOfFiles = this.selectedFiles.length;
    for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }
}
/*We use FileReader with readAsDataURL() method to get the image preview URL and put it into previews array. This method produces data as a data: URL representing the file’s data as a base64 encoded string. The URL life is tied to the document in the window on which it was created.

Also use selectedFiles array for accessing current selected Files.

Now we iterate over the selected Files above and call upload() method on each file item. */
uploadFiles(): void {
  this.message = [];

  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
}
//Next we define upload() method for uploading each image:
upload(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };

  if (file) {
    this.ProfileService.upload(file).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.imageInfos = this.ProfileService.getFiles();
        }
      },
      (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
      });
  }
}
/*We use idx for accessing index of the current File to work with progressInfos array. Then we call uploadService.upload() method on the file.

The progress will be calculated basing on event.loaded and event.total.
If the transmission is done, the event will be a HttpResponse object. At this time, we call uploadService.getFiles() to get the files’ information and assign the result to imageInfos variable. */
}
