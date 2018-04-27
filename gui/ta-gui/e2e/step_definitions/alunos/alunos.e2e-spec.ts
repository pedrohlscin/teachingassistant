import { defineSupportCode } from 'cucumber';
import { StudentsPage } from './alunos.po';

defineSupportCode(({ Given, When, Then }) => {
  const chai = require('chai');
  const chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
  chai.should();
  const expect = chai.expect;

  const page = new StudentsPage();

  Given(/^I am at the students page$/, () => {
    page.navigateTo();
    expect(page.getTitle()).to.eventually.equal('TaGui');
    page.getAlunosLink().click();
  });

  Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, (cpf) => {
    page.getAlunosCPFs()
      .filter(element => element.getText().then(value => value === cpf))
      .then(value => expect(value.length).to.equal(0));
  });

  When(/^I try to register the student "([^\"]*)" with CPF "(\d*)"$/, (name, cpf) => {
    page.getNomeInput().sendKeys(name as string);
    page.getCPFInput().sendKeys(cpf as string);
    page.getAdicionarButton().click();
  });

  Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, (name, cpf) => {
    page.getAlunosRows()
      .filter(element => page.getAlunoNome(element).then(value => value === name) && page.getAlunoCPF(element).then(value => value === cpf))
      .then(value => expect(value.length).to.equal(1));
  });
});
