import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecoFinement';
  welcomeDisplayed = true;
  loginDisplayed = false;
  registerDisplayed = false;

  toggleWelcome(): void {
    if (this.welcomeDisplayed === true) {
      this.welcomeDisplayed = false;
    } else {
      this.welcomeDisplayed = true;
    }
  }

  showLogin(): void {
    this.toggleWelcome();
    this.loginDisplayed = true;
  }

  showRegister(): void {
    this.toggleWelcome();
    this.registerDisplayed = true;
  }
}
