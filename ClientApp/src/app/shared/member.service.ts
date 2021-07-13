import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { HttpClient } from "@angular/common/http";

import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private _baseUrl = ''; //"https://coreapi.learn/api/member";

  constructor(private http: HttpClient, config: ConfigService) {
    this._baseUrl = config.baseUrl;
  }

  formData: Member = new Member();
  list: Member[] = [];
  postMember() {
    return this.http.post(this._baseUrl, this.formData);
  }
  putMember() {
    return this.http.put( this._baseUrl + "/" + this.formData.id, this.formData);
  }
  deleteMember(id: number) {
    return this.http.delete(this._baseUrl + "/" + id );
  }
  refreshList() {
    this.http.get(this._baseUrl)
      .toPromise()
      .then(res => this.list = res as Member[]);
  }
}
