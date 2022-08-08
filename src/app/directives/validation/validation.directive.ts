import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * директива для отображения svg валидации
 */
@Directive({
  selector: '[appValidation]',
})
export class ValidationDirective implements AfterContentInit {
  /**
   * formControl
   */
  public formControl!: AbstractControl;

  /**
   * текст для tooltip
   */
  public title!: string;

  /**
   * элемент tooltip-а
   */
  private myTooltip!: HTMLSpanElement;

  /**
   * элемент с svg
   */
  private invalid!: HTMLDivElement;

  /**
   * Получение formControl-а
   */
  @Input() public set appValidation(control: AbstractControl) {
    this.formControl = control;
  }

  /**
   * Получение текста
   */
  @Input() public set appValidationText(txt: string) {
    this.title = txt;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  /**
   * добавление и удаление элемента с svg
   */
  public ngAfterContentInit(): void {
    const parent = this.el.nativeElement.parentElement;

    this.formControl.valueChanges.subscribe(() => {
      if (this.formControl.errors) {
        if (!parent.contains(this.invalid)) {
          this.addIcon();
          parent.firstChild.classList.add('transparent-placeholder');
        }
      } else if (parent.contains(this.invalid)) {
        parent.removeChild(this.invalid);
        parent.firstChild.classList.remove('transparent-placeholder');
      }
    });
  }

  /**
   * создание tooltip-а
   * @param renderer Renderer2
   */
  private createTooltipPopup(renderer: Renderer2): void {
    const tooltip = document.createElement('span');
    tooltip.innerHTML = this.title;
    tooltip.setAttribute('class', 'tooltip');
    this.renderer.setStyle(tooltip, 'position', 'absolute');
    this.renderer.setStyle(tooltip, 'width', '200px');
    this.renderer.setStyle(tooltip, 'top', '50%');
    this.renderer.setStyle(tooltip, 'left', '100%');
    this.renderer.setStyle(tooltip, 'padding', '2%');
    this.renderer.setStyle(tooltip, 'z-index', '10');
    this.renderer.setStyle(tooltip, 'transform', 'translateY(-50%');
    this.renderer.setStyle(tooltip, 'font-size', '18px');
    this.renderer.setStyle(tooltip, 'color', '#f27c70');
    this.renderer.setStyle(tooltip, 'text-align', 'left');
    this.renderer.setStyle(tooltip, 'box-shadow', '0 5px 10px 2px rgb(34 60 80 / 20%)');
    this.renderer.setStyle(tooltip, 'background-color', 'white');
    renderer.appendChild(this.el.nativeElement.parentElement, tooltip);
    this.myTooltip = tooltip;
  }

  /**
   * создание элемента с svg
   */
  private addIcon(): void {
    const div = this.renderer.createElement('div');
    this.renderer.setAttribute(div, 'class', 'invalid');
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'alt', this.title);
    this.renderer.setAttribute(img, 'src', 'assets/icons/Invalid.svg');
    this.renderer.setStyle(div, 'position', 'relative');
    this.renderer.setStyle(img, 'position', 'absolute');
    this.renderer.setStyle(img, 'bottom', '8px');
    this.renderer.setStyle(img, 'right', '33px');
    if (this.el.nativeElement.parentElement.firstChild.tagName.toLowerCase() === 'input') {
      this.renderer.setStyle(img, 'right', '8px');
    }
    this.renderer.setStyle(img, 'z-index', '10');
    this.renderer.appendChild(div, img);
    div.onmouseover = () => {
      this.createTooltipPopup(this.renderer);
    };
    div.onmouseleave = () => {
      if (this.myTooltip) {
        this.myTooltip.remove();
      }
    };
    this.renderer.appendChild(this.el.nativeElement.parentElement, div);
    this.invalid = div;
  }
}
