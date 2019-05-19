import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule,
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

import { ToolbarComponent } from './common/toolbar/toolbar.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { AlphabetMenuComponent } from './common/alphabet-menu/alphabet-menu.component';
import { CustomAlphabetDialogComponent } from './common/alphabet-menu/custom-alphabet-dialog/custom-alphabet-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    AlphabetMenuComponent,
    CustomAlphabetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatSliderModule,
  ],
  entryComponents: [CustomAlphabetDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
