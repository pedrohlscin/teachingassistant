import { browser, by, element } from 'protractor';

export class SelfAssessmentPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getAutoAvaliacaoLink() {
    return element(by.id('autoAvaliacaoLink'));
  }

  public getTHs() {
    return element.all(by.tagName('th'));
  }

  public getG0(name: string) {
    return element(by.id(`${name}G0`));
  }

  public getG1(name: string) {
    return element(by.id(`${name}G1`));
  }
}
