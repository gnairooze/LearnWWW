import { APP_INITIALIZER } from '@angular/core';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { ConfigService } from './shared/config.service';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('../assets/config.json')
        .pipe(
          map((x: any) => {
            config.baseUrl = x.baseUrl;
            console.log("read base url from config | " + config.baseUrl);
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              resolve(false);
            }
            config.baseUrl = 'https://localhost:44362/api/member';
            console.log("set default base url " + config.baseUrl);
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}
@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: load,
    deps: [HttpClient, ConfigService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
