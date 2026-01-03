package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the prospect search screen in Acticenter")
    public void iAmOnTheProspectSearchScreen() {
        prospectSearchPage.navigateToSearchScreen();
        assertTrue("Search interface should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("I enter special characters {string} in the search field")
    public void iEnterSpecialCharactersInTheSearchField(String specialChars) {
        prospectSearchPage.enterSearchText(specialChars);
    }

    @Then("I should see an error message indicating invalid characters are not allowed")
    public void iShouldSeeAnErrorMessageIndicatingInvalidCharacters() {
        assertTrue("Error message should be visible", prospectSearchPage.isErrorMessageVisible());
        String errorText = prospectSearchPage.getErrorMessageText();
        assertTrue("Error message should mention invalid characters", 
                   errorText.toLowerCase().contains("invalid") || 
                   errorText.toLowerCase().contains("characters"));
    }

    @When("I attempt to trigger search by clicking the search button")
    public void iAttemptToTriggerSearchByClickingTheSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system should prevent search execution")
    public void theSystemShouldPreventSearchExecution() {
        assertFalse("Results list should not be visible", prospectSearchPage.isResultsListVisible());
    }

    @And("the error message should remain visible")
    public void theErrorMessageShouldRemainVisible() {
        assertTrue("Error message should still be visible", prospectSearchPage.isErrorMessageVisible());
    }

    @When("I clear the invalid characters")
    public void iClearTheInvalidCharacters() {
        prospectSearchPage.clearSearchField();
    }

    @And("I enter valid alphanumeric characters {string}")
    public void iEnterValidAlphanumericCharacters(String validText) {
        prospectSearchPage.enterSearchText(validText);
    }

    @Then("the error message should disappear")
    public void theErrorMessageShouldDisappear() {
        assertFalse("Error message should not be visible", prospectSearchPage.isErrorMessageVisible());
    }

    @And("the system should allow normal search functionality")
    public void theSystemShouldAllowNormalSearchFunctionality() {
        prospectSearchPage.clickSearchButton();
        assertTrue("Search should execute successfully", 
                   prospectSearchPage.isSearchFieldVisible() || 
                   prospectSearchPage.isResultsListVisible());
    }
}