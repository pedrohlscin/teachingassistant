import { defineSupportCode } from 'cucumber';
import { DiscrepanciasPage } from './discrepancias.po';
import { StudentsPage } from '../alunos/alunos.po';
import { SelfAssessmentPage } from '../autoAvaliacao/autoAvaliacao.po';
import { MetasPage } from '../metas/metas.po';

defineSupportCode(({ Given, When, Then }) => {
  const chai = require('chai');
  const chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
  chai.should();
  const expect = chai.expect;

  const page = new DiscrepanciasPage();

  Given(/^that the student "([^\"]*)" has submitted his self-assessment with concept "([^\"]*)" for goal "([^\"]*)"$/, (n, g, c) => {
    const studentsPage = new StudentsPage();
    studentsPage.navigateTo();
    studentsPage.getAlunosLink().click();
    studentsPage.getNomeInput().sendKeys(n as string);
    studentsPage.getAdicionarButton().click();

    const selfAssessmentPage = new SelfAssessmentPage();
    selfAssessmentPage.navigateTo();
    selfAssessmentPage.getAutoAvaliacaoLink().click();
    selfAssessmentPage.getG0(n as string).sendKeys(c as string);
  });

  Given(/^professor "([^\"]*)" has assessed student "([^\"]*)" with concept "([^\"]*)" for goals "([^\"]*)"$/, (p, s, g, c) => {
    const metasPage = new MetasPage();
    metasPage.navigateTo();
    metasPage.getMetasLink().click();
    metasPage.getG0(s as string).sendKeys(c as string);
  });

  When(/^Discrepancies Page is requested by professor "([^\"]*)"$/, (name) => {
    page.navigateTo();
    page.getDiscrepanciasLink().click();
  });

  Then(/^system shows "([^\"]*)" with "([^\"]*)"$/, (name, goal) => {
    page.getAlunosRows()
      .filter(
        element =>
          page.getAlunoNome(element).then(value => value === name)
          &&
          page.getAlunoMetas(element).filter(el => el.getText() === goal).then(value => expect(value.length).to.equal(1)),
      )
      .then(value => expect(value.length).to.equal(1));
  });

  Then(/^system shows empty list$/, () => {
    page.getAlunosRows()
      .then(value => expect(value.length).to.equal(0));
  });
});
