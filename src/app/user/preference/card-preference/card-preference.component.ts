import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-preference',
  templateUrl: './card-preference.component.html',
  styleUrls: ['./card-preference.component.scss']
})
export class CardPreferenceComponent implements OnInit {

  selected: boolean = false;

  @Input() title: string;
  @Input() author: string;
  @Input() note: number;

  constructor() { }

  ngOnInit(): void {
    if (this.note == undefined) {
      this.note = 0
    } 
  }

  onClick() {
   
  }

}
