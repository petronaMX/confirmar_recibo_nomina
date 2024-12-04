Feature: Confirm payroll receipts
  As a user
  I want to be confirm payroll receipts

  Scenario: Confirm payroll receipts for the last 30 days
    Given I login to system
    When I select HITSS SOLUTIONS subscription
    And I select the LAST 30 DAYS option in the payroll receipt filter
    #And I View unconfirmed receipts
    #Then I should confirm the payroll receipts for the last 30 days
