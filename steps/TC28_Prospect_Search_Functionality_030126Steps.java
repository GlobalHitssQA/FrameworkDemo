package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String enteredText;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user has accessed the Acticenter dashboard")
    public void theAdvisorUserHasAccessedTheActicenterDashboard() {
        page.navigate("https://actinver.atlassian.net");
    }

    @And("the dashboard loads successfully with search field visible")
    public void theDashboardLoadsSuccessfullyWithSearchFieldVisible() {
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("the advisor clicks on the prospect search input field")
    public void theAdvisorClicksOnTheProspectSearchInputField() {
        prospectSearchPage.clickSearchField();
    }

    @Then("the search field becomes active and cursor is positioned for input")
    public void theSearchFieldBecomesActiveAndCursorIsPositionedForInput() {
        assertTrue(prospectSearchPage.isSearchFieldFocused(), "Search field should be focused");
    }

    @When("the advisor types alphanumeric characters into the search field")
    public void theAdvisorTypesAlphanumericCharactersIntoTheSearchField() {
        enteredText = "Test123";
        prospectSearchPage.typeInSearchField(enteredText);
    }

    @Then("the characters are accepted and displayed in the search field")
    public void theCharactersAreAcceptedAndDisplayedInTheSearchField() {
        String actualValue = prospectSearchPage.getSearchFieldValue();
        assertEquals(enteredText, actualValue, "Entered text should be displayed in search field");
    }

    @And("the search field accepts prospect name as search criteria")
    public void theSearchFieldAcceptsProspectNameAsSearchCriteria() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("Juan Perez");
        assertFalse(prospectSearchPage.getSearchFieldValue().isEmpty(), "Search field should accept name input");
    }

    @And("the search field accepts electronic email as search criteria")
    public void theSearchFieldAcceptsElectronicEmailAsSearchCriteria() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("test@example.com");
        assertFalse(prospectSearchPage.getSearchFieldValue().isEmpty(), "Search field should accept email input");
    }

    @When("the advisor enters more than 2 characters and clicks the search icon")
    public void theAdvisorEntersMoreThan2CharactersAndClicksTheSearchIcon() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("abc");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search executes and queries Salesforce database")
    public void theSearchExecutesAndQueriesSalesforceDatabase() {
        page.waitForTimeout(2000);
        assertTrue(prospectSearchPage.isSearchExecuted(), "Search should be executed");
    }

    @And("matching results are returned")
    public void matchingResultsAreReturned() {
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed");
    }
}