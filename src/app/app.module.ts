import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DynamicLoaderModule } from './loader';
import { Page0 } from '../pages/page0/page0';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginModule, LoginPage } from './login';

@NgModule({
  declarations: [
    MyApp,
    Page0,
    Page1,
    Page2
  ],
  imports: [
    DynamicLoaderModule,
    LoginModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: Page1, name: 'Page1', segment: 'page1/:content' },
        { component: Page2, name: 'Page2', segment: 'page2' }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page0,
    Page1,
    Page2
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
