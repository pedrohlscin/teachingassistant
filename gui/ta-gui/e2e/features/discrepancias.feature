@i9n
Feature: Discrepancies
	As a professor
	I want to see discrepancies between self-assessment and my assessment

	Scenario: Discrepancies
		Given that the student "Pedro" has submitted his self-assessment with concept "MA" for goal "Requisitos"
		And professor "Paulo" has assessed student "Pedro" with concept "MANA" for goals "Requisitos"
		When Discrepancies Page is requested by professor "Paulo"
		Then system shows "Pedro" with "Requisitos"

	Scenario: No Discrepancies
    Given that the student "Pedro" has submitted his self-assessment with concept "MANA" for goal "Requisitos"
    And professor "Paulo" has assessed student "Pedro" with concept "MA" for goals "Requisitos"
    When Discrepancies Page is requested by professor "Paulo"
    Then system shows empty list
