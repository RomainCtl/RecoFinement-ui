import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-preference',
  templateUrl: './card-preference.component.html',
  styleUrls: ['./card-preference.component.scss']
})
export class CardPreferenceComponent implements OnInit {

  selected = false;

  @Input() id: number;
  @Input() title: string;
  @Input() author: string;
  @Input() rating: number;
  @Input() cover: string;

  constructor() { }

  ngOnInit(): void { }

}
