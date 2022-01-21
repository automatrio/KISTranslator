import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslatorService } from '../../common/services/translator.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  private requestInputText = "Write the text you want to be translated:";

  inputText: string = this.requestInputText;
  translatedText: string = "";

  @ViewChild("inputField", {static: true}) inputField: ElementRef<HTMLInputElement>;

  constructor(private translatorService: TranslatorService) { }

  ngOnInit(): void {
  }

  public clearOutFormForFirstInput() {
    if (this.inputField!.nativeElement.value == this.requestInputText) {
      this.clearOutForm();
    }
  }

  public clearOutForm() {
    this.inputText = "";
  }

  public parseText() {
    const result = this.translatorService.TranslateLine(this.inputText);
    this.translatedText = result;
  }
}
