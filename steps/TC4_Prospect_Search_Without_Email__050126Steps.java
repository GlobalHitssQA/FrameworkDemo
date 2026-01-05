package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.assertFalse;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String prospectNameWithoutEmail = "Test Prospect No Email";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("a test prospect exists in Salesforce database without email address")
    public void verifyProspectExistsInSalesforceWithoutEmail() {
        // This step assumes the test data has been prepared in Salesforce
        // Typically this would be handled by a database setup or API call
        // For automation purposes, we assume the precondition is met
        System.out.println("Verifying test prospect exists in Salesforce without email address");
    }

    @And("I am logged in to Acticenter as an advisor")
    public void loginAsAdvisor() {
        page.navigate("https://acticenter.actinver.com");
        loginPage.login("advisor_user", "advisor_password");
        loginPage.waitForDashboard();
    }

    @When("I navigate to the prospect search field")
    public void navigateToProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        prospectSearchPage.waitForSearchFieldVisible();
    }

    @And("I search for the prospect that has no email address")
    public void searchForProspectWithoutEmail() {
        prospectSearchPage.enterSearchTerm(prospectNameWithoutEmail);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResultsLoad();
    }

    @Then("the prospect without email address should not be displayed in search results")
    public void verifyProspectNotDisplayed() {
        boolean isProspectDisplayed = prospectSearchPage.isProspectDisplayedInResults(prospectNameWithoutEmail);
        assertFalse("Prospect without email should not be displayed in search results", isProspectDisplayed);
    }
}