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

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I access the Acticenter dashboard as an advisor user")
    public void iAccessTheActicenterDashboardAsAnAdvisorUser() {
        prospectSearchPage.navigateToDashboard();
        assertTrue(prospectSearchPage.isDashboardDisplayed(), "Dashboard should be displayed successfully");
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToTheProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchScreenDisplayed(), "Search screen should be displayed");
    }

    @Then("the search input field should be displayed according to L&F specifications")
    public void theSearchInputFieldShouldBeDisplayedAccordingToLFSpecifications() {
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
        assertTrue(prospectSearchPage.validateSearchFieldStyling(), "Search field should follow L&F standards");
    }

    @When("I perform a search with valid criteria")
    public void iPerformASearchWithValidCriteria() {
        prospectSearchPage.enterSearchCriteria("test prospect");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results list should follow L&F specifications with proper formatting")
    public void theSearchResultsListShouldFollowLFSpecificationsWithProperFormatting() {
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed");
        assertTrue(prospectSearchPage.validateResultsListStyling(), "Results list should follow L&F specifications");
    }

    @And("the prospect name should be displayed with highlighted matching characters")
    public void theProspectNameShouldBeDisplayedWithHighlightedMatchingCharacters() {
        assertTrue(prospectSearchPage.validateHighlightedText(), "Matching characters should be visually highlighted");
    }

    @And("the email key and prospect name should be displayed with correct styling")
    public void theEmailKeyAndProspectNameShouldBeDisplayedWithCorrectStyling() {
        assertTrue(prospectSearchPage.validateEmailFieldStyling(), "Email field should follow L&F standards");
        assertTrue(prospectSearchPage.validateProspectNameStyling(), "Prospect name should follow L&F standards");
    }
}