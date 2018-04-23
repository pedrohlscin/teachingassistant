Feature: As a student
         I want to register my grades
         So that my grades will be saved in system

Scenario: Realizar auto avaliação
Given: Logado como "aluno" Na página "auto avaliacao" 
When: Tento realizar a auto-avaliação nas metas "Entender conceitos de requisitos","Especificar conceitos de requisitos com qualidade", "Entender conceitos de gerência de configuração" com os valores "MA", "MPA", "MA"
Then: Eu consigo ver as auto avaliações "Requisitos","Gerencia de configuração", "blabla" com os valores "MA", "MPA", "blabla" na tela
