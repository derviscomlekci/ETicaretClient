import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        AdminModule,
        UiModule,
        NgxSpinnerModule,
        SocialLoginModule,
        GoogleSigninButtonModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("accessToken"),
                allowedDomains: ["localhost:7215"]
            }
        })], providers: [
        provideAnimationsAsync(),
        { provide: "baseUrl", useValue: "https://localhost:7215/api", multi: true },
        
        
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: "SocialAuthServiceConfig",
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider("195823090700-9baqnc5h28505kunc1nqd8290dvv9d4i.apps.googleusercontent.com")
                }
              ],
              onError: err => console.log(err)
            } as SocialAuthServiceConfig
          },
    ] })
export class AppModule { }
