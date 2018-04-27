import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let assertion1 = ((elem, conceito) => elem.element(by.name('requisitos')).getText().then(text => text === conceito));
let assertion2 = ((elem, conceito) => elem.element(by.name('gerDeConfiguracao')).getText().then(text => text === conceito));
let sameCPF = ((elem, cpf) => elem.element(by.name('cpf')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nome')).getText().then(text => text === name));
let pAND = ((p,q) => p.then(a => q.then(b => a && b))) 
let fSetaRequisitos = ((elem, aa) => elem.element(by.name('requisitos')).sendKeys(<string> aa));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I can see a student with CPF "([^\"]*)" and Name "([^\"]*)" in the students list$/, async (cpf, name) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='alunos']").click();
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)); 
    })
    Given(/^Logado como "aluno" Na página "auto avaliacao"$/, async () => {
        await $("a[name='metas']").click();
    });

    When(/^Tento realizar a auto-avaliação nas metas "([^\"]*)","([^\"]*)", "([^\"]*)" com os valores "([^\"]*)", "([^\"]*)", "([^\"]*)" para o aluno "([^\"]*)" com o cpf "([^\"]*)"$/, async (conceito1, conceito2, conceito3, aa1, aa2, aa3, nome, cpf) => {
        //var AllAlunos : ElementArrayFinder = element.all(by.name('studentsgrade'));
        var AllAlunos : ElementArrayFinder = element.all(by.repeater('studentsgrade'));
        // var aluno = AllAlunos.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, nome))).then((elem) => (elem[0]).then(x => fSetaRequisitos(x, aa1)));
        var Aluno = AllAlunos.filter(elem => elem.element(by.name('nome')).then(elem => elem.getText())).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)).catch(function(error){
            console.log("Pedro - error: ", error);
        });
        console.log(Aluno);
    });

        // then(elems =>{
            //elems.findByName("requisitos").sendKeys(<string> aa1);
            //elems.findByName("gerDeConfiguracao").sendKeys(<string> aa2);
        //then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)))
        //await $("input[name='requisitos']").sendKeys(<string> conceito1);
        //await $("input[name='gerDeConfiguracao']").sendKeys(<string> conceito2);
    // });

    Then(/^Eu consigo ver as auto avaliações "(.*?)","(.*?)", "(.*?)" com os valores "(.*?)", "(.*?)", "(.*?)" na tela$/, async (conceito1, conceito2, conceito3, aa1, aa2, aa3) => {
        var AllAlunos : ElementArrayFinder = element.all(by.name('studentsgrade'));
        AllAlunos.filter(elem => pAND(assertion1(elem, aa1), assertion2(elem, aa2)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)));
    });
})

