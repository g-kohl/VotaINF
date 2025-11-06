import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  templateUrl: './form-checkbox.html',
  styleUrl: './form-checkbox.css'
})
export class FormCheckbox {
  @Input() itemId: number = 0;
  @Input() title: string = '';
  @Input() subtitle: Date = new Date;


}
