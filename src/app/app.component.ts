import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { PageHeadState } from './states/page-head/page-head.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(PageHeadState.title) pageTitle$;
  @Select(PageHeadState.description) pageDescription$;
}
