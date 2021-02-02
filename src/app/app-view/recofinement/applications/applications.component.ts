import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { ApplicationResponseDto } from 'src/app/models/DtoResponse/applications/application-dto.model';
import { Application } from 'src/app/models/DtoResponse/applications/application.model';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(
    private appService: ApplicationService,
    public dialog: MatDialog,
  ) { }

  popularApps: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedAppsForUserFromSimilarContent: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedAppsForUserFromCollaborativeFiltering: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedAppsFromGroupsFromSimilarContent: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  ngOnInit(): void {
    this.appService.getPopularApplications(1).then((result: ApplicationResponseDto) => {
      this.popularApps = result;
    });
    this.appService.getRecommendedAppsForUser('FromSimilarContent').then((result: ApplicationResponseDto) => {
      this.recommendedAppsForUserFromSimilarContent = result;
    });
    this.appService.getRecommendedAppsForUser('CollaborativeFiltering').then((result: ApplicationResponseDto) => {
      this.recommendedAppsForUserFromCollaborativeFiltering = result;
    });
    this.appService.getRecommendedAppsFromGroups('FromSimilarContent').then((result: ApplicationResponseDto) => {
      this.recommendedAppsFromGroupsFromSimilarContent = result;
    });

  }


  openPopUp(app: Application): void {
    const popupDetails = this.dialog.open<PopupComponent, Application>(PopupComponent, {
      data: app,
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }
}
