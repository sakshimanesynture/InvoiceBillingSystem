import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

// Standalone root component
import { App } from './app';

@NgModule({
  declarations: [],  // Standalone components NOT allowed here
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)  // Routes will lazy-load standalone components
  ],
  providers: [],
  bootstrap: [App]   // Standalone root component
})
export class AppModule { }
