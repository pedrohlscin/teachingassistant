import { browser, by, element } from 'protractor';

export class StudentsPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getTitle() {
    return browser.getTitle();
  }

  public getAlunosLink() {
    return element(by.id('alunosLink'));
  }

  public getAlunosRows() {
    return element.all(by.className('alunoRow'));
  }

  public getAlunosCPFs() {
    return element.all(by.className('cpfValue'));
  }

  public getAlunoNome(el) {
    return el.element(by.className('nomeValue')).getText();
  }

  public getAlunoCPF(el) {
    return el.element(by.className('cpfValue')).getText();
  }

  public getNomeInput() {
    return element(by.id('nomeInput'));
  }

  public getCPFInput() {
    return element(by.id('cpfInput'));
  }

  public getAdicionarButton() {
    return element(by.id('adicionarButton'));
  }
}
