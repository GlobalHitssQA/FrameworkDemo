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
    private static final String PARTIAL_EMAIL = "test@domain";
    private static final String MIN_SEARCH_CHARS = "te";
    private static final String LONG_EMAIL_INPUT = "verylongemailaddresswithmorethan50characters@testdomain.com";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into Acticenter as an advisor")
    public void iAmLoggedIntoActicenterAsAnAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        // Login logic would be implemented here based on actual authentication flow
    }

    @And("the dashboard loads successfully with search functionality available")
    public void theDashboardLoadsSuccessfullyWithSearchFunctionalityAvailable() {
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be visible");
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("I enter a partial email address with at least 2 characters in the search field")
    public void iEnterAPartialEmailAddressWithAtLeast2CharactersInTheSearchField() {
        prospectSearchPage.enterSearchText(MIN_SEARCH_CHARS);
        page.waitForTimeout(500);
        prospectSearchPage.enterSearchText(PARTIAL_EMAIL);
    }

    @Then("the system accepts the partial email input and initiates the search")
    public void theSystemAcceptsThePartialEmailInputAndInitiatesTheSearch() {
        prospectSearchPage.clickSearchButton();
        page.waitForTimeout(1000);
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be displayed");
    }

    @And("all prospects with matching email addresses are displayed")
    public void allProspectsWithMatchingEmailAddressesAreDisplayed() {
        int resultCount = prospectSearchPage.getSearchResultsCount();
        assertTrue(resultCount > 0, "At least one prospect should be found");
    }

    @And("the prospect name and electronic email address are shown for each result")
    public void theProspectNameAndElectronicEmailAddressAreShownForEachResult() {
        assertTrue(prospectSearchPage.isProspectNameVisible(), "Prospect name should be visible");
        assertTrue(prospectSearchPage.isProspectEmailVisible(), "Prospect email should be visible");
    }

    @And("the matching characters in the email are highlighted in bold")
    public void theMatchingCharactersInTheEmailAreHighlightedInBold() {
        assertTrue(prospectSearchPage.isEmailMatchHighlighted(), "Email match should be highlighted in bold");
    }

    @And("the search field accepts alphanumeric characters without maximum limit")
    public void theSearchFieldAcceptsAlphanumericCharactersWithoutMaximumLimit() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText(LONG_EMAIL_INPUT);
        String enteredValue = prospectSearchPage.getSearchFieldValue();
        assertEquals(LONG_EMAIL_INPUT, enteredValue, "Search field should accept long input without truncation");
    }
}