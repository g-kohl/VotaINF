import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-date',
  standalone: true,
  templateUrl: './form-date.html',
  styleUrl: './form-date.css'
})
export class FormDate {
  @Input() title: string = '';
  @Input() id: string = '';

}
