import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appValidation]',
})
export class ValidationDirective implements AfterContentInit {
  @Input() public set appValidation(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  @Input() public text!: string;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', 'assets/icons/Invalid.svg');
  }

  public ngAfterContentInit(): void {
    const img = this.renderer.createElement('img');
    console.log(this.text);

    this.renderer.appendChild(this.elementRef.nativeElement.nextElementSibling, img);
  }
}
