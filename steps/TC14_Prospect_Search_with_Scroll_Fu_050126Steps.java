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
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the advisor has accessed the Acticenter dashboard")
    public void theAdvisorHasAccessedTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }
    
    @When("the advisor enters search criteria that returns more than 5 prospect matches")
    public void theAdvisorEntersSearchCriteriaThatReturnsMoreThan5ProspectMatches() {
        prospectSearchPage.enterSearchCriteria("test");
    }
    
    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForResults();
    }
    
    @Then("the first 5 results are displayed on screen")
    public void theFirst5ResultsAreDisplayedOnScreen() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("At least 5 results should be visible", visibleResults >= 5);
    }
    
    @And("a scroll mechanism is available in the results area")
    public void aScrollMechanismIsAvailableInTheResultsArea() {
        assertTrue("Scroll mechanism should be available", prospectSearchPage.isScrollAvailable());
    }
    
    @When("the advisor scrolls down in the results area")
    public void theAdvisorScrollsDownInTheResultsArea() {
        prospectSearchPage.scrollResults();
    }
    
    @Then("additional prospect results beyond the 5th entry are displayed")
    public void additionalProspectResultsBeyondThe5thEntryAreDisplayed() {
        int totalResults = prospectSearchPage.getTotalResultsCount();
        assertTrue("More than 5 results should be available after scrolling", totalResults > 5);
    }
    
    @And("the 6th and subsequent results are accessible through scrolling")
    public void the6thAndSubsequentResultsAreAccessibleThroughScrolling() {
        assertTrue("6th result should be visible after scrolling", prospectSearchPage.isResultVisible(6));
    }
}