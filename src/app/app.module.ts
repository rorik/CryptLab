import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSliderModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToolbarComponent } from './common/toolbar/toolbar.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { AlphabetMenuComponent } from './common/alphabet-menu/alphabet-menu.component';
import { CustomAlphabetDialogComponent } from './common/alphabet-menu/custom-alphabet-dialog/custom-alphabet-dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, ToolbarComponent, SidenavComponent, AlphabetMenuComponent, CustomAlphabetDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    /* Material */
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSliderModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [
    /* Material */
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSliderModule
  ],
  entryComponents: [CustomAlphabetDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
