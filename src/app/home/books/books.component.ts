import { Book } from './../../shared/models/DtoResponse/books/Book.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/media/book.service';
import { BookResponseDto } from 'src/app/shared/models/DtoResponse/books/book-dto.model';
import { PopupComponent } from '../modals/popup/popup.component';

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

  bookResponse: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  nextPage = 2;
  finished = true;
  booksLeft = true;

  ngOnInit(): void {
    this.bookService.getPopularBooks(1).then((result: BookResponseDto) => {
      this.bookResponse = result;
      if (result.number_of_elements !== 0) {
        this.booksLeft = false;
      }
      if (this.nextPage !== this.bookResponse.total_pages) {
        this.finished = false;
      }
    });

  }

  onScroll(): void {
    if (this.nextPage <= this.bookResponse.total_pages) {
      this.getMusics(this.nextPage);
    } else {
      if (!this.booksLeft) {
        this.snackBar.open('You have reached the end of the Internet!', 'Alright!');
      }
      this.finished = true;
    }
  }

  get books(): BookResponseDto {
    return this.bookResponse;
  }

  private getMusics(page?: number): void {
    this.bookService.getPopularBooks(page).then((result: BookResponseDto) => {
      this.bookResponse.content = this.bookResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Book>(PopupComponent, {
      data: this.bookResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'bg-light'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }
  

}
