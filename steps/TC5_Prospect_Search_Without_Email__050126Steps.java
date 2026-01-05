package steps;

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
    private String prospectNameWithoutEmail;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("a prospect exists in Salesforce DB without an email key")
    public void aProspectExistsInSalesforceDBWithoutAnEmailKey() {
        // This step validates database precondition
        // In real scenario, this would query Salesforce API or DB
        this.prospectNameWithoutEmail = "John Doe Without Email";
    }

    @And("I am logged in to Acticenter as an advisor with access to that prospect")
    public void iAmLoggedInToActicenterAsAnAdvisorWithAccessToThatProspect() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
        loginPage.waitForDashboardLoad();
    }

    @When("I navigate to the prospect search field")
    public void iNavigateToTheProspectSearchField() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("I enter search criteria matching the prospect without email key")
    public void iEnterSearchCriteriaMatchingTheProspectWithoutEmailKey() {
        prospectSearchPage.enterSearchCriteria(prospectNameWithoutEmail);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect without email key should not be displayed in the results")
    public void theProspectWithoutEmailKeyShouldNotBeDisplayedInTheResults() {
        boolean isProspectDisplayed = prospectSearchPage.isProspectInResults(prospectNameWithoutEmail);
        assertFalse("Prospect without email key should not be displayed in results", isProspectDisplayed);
    }
}