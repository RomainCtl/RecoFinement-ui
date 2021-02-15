import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../notification/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _errors = new BehaviorSubject<{error: string}>({error: ''});
  private dataStore = { error: ''};
  readonly errors = this._errors.asObservable();

  // Error message handling
  msg400error = 'The request sent by your browser is malformed or unauthorized. Please try again.';
  msg401error = 'You have been automatically logged out and redirected to the login page.';
  msg403error = 'You are not authorized to access the page you requested.';
  msg404error = 'The page you requested does not exist.';
  msg500error = 'An error occurred in the processing of your request.';
  msg504error = 'The server did not respond.';

  constructor(
    private snackBar: MatSnackBar
  ) { }

  addError(errorMsg: string): void {
    this.dataStore = {error: errorMsg};
    this._errors.next(Object.assign({}, this.dataStore));

    this.snackBar.open(errorMsg, 'Okay', {
      duration: 3000,
      horizontalPosition: 'start'
    });

    // this.toastService.show(errorMsg, {
    //   classname: 'text-danger',
    //   delay: 10000 ,
    //   autohide: true,
    //   headertext: 'An error has occured...'
    // });
  }
}
