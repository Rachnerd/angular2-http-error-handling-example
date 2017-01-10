import { browser, element, by } from 'protractor';

export class ErrorHandlingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('eh-root h1')).getText();
  }
}
