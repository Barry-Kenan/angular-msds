import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, pipe } from 'rxjs';
import {
  CountClearAction,
  CountDecreaseAction,
  CountIncreaseAction,
  CountTextAction,
} from 'src/store/actions/count.actions';
import { CountState } from 'src/store/reducers/count.reducer';
import {
  selectCount,
  selectText,
  selectUpdatedAt,
} from 'src/store/selectors/count.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public count$: Observable<number> = this.store$.pipe(select(selectCount));
  public disableDecrease$: Observable<boolean> = this.count$.pipe(
    map((count) => count <= 0)
  );
  public updateAt$: Observable<number> = this.store$.pipe(
    select(selectUpdatedAt)
  );

  public text = '';

  constructor(private store$: Store<CountState>) {
    this.store$
      .pipe(select(selectText))
      .subscribe((text) => (this.text = text));
  }

  increase() {
    this.store$.dispatch(new CountIncreaseAction());
  }

  decrease() {
    this.store$.dispatch(new CountDecreaseAction());
  }

  clear() {
    this.store$.dispatch(new CountClearAction());
  }

  Send() {
    this.store$.dispatch(new CountTextAction({ text: this.text }));
  }
}
