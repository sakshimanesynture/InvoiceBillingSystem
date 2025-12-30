import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css'],
  imports: [RouterOutlet]
})
export class App {}
