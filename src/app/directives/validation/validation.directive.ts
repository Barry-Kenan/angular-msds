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
    const popup = document.createElement('span');
    popup.innerHTML = this.title;
    popup.setAttribute('class', 'tooltip');
    this.renderer.setStyle(popup, 'position', 'absolute');
    this.renderer.setStyle(popup, 'width', '200px');
    this.renderer.setStyle(popup, 'top', '50%');
    this.renderer.setStyle(popup, 'left', '100%');
    this.renderer.setStyle(popup, 'padding', '2%');
    this.renderer.setStyle(popup, 'z-index', '10');
    this.renderer.setStyle(popup, 'transform', 'translateY(-50%');
    this.renderer.setStyle(popup, 'font-size', '18px');
    this.renderer.setStyle(popup, 'color', '#f27c70');
    this.renderer.setStyle(popup, 'text-align', 'left');
    this.renderer.setStyle(popup, 'box-shadow', '0 5px 10px 2px rgb(34 60 80 / 20%)');
    this.renderer.setStyle(popup, 'background-color', 'white');
    renderer.appendChild(this.el.nativeElement.parentElement, popup);
    this.myPopup = popup;
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
      if (this.myPopup) {
        this.myPopup.remove();
      }
    };
    this.renderer.appendChild(this.el.nativeElement.parentElement, div);
    this.invalid = div;
  }
}
