import { Component } from '@angular/core';
import { ProgrammingIconsComponent } from './programming-icons/programming-icons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgrammingIconsComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
