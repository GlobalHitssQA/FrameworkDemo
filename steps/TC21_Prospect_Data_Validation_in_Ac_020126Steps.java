package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ActicenterProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectDataValidationSteps {
    private Page page;
    private ActicenterProspectSearchPage prospectSearchPage;
    private String expectedProspectName;
    private String expectedProspectEmail;

    public ProspectDataValidationSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ActicenterProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter dashboard with Salesforce access")
    public void advisorIsLoggedIntoActicenterDashboard() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.performLogin("advisor@actinver.com", "securePassword123");
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }

    @When("the advisor performs a search query for a known prospect with verified data")
    public void advisorPerformsSearchForKnownProspect() {
        expectedProspectName = "Juan Pérez González";
        expectedProspectEmail = "juan.perez@example.com";
        prospectSearchPage.searchProspect("Juan Pérez");
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect name displayed matches exactly the name stored in Salesforce")
    public void prospectNameMatchesSalesforceData() {
        String displayedName = prospectSearchPage.getFirstProspectName();
        assertEquals("Prospect name should match Salesforce data", expectedProspectName, displayedName);
    }

    @And("the email address displayed matches the electronic email key stored in Salesforce")
    public void emailAddressMatchesSalesforceData() {
        String displayedEmail = prospectSearchPage.getFirstProspectEmail();
        assertEquals("Email address should match Salesforce email key", expectedProspectEmail, displayedEmail);
    }

    @When("the advisor selects a prospect from the search results")
    public void advisorSelectsProspectFromResults() {
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the prospect detailed information is displayed")
    public void prospectDetailedInformationIsDisplayed() {
        assertTrue("Prospect detail view should be visible", prospectSearchPage.isProspectDetailVisible());
    }

    @And("prospects without email addresses in Salesforce are not displayed in search results")
    public void prospectsWithoutEmailAreNotDisplayed() {
        prospectSearchPage.searchProspect("Prospect Without Email");
        prospectSearchPage.waitForSearchResults();
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertEquals("Prospects without email should not appear in results", 0, resultsCount);
    }
}