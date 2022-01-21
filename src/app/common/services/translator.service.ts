import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  constructor() { }

  isCapitalRegExp = new RegExp(/^[A-Z]/);
  prefixRegExp = new RegExp(/^([^AaEeIiOoUuYy]+)(?=[AaEeIiOoUuYy])./);
  isNumeric = new RegExp(/([\d]+)/);
  hasConsonants = new RegExp(/([^AaEeIiOoUuYy])/);
  punctuationRegExp = new RegExp(/([,]+|[.]+|[?]+|[!]+)/);
  nonWhiteSpaceRegExp = new RegExp(/([^\s]+)/g);

  public TranslateLine(line: string) {
    let translatedWords: string[] = [];

    // ES2020
    // var matchedWords = line.matchAll(this.nonWhiteSpaceRegExp);
    // for (const word of matchedWords) {
    //   const translatedWord = this.TranslateWord(word[0]);
    //   translatedWords.push(translatedWord);
    // }

    // ES2017
    let match: RegExpExecArray | null;
    while ((match = this.nonWhiteSpaceRegExp.exec(line)) !== null) {
      const translatedWord = this.TranslateWord(match[0]);
      translatedWords.push(translatedWord);
    }

    return translatedWords.join(' ');
  }

  private TranslateWord(word: string) {
    let prefix = '';
    let stem = '';

    const startsWithCapitalLetter = this.isCapitalRegExp.test(word);
    const wordHasNoConsonants = !this.hasConsonants.test(word);

    const cleanedWord = word.replace(this.punctuationRegExp, '');
    const consonantalPrefixMatch = this.prefixRegExp.exec(cleanedWord);
    const isOrContainsNumber = this.isNumeric.test(cleanedWord);
    const punctuationMatch = this.punctuationRegExp.exec(word);

    if (wordHasNoConsonants) {
      [prefix, stem] =
        this.AlterPrefixAndStem_WordsWithoutConsonants(cleanedWord);
    } else if (consonantalPrefixMatch && consonantalPrefixMatch.length > 0) {
      [prefix, stem] = this.AlterPrefixAndStem_RegularCaseWords(
        cleanedWord,
        consonantalPrefixMatch
      );
    } else if (isOrContainsNumber) {
      return word;
    } else {
      prefix = cleanedWord;
    }

    const translatedWord = this.ComposeWord(
      prefix,
      stem,
      startsWithCapitalLetter
    );
    const originalPunctuation = punctuationMatch ? punctuationMatch[1] : '';

    return translatedWord + originalPunctuation;
  }

  private ComposeWord(
    prefix: string,
    stem: string,
    startsWithCapitalLetter: boolean
  ) {
    var translatedWord = `${stem}${prefix}ay`;

    if (startsWithCapitalLetter) {
      translatedWord =
        translatedWord.substring(0, 1).toUpperCase() +
        translatedWord.substring(1);
    }

    return translatedWord;
  }

  private AlterPrefixAndStem_RegularCaseWords(
    word: string,
    consonantalPrefixMatch: RegExpExecArray
  ) {
    var index = consonantalPrefixMatch[1].length;
    const prefix = consonantalPrefixMatch[1].toLowerCase();
    const stem = word.substring(index);

    return [prefix, stem];
  }

  private AlterPrefixAndStem_WordsWithoutConsonants(word: string) {
    const prefix = 'y';
    const stem = word;

    return [prefix, stem];
  }
}