import { Component, Input } from '@angular/core';

@Component({
  selector: 'h-card',
  template: `
  <div class="h-card">
    <img class="h-card__icon" src="assets/tenge.svg" alt="тг"/>
    <div class="h-card__text">{{ text }}</div>
  </div>
  `,
  styles: [
    `
      .h-card {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        width: 150px;
        height: 40px;
        border-radius: 12px;
        background: rgba(12, 197, 130, 0.10);

        &__text {
          color: #000;
          font-family: Open Sans;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        &__icon {
          height: 21px;
        }
      }
    `
  ]
})
export class HCardComponent {
  @Input() text = '';
}
