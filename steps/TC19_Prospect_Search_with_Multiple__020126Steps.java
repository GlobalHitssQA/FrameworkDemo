package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String searchTerm = "Mar";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter with prospect search access")
    public void theAdvisorIsLoggedIntoActicenterWithProspectSearchAccess() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }

    @When("the advisor enters a search term that matches multiple prospects")
    public void theAdvisorEntersASearchTermThatMatchesMultipleProspects() {
        prospectSearchPage.enterSearchTerm(searchTerm);
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.executeSearch();
    }

    @Then("the search results should display with matching characters highlighted in bold")
    public void theSearchResultsShouldDisplayWithMatchingCharactersHighlightedInBold() {
        assertTrue("Results should be visible", prospectSearchPage.areResultsVisible());
        assertTrue("Highlighted text should be present", prospectSearchPage.isHighlightedTextPresent());
    }

    @And("the first 5 matching results should be presented on the screen")
    public void theFirst5MatchingResultsShouldBePresentedOnTheScreen() {
        int resultCount = prospectSearchPage.getVisibleResultsCount();
        assertTrue("At least 5 results should be visible", resultCount >= 5);
    }

    @And("the scroll functionality should be available when more than 5 results exist")
    public void theScrollFunctionalityShouldBeAvailableWhenMoreThan5ResultsExist() {
        if (prospectSearchPage.getTotalResultsCount() > 5) {
            assertTrue("Scroll should be available", prospectSearchPage.isScrollAvailable());
        }
    }
}