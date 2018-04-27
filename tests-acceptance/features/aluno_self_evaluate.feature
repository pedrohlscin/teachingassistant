Feature: As a student
         I want to register my grades
         So that my grades will be saved in system

Scenario: Realizar auto avaliação
Given I can see a student with CPF "111" and Name "Pedro" in the students list
Given Logado como "aluno" Na página "auto avaliacao" 
When Tento realizar a auto-avaliação nas metas "Entender conceitos de requisitos","Especificar conceitos de requisitos com qualidade", "Entender conceitos de gerência de configuração" com os valores "MA", "MPA", "MA" para o aluno "Pedro" com o cpf "111"
Then Eu consigo ver as auto avaliações "Requisitos","Gerencia de configuração", "blabla" com os valores "MA", "MPA", "blabla" na tela