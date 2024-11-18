import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../layout/components/footer/footer.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
