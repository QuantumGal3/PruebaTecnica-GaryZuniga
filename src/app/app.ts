import { Component, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'PruebaTecnicaCine';
}

