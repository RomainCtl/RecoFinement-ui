import { Book } from './../../shared/models/DtoResponse/books/Book.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/media/book.service';
import { BookResponseDto } from 'src/app/shared/models/DtoResponse/books/book-dto.model';
import { PopupComponent } from 'src/app/shared/modals/popup/popup.component';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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

  searchEmpty = false;
  searchActivated = false;
  searchInput = '';

  nextPage = 2;
  finished = true;
  booksLeft = true;

  appCtrl = new FormControl();
  filteredBooks: Observable<Book[]>;

  ngOnInit(): void {
    this.bookService.getPopularBooks(1).then((result: BookResponseDto) => {
      this.bookResponse = result;
      if (result.number_of_elements !== 0) {
        this.booksLeft = false;
      }
      if (this.nextPage !== this.bookResponse.total_pages) {
        this.finished = false;
      }
      this.filteredBooks = this.appCtrl.valueChanges
      .pipe(
        startWith(''),
        map(book => book ? this._filter(book) : this.books.content.slice())
      );
    });
  }
  private _filter(value: string): Book[] {
    const filterValue = value.toLowerCase();
    return this.books.content.filter(book => book.title.toLowerCase().indexOf(filterValue) === 0);
  }

  onScroll(): void {
    if (this.nextPage <= this.bookResponse.total_pages) {
      this.getBooks(this.nextPage);
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

  private getBooks(page?: number): void {
    this.bookService.getPopularBooks(page).then((result: BookResponseDto) => {
      this.bookResponse.content = this.bookResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  private getSearchedBooks(searchTerm: string): void {
    this.bookService.searchBooks(searchTerm).then((result: BookResponseDto) => {
      this.bookResponse.content = result.content;
      if (this.bookResponse.content.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
    });
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Book>(PopupComponent, {
      data: this.bookResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

  searchBooks(searchTerm: string): void {
    if (searchTerm.length > 3) {
      this.searchActivated = true;
      this.getSearchedBooks(searchTerm);
    }

    if (searchTerm.length === 0) {

      this.bookService.getPopularBooks(1).then((result: BookResponseDto) => {
        this.bookResponse = result;
        this.searchActivated = false;
        if (result.number_of_elements !== 0) {
          this.booksLeft = false;
        }
        if (this.nextPage !== this.bookResponse.total_pages) {
          this.finished = false;
        }
      });
    }
  }

}
