import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let assertion1 = ((elem, conceito) => elem.element(by.name('requisitos')).getText().then(text => text === conceito));
let assertion2 = ((elem, conceito) => elem.element(by.name('requisitos')).getText().the2(text => text === conceito));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Logado como "([^\"]*)" Na página "([^\"]*)"$/, async (logado, page) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
    });

    When(/^Tento realizar a auto-avaliação nas metas "([^\"]*)","([^\"]*)", "([^\"]*)" com os valores "([^\"]*)", "([^\"]*)", "([^\"]*)""$/, async (conceito1, conceito2, conceito3, aa1, aa2, aa3) => {
        await $("input[name='requisitos']").sendKeys(<string> conceito1);
        await $("input[name='gerDeConfiguracao']").sendKeys(<string> conceito2);
    });

    Then(/^Eu consigo ver as auto avaliações "(.*?)","(.*?)", "(.*?)" com os valores "(.*?)", "(.*?)", "(.*?)" na tela$/, async (conceito1, conceito2, conceito3, aa1, aa2, aa3) => {
        var requisitos : ElementArrayFinder = element.all(by.name('requisitos'));
        var samerequisitos = requisitos.filter(elem => assertion1(elem,conceito1));
        var gerConf : ElementArrayFinder = element.all(by.name('gerDeConfiguracao'));
        var sameGerConf = gerConf.filter(elem => assertion2(elem,conceito2));
        //var samenamecpf = allmetas.filter(elem => sameCPF(elem,cpf) && sameName(elem,name));
        //await samenamecpf;
        await samerequisitos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await sameGerConf.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})
