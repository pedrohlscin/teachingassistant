import { defineSupportCode } from 'cucumber';
import { StudentsPage } from '../alunos/alunos.po';
import { SelfAssessmentPage } from './autoAvaliacao.po';

defineSupportCode(({ Given, When, Then }) => {
  const chai = require('chai');
  const chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
  chai.should();
  const expect = chai.expect;

  const page = new SelfAssessmentPage();

  Given(/^that student "([^\"]*)" is registered/, (name) => {
    const studentsPage = new StudentsPage();
    studentsPage.navigateTo();
    studentsPage.getAlunosLink().click();
    studentsPage.getNomeInput().sendKeys(name as string);
    studentsPage.getAdicionarButton().click();
  });

  Given(/^I am at Self-Assessment Page/, () => {
    page.navigateTo();
    page.getAutoAvaliacaoLink().click();
  });

  Given(/^there are "([^\"]*)" and "([^\"]*)" goals to be self-assess$/, (g0, g1) => {
    page.getTHs()
      .filter(element => element.getText().then(value => value === g0 || value === g1))
      .then(value => expect(value.length).to.equal(2));
  });

  When(/^"([^\"]*)" assesses the goals "([^\"]*)" and "([^\"]*)" with concept "([^\"]*)"$/, (name, g0, g1, concept) => {
    page.getG0(name as string).sendKeys(concept as string);
    page.getG1(name as string).sendKeys(concept as string);
  });

  Then(/^goals "([^\"]*)" and "([^\"]*)" of "([^\"]*)" are assessed with concept "([^\"]*)"$/, (g0, g1, name, concept) => {
    expect(page.getG0(name as string).getText()).to.eventually.equal(concept as string);
    expect(page.getG1(name as string).getText()).to.eventually.equal(concept as string);
  });
});
