import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TripService } from './service/trip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(public trip: TripService) {
  }

  test(t) {
    console.log(t);
    this.trip.result$.next(t);
  }
}
