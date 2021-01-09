import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { ApplicationResponseDto } from 'src/app/models/DtoResponse/applications/application-dto.model';
import { Application } from 'src/app/models/DtoResponse/applications/application.model';

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
  ) { }

  appResponse: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  nextPage = 2;
  finished = true;
  noApplications = true;
  apiResponse = false;

  searchEmpty = false;
  searchActivated = false;
  searchInput = '';

  appCtrl = new FormControl();
  filteredApplications: Observable<Application[]>;

  ngOnInit(): void {
    this.appService.getPopularApplications().then((result: ApplicationResponseDto) => {
      this.appResponse = result;
      this.apiResponse = true;
      if (result.number_of_elements !== 0) {
        this.noApplications = false;
      }
      if (this.nextPage !== this.appResponse.total_pages) {
        this.finished = false;
      }
      this.filteredApplications = this.appCtrl.valueChanges
      .pipe(
        startWith(''),
        map(app => app ? this._filter(app) : this.applications.content.slice())
      );
    });
  }
  private _filter(value: string): Application[] {
    const filterValue = value.toLowerCase();
    return this.applications.content.filter(app => app.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private getApplications(page?: number): void {
    this.appService.getApplications(page).then((result: ApplicationResponseDto) => {
      this.appResponse.content = this.appResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  private getSearchedApps(searchTerm: string): void {
    this.appService.searchApplications(searchTerm).then((result: ApplicationResponseDto) => {
      this.appResponse.content = result.content;
      if (this.appResponse.content.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
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


  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Application>(PopupComponent, {
      data: this.appResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

  searchApps(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.searchActivated = true;
      this.getSearchedApps(searchTerm);
    }

    if (searchTerm.length === 0) {
      this.appService.getPopularApplications().then((result: ApplicationResponseDto) => {
        this.appResponse = result;
        this.searchActivated = false;
        if (result.number_of_elements !== 0) {
          this.noApplications = false;
        }
        if (this.nextPage !== this.appResponse.total_pages) {
          this.finished = false;
        }
      });
    }
  }
}
