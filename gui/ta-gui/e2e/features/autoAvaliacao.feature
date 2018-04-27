@i9n
Feature: Self-Assessment
	As a professor
	I want my students to be able to self-assess theirs goals with the concepts: MANA, MPA, and MA
	So that I’m able to compare the concepts given and to review my assessments based on the theirs assessments

	Scenario: Submit Self-Assessment - Pass
		Given that student "Pedro" is registered
    And I am at Self-Assessment Page
		And there are "Requisitos" and "Gerência de Configuração" goals to be self-assess
		When "Pedro" assesses the goals "Requisitos" and "Gerência de Configuração" with concept "MA"
		Then goals "Requisitos" and "Gerência de Configuração" of "Pedro" are assessed with concept "MA"

	Scenario: Submit Self-Assessment - Fail
    Given that student "Pedro" is registered
    And I am at Self-Assessment Page
    And there are "Requisitos" and "Gerência de Configuração" goals to be self-assess
		When "Pedro" assesses the goals "Requisitos" and "Gerência de Configuração" with concept "10"
		Then goals "Requisitos" and "Gerência de Configuração" of "Pedro" are assessed with concept ""
