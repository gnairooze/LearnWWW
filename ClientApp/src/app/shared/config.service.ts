import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly configUrl = 'assets/config.json';
  //start declaration of all config paramters
  baseUrl: string = '';
  //end declaration of all config paramters
  constructor(private http: HttpClient) { }

  load(): (() => Promise<boolean>) {
    return (): Promise<boolean> => {
      return new Promise<boolean>((resolve: (a: boolean) => void): void => {
        this.http.get(this.configUrl)
          .pipe(
            map((x: any) => {
              //start setting the parameters from config file
              this.baseUrl = x.baseUrl;
              //end setting the parameters from config file
              console.log("read base url from config | " + this.baseUrl);
              resolve(true);
            }),
            catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
              if (x.status !== 404) {
                resolve(false);
              }
              //start setting default values of the parameters
              this.baseUrl = 'https://localhost:44362/api/member';
              //end setting default values of the parameters
              console.log("set default base url " + this.baseUrl);
              resolve(true);
              return of({});
            })
          ).subscribe();
      });
    };
  }
}
