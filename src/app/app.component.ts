import { Photo } from './modals/photo';
import { PhotoService } from './service/photo/photo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  /**
   *
   */
  constructor(private photoService: PhotoService) {

  }

  photos: Photo[] = [];
  totalItems: number = 0;
  pageNo: number = 1;
  maxResultCount = 12;
  searchText: string = "";

  ngOnInit(): void {
    this.getPhotos(this.pageNo, this.maxResultCount, "");
  }


  getPhotos(pageNo: number, maxResultCount: number, searchText: string) {
    this.photos=[];
    this.photoService.getPhotos()
      .subscribe(response => {
        console.log("photoService response", response);
        //this.photos = response;
        console.log("photos array", this.photos);
        console.log("pageNo", pageNo);
        console.log("maxResultCount", maxResultCount);
        console.log("searchText", searchText);
        if (searchText != "") {
          response.forEach(element => {
            if (element.title.includes(searchText)) {
              this.photos.push(element);
            }
          });
          console.log("photos after search", this.photos);
        }
        else {
          this.photos = response;
          console.log("photos without search", this.photos);
        }

        this.photos = this.photos.slice((pageNo - 1) * maxResultCount, pageNo * maxResultCount)
      });
  }

  onKeyUp(searchText: string) {
    console.log("onKeyUp search", searchText);
    this.searchText = searchText;
    this.getPhotos(this.pageNo, this.maxResultCount, this.searchText);
  }

  onPagination(pageNo:number)
  {
    this.pageNo=pageNo;
    this.getPhotos(this.pageNo, this.maxResultCount, this.searchText);
  }

  onPrevious()
  {
    if (this.pageNo>0) {
      this.pageNo--;
    }
    this.getPhotos(this.pageNo, this.maxResultCount, this.searchText);
  }
  onNext()
  {
    this.pageNo++;
    this.getPhotos(this.pageNo, this.maxResultCount, this.searchText);
  }
}
