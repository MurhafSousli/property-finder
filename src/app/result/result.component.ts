import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Result } from '../trip/trip';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {

  @Input() data: Result;

  constructor() {
  }

  ngOnInit() {
  }

}
