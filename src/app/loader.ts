import { Compiler, Injectable, Inject, Component, NgModule, Input, ComponentFactory, Injector, ReflectiveInjector, NgModuleFactory, Type } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import {fromPromise} from 'rxjs/observable/fromPromise';

export type DynamicTemplateData = { type: Type<any>, ngModuleFactory: NgModuleFactory<any>, injector: Injector };

@Component({
  selector: 'dynamic-template',
  template: `
   <ng-container *ngComponentOutlet="data?.type; ngModuleFactory: data?.ngModuleFactory; injector: data?.injector "></ng-container>
  `
})
export class DynamicTemplate {
  @Input() data: DynamicTemplateData;
}

@Injectable()
export class TemplateLoader {
  constructor(private http: Http, private compiler: Compiler, private parentInjector: Injector) { }

  load(content: string): Observable<DynamicTemplateData> {
    const data = `/assets/content/${content}/model.json`;
    const template = `/assets/content/${content}/template.html`;
    return this.http.get(data).mergeMap(resp => this.loadComponent(template, resp.json()));
  }

  private loadComponent(template: string, data:any):Observable<DynamicTemplateData> {
    return this.http.get(template).mergeMap(content => {
      const promise = this.compileAtRuntime(content.text()).then(([ngModuleFactory, type]) => {
        const injector = ReflectiveInjector.resolveAndCreate([{provide: 'data', useValue: data}], this.parentInjector);
         return { type, ngModuleFactory, injector };
      });
      return fromPromise(promise);
    });
  }

  /**
   * After moving to Solution 2 this function will be removed and replaced with an http (or systemjs) call
   * to the backend thart will return the NgModuleFactory and the type.
   */
  private compileAtRuntime(template: string): Promise<[NgModuleFactory<any>, Type<any>]> {
    @Component({selector: 'loaded-component', template})
    class LoadedComponent {
      constructor(@Inject('data') private data:any) {}
    }

    @NgModule({
      declarations: [LoadedComponent],
      entryComponents: [LoadedComponent],
      imports: [CommonModule]
    })
    class LoadedModule { }

    return this.compiler.compileModuleAsync(LoadedModule).then(f => [f, LoadedComponent]);
  }
}

@NgModule({
  declarations: [DynamicTemplate],
  imports: [CommonModule],
  exports: [DynamicTemplate],
  providers: [TemplateLoader]
})
export class DynamicLoaderModule {}