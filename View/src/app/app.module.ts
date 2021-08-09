import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SelectALGComponent} from './components/select-alg/select-alg.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FileDragNDropDirective} from './directives/file-drag-n-drop.directive';
import {DropZoneComponent} from './components/drop-zone/drop-zone.component';
import {DialogConfirmComponent} from './components/dialog-confirm/dialog-confirm.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {HighchartsChartModule} from 'highcharts-angular';
import {GraphComponent} from './components/graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectALGComponent,
    FileDragNDropDirective,
    DropZoneComponent,
    DialogConfirmComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    NgxCsvParserModule,
    FormsModule,
    HighchartsChartModule,
    NoopAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
