package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private int displayedResults;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        loginPage.verifyDashboardVisible();
    }

    @When("the advisor enters search criteria that returns more than 5 results")
    public void theAdvisorEntersSearchCriteriaThatReturnsMoreThan5Results() {
        prospectSearchPage.enterSearchCriteria("Garcia");
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("exactly 5 prospect entries should be displayed on screen")
    public void exactly5ProspectEntriesShouldBeDisplayedOnScreen() {
        displayedResults = prospectSearchPage.countVisibleProspects();
        assertEquals("Expected exactly 5 visible prospects", 5, displayedResults);
    }

    @And("additional results should be available beyond the first 5")
    public void additionalResultsShouldBeAvailableBeyondTheFirst5() {
        boolean hasMoreResults = prospectSearchPage.hasScrollIndicator() || 
                                prospectSearchPage.hasResultsCounter();
        assertTrue("Expected indication of more results available", hasMoreResults);
    }
}