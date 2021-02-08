import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { CreateBookDtoRequest } from 'src/app/models/DtoRequest/add-media/create_book.model';
import { BookResponseDto } from 'src/app/models/DtoResponse/books/book-dto.model';
import { AddMediaComponent } from 'src/app/shared-features/modals/popup/add-media/add-media.component';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { Book } from '../../../models/DtoResponse/books/Book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(
    private bookService: BookService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  popularBooks: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedBooksForUserFromProfile: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedBooksForUserFromSimilarContent: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedBooksForUserFromCollaborativeFiltering: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedBooksFromGroupsFromProfile: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedBooksFromGroupsFromSimilarContent: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedBooksFromGroupsFromCollaborativeFiltering: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  ngOnInit(): void {
    this.bookService.getPopularBooks(1).then((result: BookResponseDto) => {
      this.popularBooks = result;
    });
    this.bookService.getRecommendedBooksForUser('FromSimilarContent').then((result: BookResponseDto) => {
      this.recommendedBooksForUserFromSimilarContent = result;
    });
    this.bookService.getRecommendedBooksForUser('CollaborativeFiltering').then((result: BookResponseDto) => {
      this.recommendedBooksForUserFromCollaborativeFiltering = result;
    });
    this.bookService.getRecommendedBooksFromGroups('FromSimilarContent').then((result: BookResponseDto) => {
      this.recommendedBooksFromGroupsFromSimilarContent = result;
    })
  }


  openPopUp(book: Book): void {
    const popupDetails = this.dialog.open<PopupComponent, Book>(PopupComponent, {
      data: book,
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

  openAddMedia(): void {
    const popupDetails = this.dialog.open < AddMediaComponent,
      CreateBookDtoRequest > (AddMediaComponent, {
        data: new CreateBookDtoRequest(),
        panelClass: ['shadow-none', 'w-50'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

}
