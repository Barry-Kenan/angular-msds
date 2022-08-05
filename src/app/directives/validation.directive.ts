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
 * директива для отображения иконки валидации
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
  private myPopup: any;

  /**
   * элемент с svg
   */
  private invalid: any;

  /**
   * Получение formControl-а
   */
  @Input() public set appValidation(control: AbstractControl) {
    this.formControl = control;
  }

  /**
   * Получение текста
   */
  @Input() public set appValidationText(txt: any) {
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
        }
      } else if (parent.contains(this.invalid)) {
        parent.removeChild(this.invalid);
      }
    });
  }

  /**
   * создание tooltip-а
   * @param renderer Renderer2
   */
  private createTooltipPopup(renderer: Renderer2): void {
    const popup = document.createElement('span');
    popup.innerHTML = this.title;
    popup.setAttribute('class', 'tooltip');
    renderer.appendChild(this.el.nativeElement.parentElement, popup);
    this.myPopup = popup;
  }

  /**
   * создание иконки
   */
  private addIcon(): void {
    const div = this.renderer.createElement('div');
    this.renderer.setAttribute(div, 'class', 'invalid');
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'alt', this.title);
    this.renderer.setAttribute(img, 'src', 'assets/icons/Invalid.svg');
    this.renderer.setStyle(div, 'position', 'relative');
    this.renderer.setStyle(img, 'position', 'absolute');
    if (this.el.nativeElement.parentElement.tagName.toLowerCase() === 'div') {
      this.renderer.setStyle(img, 'right', '8px');
    } else {
      this.renderer.setStyle(img, 'right', '30px');
    }
    this.renderer.setStyle(img, 'bottom', '8px');
    this.renderer.setStyle(img, 'z-index', '10');
    this.renderer.appendChild(div, img);
    div.onmouseover = () => {
      this.createTooltipPopup(this.renderer);
    };
    div.onmouseleave = () => {
      if (this.myPopup) {
        this.myPopup.remove();
      }
    };
    this.renderer.appendChild(this.el.nativeElement.parentElement, div);
    this.invalid = div;
  }
}
