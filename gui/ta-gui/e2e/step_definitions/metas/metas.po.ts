import { browser, by, element } from 'protractor';

export class MetasPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getMetasLink() {
    return element(by.id('metasLink'));
  }

  public getG0(name: string) {
    return element(by.id(`${name}G0`));
  }
}
