import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
// INTERFACES
import { ILoginData } from './core/interface/user';
// SERVICES
import { LocalSorageService } from './core/services/local-storage.service';
// STORE
import { setCredentials } from './core/store/login-wrapper.actions';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _localSorageService: LocalSorageService,
    private readonly _store: Store<{credentials: ILoginData}>
  ) { }

  ngOnInit(): void {
    this._store.select('credentials').subscribe((user) => console.log(user));
    const user: ILoginData | null = this._localSorageService.USER.getUser();
    if (user) this._store.dispatch(setCredentials(user));
  }
}
