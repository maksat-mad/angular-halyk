import { Component, Input } from '@angular/core';

@Component({
  selector: 'h-button',
  template: `
    <button class="h-button">{{ content }}</button>
  `,
  styles: [
    `
      .h-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #FFF;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
        color: #000;
        font-family: Open Sans;
        font-size: 30px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border: none;
        outline: none;
      }
    `
  ]
})
export class HButtonComponent {
  @Input() content = '';
}
