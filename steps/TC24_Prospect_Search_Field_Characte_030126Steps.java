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
    private String initialSearchString;
    private String extendedSearchString;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor has accessed the Acticenter dashboard")
    public void theAdvisorHasAccessedTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
    }

    @And("the prospect search input field is displayed")
    public void theProspectSearchInputFieldIsDisplayed() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the advisor enters an alphanumeric string of 2 characters")
    public void theAdvisorEntersAnAlphanumericStringOf2Characters() {
        initialSearchString = "AB";
        prospectSearchPage.enterSearchText(initialSearchString);
    }

    @Then("the search executes and returns matching results")
    public void theSearchExecutesAndReturnsMatchingResults() {
        prospectSearchPage.clickSearchButton();
        assertTrue("Results should be displayed", prospectSearchPage.areResultsDisplayed());
    }

    @When("the advisor continues typing to create a string of 50 or more characters")
    public void theAdvisorContinuesTypingToCreateAStringOf50OrMoreCharacters() {
        extendedSearchString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz012345678901234567890";
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText(extendedSearchString);
    }

    @Then("the search field accepts all characters without truncation")
    public void theSearchFieldAcceptsAllCharactersWithoutTruncation() {
        String actualValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("Search field should contain full string", extendedSearchString, actualValue);
        assertEquals("String length should be preserved", extendedSearchString.length(), actualValue.length());
    }

    @And("the search processes the full string and returns matching results from Salesforce")
    public void theSearchProcessesTheFullStringAndReturnsMatchingResultsFromSalesforce() {
        prospectSearchPage.clickSearchButton();
        assertTrue("Search should execute with full string", prospectSearchPage.isSearchCompleted());
    }

    @And("no maximum character limit is imposed on the search field")
    public void noMaximumCharacterLimitIsImposedOnTheSearchField() {
        String maxLengthAttribute = prospectSearchPage.getSearchFieldMaxLength();
        assertTrue("No maxlength attribute should be set or should be very high", 
                   maxLengthAttribute == null || maxLengthAttribute.isEmpty() || Integer.parseInt(maxLengthAttribute) >= 1000);
    }
}