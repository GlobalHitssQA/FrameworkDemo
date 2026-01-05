package stepdefinitions;

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
    private String prospectWithoutEmail;
    private String prospectWithEmail;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("test data exists with at least one prospect without an email address in Salesforce")
    public void testDataExistsWithProspectWithoutEmail() {
        // Test data setup - this would typically be handled by test data preparation
        this.prospectWithoutEmail = "John Doe No Email";
    }

    @And("I am logged in to Acticenter as an advisor")
    public void iAmLoggedInAsAdvisor() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.login("advisor@actinver.com", "TestPassword123");
        assertTrue("Login should be successful", prospectSearchPage.isLoggedIn());
    }

    @When("I navigate to the prospect search interface")
    public void iNavigateToProspectSearchInterface() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search interface should be visible", prospectSearchPage.isSearchInterfaceVisible());
    }

    @And("I enter search criteria that matches the prospect without email")
    public void iEnterSearchCriteriaThatMatchesProspectWithoutEmail() {
        prospectSearchPage.enterSearchCriteria(prospectWithoutEmail);
    }

    @And("I perform the search")
    public void iPerformTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect without email should not be displayed in the search results")
    public void prospectWithoutEmailShouldNotBeDisplayed() {
        assertFalse("Prospect without email should not appear in results", 
            prospectSearchPage.isProspectInResults(prospectWithoutEmail));
    }

    @And("the system should handle the missing data gracefully without errors")
    public void systemShouldHandleMissingDataGracefully() {
        assertFalse("No error messages should be displayed", prospectSearchPage.hasErrorMessages());
        assertTrue("Search results container should be visible", prospectSearchPage.isSearchResultsVisible());
    }

    @When("I search for prospects with complete data including email")
    public void iSearchForProspectsWithCompleteData() {
        this.prospectWithEmail = "Jane Smith";
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchCriteria(prospectWithEmail);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the system should display prospects with complete information")
    public void systemShouldDisplayProspectsWithCompleteInformation() {
        assertTrue("Prospect with complete data should be displayed", 
            prospectSearchPage.isProspectInResults(prospectWithEmail));
        assertTrue("Search results should contain at least one prospect", 
            prospectSearchPage.getSearchResultsCount() > 0);
    }

    @And("only prospects with required information should be selectable")
    public void onlyProspectsWithRequiredInformationShouldBeSelectable() {
        assertTrue("Prospects with complete data should be selectable", 
            prospectSearchPage.isProspectSelectable(prospectWithEmail));
    }

    @And("each displayed prospect should show name and email address")
    public void eachDisplayedProspectShouldShowNameAndEmail() {
        assertTrue("Prospect should display name", prospectSearchPage.prospectHasName(prospectWithEmail));
        assertTrue("Prospect should display email", prospectSearchPage.prospectHasEmail(prospectWithEmail));
    }
}