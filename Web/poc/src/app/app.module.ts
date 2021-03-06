import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CtxComponent } from './ctx.component';
import { MetadataComponent } from './metadata.component';
import { AccessViewComponent } from './accessView.component';

import { XrmServiceModule, XrmStateService, XrmService, XrmContextService, XrmInterceptor, XrmConfigService, MetadataService } from './xrm/index'

const xrmInitializerFn = (appConfig: XrmConfigService) => {
  return () => {
    return appConfig.loadAppConfig('/assets/xrmConfig.json');
  };
};

@NgModule({
  declarations: [
    AppComponent,
    CtxComponent,
    MetadataComponent,
    AccessViewComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      XrmServiceModule
  ],
  providers: [
      XrmConfigService,
      {  provide: APP_INITIALIZER, useFactory: xrmInitializerFn, multi: true, deps: [XrmConfigService] },
      XrmStateService,
      XrmService,
      XrmContextService,
      MetadataService,
      { provide: HTTP_INTERCEPTORS, useClass: XrmInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
