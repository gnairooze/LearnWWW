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

function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return config.load()
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
