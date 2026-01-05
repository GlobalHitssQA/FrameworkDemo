package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

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
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be displayed");
    }

    @When("the advisor enters a prospect name in the search field")
    public void theAdvisorEntersAProspectNameInTheSearchField() {
        prospectSearchPage.enterProspectName("John Doe");
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results are displayed")
    public void theSearchResultsAreDisplayed() {
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be displayed");
    }

    @And("each prospect entry shows the prospect name and electronic email")
    public void eachProspectEntryShowsTheProspectNameAndElectronicEmail() {
        assertTrue(prospectSearchPage.isProspectNameDisplayed(), "Prospect name should be visible");
        assertTrue(prospectSearchPage.isProspectEmailDisplayed(), "Prospect email should be visible");
    }

    @And("the advisor can distinguish between different prospects")
    public void theAdvisorCanDistinguishBetweenDifferentProspects() {
        int prospectCount = prospectSearchPage.getProspectResultCount();
        assertTrue(prospectCount > 0, "At least one prospect should be displayed");
        assertTrue(prospectSearchPage.hasUniqueProspectIdentifiers(), "Each prospect should have unique identifiers");
    }

    @And("the prospect entry is selectable")
    public void theProspectEntryIsSelectable() {
        assertTrue(prospectSearchPage.isFirstProspectSelectable(), "Prospect entry should be selectable");
    }
}