import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, translate: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line:deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);

    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
