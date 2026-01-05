package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String specialCharacters = "@#$%&*";
    private String validInput = "ABC123";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is on the prospect search screen in Acticenter")
    public void theUserIsOnTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search field should be visible", 
                   prospectSearchPage.isSearchFieldVisible());
    }

    @When("the user enters special characters in the search field")
    public void theUserEntersSpecialCharactersInTheSearchField() {
        prospectSearchPage.enterSearchText(specialCharacters);
    }

    @Then("the system should not accept the special characters")
    public void theSystemShouldNotAcceptTheSpecialCharacters() {
        String actualValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should be empty or not contain special characters",
                   actualValue.isEmpty() || !actualValue.contains("@"));
    }

    @When("the user attempts to perform a search with special characters")
    public void theUserAttemptsToPerformASearchWithSpecialCharacters() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system should display a validation message indicating special characters are not allowed")
    public void theSystemShouldDisplayAValidationMessage() {
        assertTrue("Validation message should be visible",
                   prospectSearchPage.isValidationMessageVisible());
        String validationText = prospectSearchPage.getValidationMessageText();
        assertTrue("Validation message should mention special characters",
                   validationText.toLowerCase().contains("special characters") ||
                   validationText.toLowerCase().contains("invalid") ||
                   validationText.toLowerCase().contains("not allowed"));
    }

    @When("the user clears the search field and enters valid alphanumeric characters")
    public void theUserClearsTheSearchFieldAndEntersValidCharacters() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText(validInput);
    }

    @Then("the system should accept the alphanumeric input and allow the search to proceed")
    public void theSystemShouldAcceptTheAlphanumericInput() {
        String actualValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("Search field should contain the valid input", validInput, actualValue);
        assertTrue("Search button should be enabled",
                   prospectSearchPage.isSearchButtonEnabled());
    }
}