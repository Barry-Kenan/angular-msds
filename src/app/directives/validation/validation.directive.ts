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
import { iconStyles } from './consts/icon-styles';
import { tooltipStyles } from './consts/tooltip-styles';

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
    const transparentPlaceholder = 'transparent-placeholder';

    this.formControl.valueChanges.subscribe(() => {
      if (this.formControl.errors && !parent.contains(this.invalid)) {
        this.addIcon();
        parent.firstChild.classList.add(transparentPlaceholder);
      } else if (parent.contains(this.invalid)) {
        parent.removeChild(this.invalid);
        parent.firstChild.classList.remove(transparentPlaceholder);
      }
    });
  }

  /**
   * для присваивания стилей из Map
   * @param Map Map<string, string>
   * @param place Html element
   */
  private setStyle(Map: Map<string, string>, place: HTMLElement): void {
    Map.forEach((value: string, key: string) => {
      this.renderer.setStyle(place, key, value);
    });
  }

  /**
   * создание tooltip-а
   * @param renderer Renderer2
   */
  private createTooltipPopup(renderer: Renderer2): void {
    const tooltip = document.createElement('div');
    tooltip.innerHTML = this.title;
    tooltip.setAttribute('class', 'tooltip');
    this.setStyle(tooltipStyles, tooltip);
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
    this.setStyle(iconStyles, img);
    if (this.el.nativeElement.parentElement.firstChild.tagName.toLowerCase() === 'input') {
      this.renderer.setStyle(img, 'right', '8px');
    }
    this.renderer.appendChild(div, img);
    div.onmouseover = () => {
      this.createTooltipPopup(this.renderer);
    };
    div.onmouseleave = () => {
      this.myTooltip?.remove();
    };
    this.renderer.appendChild(this.el.nativeElement.parentElement, div);
    this.invalid = div;
  }
}
