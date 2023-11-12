import { Component, Input } from '@angular/core';

@Component({
  selector: 'h-card',
  template: `
  <div class="h-card" [style.backgroundColor]="bgColorsMap.get(bgColor)">
    <img *ngIf="hasIcon" class="h-card__icon" src="assets/tenge.svg" alt="тг"/>
    <div *ngIf="hasIcon" class="h-card__text">{{ text.substring(0, 3) }} тыс.</div>
    <div *ngIf="!hasIcon" class="h-card__text">{{ text }}</div>
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

        &__text {
          color: #000;
          font-family: Open Sans;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1px;
          text-align: center;
        }

        &__icon {
          height: 12px;
          margin-bottom: 4px;
        }
      }
    `
  ]
})
export class HCardComponent {
  @Input() text: string = '';
  @Input() bgColor: 'green' | 'grey' | 'white' = 'white';
  @Input() hasIcon = false;

  bgColorsMap = new Map<string, string>([
    ['green', '#0CC5821A'],
    ['grey', '#EEEEEE'],
    ['white', '#FFFFFF']
  ]);
}
