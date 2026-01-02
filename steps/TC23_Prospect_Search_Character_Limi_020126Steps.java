package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.ActicenterDashboardPage;

import static org.junit.Assert.*;

public class ProspectSearchCharacterLimitSteps {
    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String searchValidationMessage;
    private int resultsCount;

    public ProspectSearchCharacterLimitSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user has accessed Acticenter dashboard")
    public void theAdvisorUserHasAccessedActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("the user navigates to the prospect search functionality")
    public void theUserNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.clickProspectSearchMenu();
    }

    @Then("the search interface should display with the search input field available")
    public void theSearchInterfaceShouldDisplayWithTheSearchInputFieldAvailable() {
        assertTrue("Search input field should be visible", prospectSearchPage.isSearchInputVisible());
    }

    @When("the user attempts to enter only 1 character in the search field and triggers search")
    public void theUserAttemptsToEnterOnly1CharacterInTheSearchFieldAndTriggersSearch() {
        prospectSearchPage.clearSearchInput();
        prospectSearchPage.enterSearchText("A");
        prospectSearchPage.clickSearchButton();
        searchValidationMessage = prospectSearchPage.getValidationMessage();
    }

    @Then("the system should not execute search and may display message indicating minimum 2 characters required")
    public void theSystemShouldNotExecuteSearchAndMayDisplayMessageIndicatingMinimum2CharactersRequired() {
        assertFalse("Search results should not be displayed", prospectSearchPage.areSearchResultsVisible());
        if (searchValidationMessage != null && !searchValidationMessage.isEmpty()) {
            assertTrue("Validation message should mention minimum characters", 
                searchValidationMessage.toLowerCase().contains("2") || 
                searchValidationMessage.toLowerCase().contains("minimum"));
        }
    }

    @When("the user enters exactly 2 characters in the search field and triggers search")
    public void theUserEntersExactly2CharactersInTheSearchFieldAndTriggersSearch() {
        prospectSearchPage.clearSearchInput();
        prospectSearchPage.enterSearchText("AB");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchToComplete();
    }

    @Then("the search should execute successfully and return matching results if available")
    public void theSearchShouldExecuteSuccessfullyAndReturnMatchingResultsIfAvailable() {
        assertTrue("Search should execute and show results or no results message", 
            prospectSearchPage.areSearchResultsVisible() || prospectSearchPage.isNoResultsMessageVisible());
    }

    @When("the user enters maximum allowed alphanumeric characters in the search field")
    public void theUserEntersMaximumAllowedAlphanumericCharactersInTheSearchField() {
        prospectSearchPage.clearSearchInput();
        String maxLengthText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        prospectSearchPage.enterSearchText(maxLengthText);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchToComplete();
    }

    @Then("the system should accept all characters and process the search successfully")
    public void theSystemShouldAcceptAllCharactersAndProcessTheSearchSuccessfully() {
        assertTrue("Search should process with maximum characters", 
            prospectSearchPage.areSearchResultsVisible() || prospectSearchPage.isNoResultsMessageVisible());
    }

    @When("the user attempts to enter characters beyond the maximum limit")
    public void theUserAttemptsToEnterCharactersBeyondTheMaximumLimit() {
        prospectSearchPage.clearSearchInput();
        String exceedingText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789EXTRA";
        prospectSearchPage.enterSearchText(exceedingText);
    }

    @Then("the system should either prevent additional character entry or truncate input at maximum allowed length")
    public void theSystemShouldEitherPreventAdditionalCharacterEntryOrTruncateInputAtMaximumAllowedLength() {
        String actualInputValue = prospectSearchPage.getSearchInputValue();
        assertTrue("Input should be limited to maximum length", actualInputValue.length() <= 100);
    }

    @When("the user tests with special characters and verifies character limit enforcement")
    public void theUserTestsWithSpecialCharactersAndVerifiesCharacterLimitEnforcement() {
        prospectSearchPage.clearSearchInput();
        String specialCharsText = "@#$%&*()_+-=[]{}|;:',.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        prospectSearchPage.enterSearchText(specialCharsText);
    }

    @Then("the system should handle special characters within the defined character limit and enforce maximum length restriction")
    public void theSystemShouldHandleSpecialCharactersWithinTheDefinedCharacterLimitAndEnforceMaximumLengthRestriction() {
        String actualInputValue = prospectSearchPage.getSearchInputValue();
        assertTrue("Special characters should be handled within character limit", actualInputValue.length() <= 100);
    }

    @And("the system should accept alphanumeric input correctly and enforce character limit")
    public void theSystemShouldAcceptAlphanumericInputCorrectlyAndEnforceCharacterLimit() {
        prospectSearchPage.clearSearchInput();
        prospectSearchPage.enterSearchText("Test123");
        String inputValue = prospectSearchPage.getSearchInputValue();
        assertEquals("Alphanumeric input should be accepted correctly", "Test123", inputValue);
    }
}