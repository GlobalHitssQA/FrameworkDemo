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
    private String searchQuery = "Jo";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into Acticenter dashboard as an advisor user")
    public void iAmLoggedIntoActicenterDashboardAsAdvisorUser() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue("Dashboard should be accessible", prospectSearchPage.isDashboardLoaded());
        assertTrue("Search functionality should be accessible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("I enter at least 2 characters in the prospect search field")
    public void iEnterAtLeastTwoCharactersInProspectSearchField() {
        prospectSearchPage.enterSearchQuery(searchQuery);
    }

    @And("I execute the search")
    public void iExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results should be displayed with matching prospects from Salesforce")
    public void theSearchResultsShouldBeDisplayedWithMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsVisible());
        assertTrue("At least one result should be present", prospectSearchPage.getResultsCount() > 0);
    }

    @And("the results should show prospect name and email with highlighted matching characters")
    public void theResultsShouldShowProspectNameAndEmailWithHighlightedMatchingCharacters() {
        assertTrue("Prospect names should be visible", prospectSearchPage.isFirstResultNameVisible());
        assertTrue("Prospect emails should be visible", prospectSearchPage.isFirstResultEmailVisible());
        assertTrue("Highlighted text should be present", prospectSearchPage.hasHighlightedText());
    }

    @And("the first 5 coincidences should be presented on screen")
    public void theFirstFiveCoincidencesShouldBePresentedOnScreen() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("At least 1 result should be visible", visibleResults >= 1);
        assertTrue("No more than 5 results should be initially visible", visibleResults <= 5);
    }

    @And("scroll functionality should be available if more than 6 results exist")
    public void scrollFunctionalityShouldBeAvailableIfMoreThanSixResultsExist() {
        int totalResults = prospectSearchPage.getResultsCount();
        if (totalResults > 6) {
            assertTrue("Scroll should be available for more than 6 results", prospectSearchPage.isScrollAvailable());
        }
    }
}