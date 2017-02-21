import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  private content: string; 
  private data: any; 

  constructor(
    public navCtrl: NavController,
    private http: Http
    ) {
      this.http.get("/assets/content/page1.html").subscribe(content => {
        this.content = content.text();
        this.http.get("/assets/content/model.json").subscribe(data => {
          this.data = data.json();
        });
      });
  }

}
