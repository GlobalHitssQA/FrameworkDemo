package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String testProspectName = "John Doe";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor has accessed the Acticenter dashboard")
    public void theAdvisorHasAccessedTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }

    @When("the advisor locates the prospect search field")
    public void theAdvisorLocatesTheProspectSearchField() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }

    @When("the advisor enters a valid prospect name in the search field")
    public void theAdvisorEntersAValidProspectNameInTheSearchField() {
        prospectSearchPage.enterProspectName(testProspectName);
        assertEquals("Input should be accepted", testProspectName, prospectSearchPage.getSearchFieldValue());
    }

    @When("the advisor triggers the search action")
    public void theAdvisorTriggersTheSearchAction() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should be displayed filtered by the prospect name")
    public void theSearchResultsShouldBeDisplayedFilteredByTheProspectName() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("Results should contain filtered data", prospectSearchPage.hasSearchResults());
    }
}