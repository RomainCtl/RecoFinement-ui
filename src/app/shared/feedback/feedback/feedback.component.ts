import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  selected: string = 'Reason';

  constructor() { }

  ngOnInit(): void {
  }

  sendFeedback() {
    
  }

}
