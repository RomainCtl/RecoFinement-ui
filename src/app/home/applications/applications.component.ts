import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from 'src/app/services/media/application.service';
import { ApplicationResponseDto } from 'src/app/shared/models/DtoResponse/application.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(
    private appService: ApplicationService,
    private mainSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay
  ) { }

  appResponse: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  nextPage = 3;
  finished = true;
  noApplications = true;

  ngOnInit(): void {
    this.appService.getApplications(2).then((result: ApplicationResponseDto) => {
      this.appResponse = result;
      if (result.number_of_elements !== 0) {
        this.noApplications = false;
      }
      if (this.nextPage !== this.appResponse.total_pages) {
        this.finished = false;
      }
    });
  }

  private getApplications(page?: number): void {
    this.appService.getApplications(page).then((result: ApplicationResponseDto) => {
      this.appResponse.content = this.appResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  get applications(): ApplicationResponseDto {
    return this.appResponse;
  }

  onScroll(): void {
    if (this.nextPage <= this.appResponse.total_pages) {
      this.getApplications  (this.nextPage);
    } else {
      if (!this.noApplications) {
        this.mainSnackBar.open('You have reached the end of the Internet!', 'Alright!');
      }
      this.finished = true;
    }
  }
}
