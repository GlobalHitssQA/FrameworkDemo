package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchScrollSteps {

    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchScrollSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged into Acticenter as an authorized advisor")
    public void theUserIsLoggedIntoActicenterAsAnAuthorizedAdvisor() {
        loginPage.navigateToLogin();
        loginPage.login(System.getenv("ADVISOR_USERNAME"), System.getenv("ADVISOR_PASSWORD"));
    }

    @And("the Acticenter dashboard is displayed")
    public void theActicenterDashboardIsDisplayed() {
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardDisplayed());
    }

    @When("the user accesses the prospect search functionality")
    public void theUserAccessesTheProspectSearchFunctionality() {
        prospectSearchPage.clickProspectSearchButton();
    }

    @And("the user enters a search term with at least 2 characters returning more than 6 results")
    public void theUserEntersASearchTermWithAtLeast2CharactersReturningMoreThan6Results() {
        prospectSearchPage.enterSearchTerm("test");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the initial 5 prospect results are displayed on screen")
    public void theInitial5ProspectResultsAreDisplayedOnScreen() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertEquals("Initial 5 results should be displayed", 5, visibleResults);
    }

    @And("each result shows the prospect name and electronic email")
    public void eachResultShowsTheProspectNameAndElectronicEmail() {
        assertTrue("Each result should display prospect name", prospectSearchPage.allResultsShowProspectName());
        assertTrue("Each result should display electronic email", prospectSearchPage.allResultsShowEmail());
    }

    @When("the user scrolls down in the results area")
    public void theUserScrollsDownInTheResultsArea() {
        prospectSearchPage.scrollDownResultsArea();
    }

    @Then("additional results beyond the first 5 are loaded and displayed")
    public void additionalResultsBeyondTheFirst5AreLoadedAndDisplayed() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("More than 5 results should be visible after scrolling", visibleResults > 5);
    }

    @And("at least 6 or more results are visible after scrolling")
    public void atLeast6OrMoreResultsAreVisibleAfterScrolling() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("At least 6 results should be visible", visibleResults >= 6);
    }

    @When("the user continues scrolling through the results")
    public void theUserContinuesScrollingThroughTheResults() {
        prospectSearchPage.scrollToEndOfResults();
    }

    @Then("all prospect coincidences matching the search criteria are accessible")
    public void allProspectCoincidencesMatchingTheSearchCriteriaAreAccessible() {
        assertTrue("All results should be accessible through scrolling", prospectSearchPage.hasReachedEndOfResults());
        int totalResults = prospectSearchPage.getTotalResultsCount();
        int accessibleResults = prospectSearchPage.getAccessibleResultsCount();
        assertEquals("All matching results should be accessible", totalResults, accessibleResults);
    }
}