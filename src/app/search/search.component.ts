import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TripForm } from '../trip/trip';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  form: TripForm = {
    from: '',
    to: '',
    filter: 'cheapest'
  };

  @Output() search = new EventEmitter();

  constructor() {
  }

  onSubmit() {
    this.search.emit(this.form);
  }

}

