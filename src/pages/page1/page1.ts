import { Component, NgModule, Compiler, Injector } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TemplateLoader } from '../../app/loader';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  private loadedTemplate: any;
  private data: any;

  constructor(navParams: NavParams, templateLoader: TemplateLoader) {
    const content = navParams.get('content');
    this.loadedTemplate = templateLoader.load(content);
  }
}
