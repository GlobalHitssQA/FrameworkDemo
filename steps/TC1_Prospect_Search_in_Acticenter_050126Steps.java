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

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@example.com", "password123");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @And("the advisor has prospects in the same cell or financial center")
    public void theAdvisorHasProspectsInTheSameCellOrFinancialCenter() {
        // Precondition verification - no action needed
    }

    @When("the advisor navigates to the prospect search section")
    public void theAdvisorNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Then("the prospect search section should be displayed")
    public void theProspectSearchSectionShouldBeDisplayed() {
        assertTrue("Prospect search section should be visible", prospectSearchPage.isProspectSearchSectionVisible());
    }

    @And("the prospect search field should be visible and enabled")
    public void theProspectSearchFieldShouldBeVisibleAndEnabled() {
        assertTrue("Prospect search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Prospect search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }

    @And("the search icon should be visible and enabled")
    public void theSearchIconShouldBeVisibleAndEnabled() {
        assertTrue("Search icon should be visible", prospectSearchPage.isSearchIconVisible());
        assertTrue("Search icon should be enabled", prospectSearchPage.isSearchIconEnabled());
    }

    @When("the advisor performs a search for prospects in the same cell or financial center")
    public void theAdvisorPerformsASearchForProspectsInTheSameCellOrFinancialCenter() {
        prospectSearchPage.searchProspects("same_cell");
    }

    @Then("the system should display the prospect list from Salesforce database")
    public void theSystemShouldDisplayTheProspectListFromSalesforceDatabase() {
        assertTrue("Prospect list should be displayed", prospectSearchPage.isProspectListVisible());
        assertTrue("Prospect list should contain results", prospectSearchPage.getProspectCount() > 0);
    }

    @And("the prospects should be from the same cell or financial center")
    public void theProspectsShouldBeFromTheSameCellOrFinancialCenter() {
        assertTrue("Prospects should be from same cell or financial center", prospectSearchPage.areProspectsFromSameCell());
    }
}