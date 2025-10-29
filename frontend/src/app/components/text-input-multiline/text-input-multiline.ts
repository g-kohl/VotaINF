import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input-multiline',
  standalone: true,
  templateUrl: './text-input-multiline.html',
  styleUrl: './text-input-multiline.css'
})
export class TextInputMultiline {
  @Input() title: string = '';
  @Input() placeholder: string = '';
}
