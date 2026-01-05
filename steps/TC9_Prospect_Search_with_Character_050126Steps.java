package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchTerm = "Ma";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in to the Acticenter dashboard as an advisor")
    public void iAmLoggedInToTheActicenterDashboardAsAnAdvisor() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be loaded", prospectSearchPage.isDashboardLoaded());
    }

    @When("I enter at least 2 characters in the prospect search field")
    public void iEnterAtLeastTwoCharactersInTheProspectSearchField() {
        prospectSearchPage.enterSearchTerm(searchTerm);
    }

    @And("I review the displayed coincidence list")
    public void iReviewTheDisplayedCoincidenceList() {
        prospectSearchPage.waitForSearchResults();
    }

    @Then("a list of matching prospects should be displayed")
    public void aListOfMatchingProspectsShouldBeDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsDisplayed());
        int resultCount = prospectSearchPage.getResultCount();
        assertTrue("At least one result should be displayed", resultCount > 0);
    }

    @And("the matching characters should be highlighted in the prospect names")
    public void theMatchingCharactersShouldBeHighlightedInTheProspectNames() {
        assertTrue("Matching characters should be highlighted", prospectSearchPage.areMatchingCharactersHighlighted(searchTerm));
    }
}