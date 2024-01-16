import { ModuleWithProviders, NgModule } from "@angular/core";


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [
    
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [],
    };
  }
}