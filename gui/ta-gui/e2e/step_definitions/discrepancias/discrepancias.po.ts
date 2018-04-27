import { browser, by, element } from 'protractor';

export class DiscrepanciasPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getDiscrepanciasLink() {
    return element(by.id('discrepanciasLink'));
  }

  public getAlunosRows() {
    return element.all(by.className('alunoRow'));
  }

  public getAlunoNome(el) {
    return el.element(by.className('nomeValue')).getText();
  }

  public getAlunoMetas(el) {
    return el.element.all(by.className('meta'));
  }
}
