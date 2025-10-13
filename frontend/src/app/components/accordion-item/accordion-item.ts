import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RadioButtonComponent } from '../radio-field/radio-field'

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.html',
  styleUrl: './accordion-item.css',
  standalone: true,
  imports: [RadioButtonComponent]
})
export class AccordionItem {
  @Input() title: string = '';
  @Input() itemText: string = '';
  @Input() radioName: string = '';
  @Input() isDisabled: boolean = false;

  private _selectedVote: string = '';
  @Input()
  get selectedVote() {
    return this._selectedVote;
  }
  set selectedVote(val: string) {
    this._selectedVote = val;
    this.selectedVoteChange.emit(val);
  }

  @Output() selectedVoteChange = new EventEmitter<string>();

}