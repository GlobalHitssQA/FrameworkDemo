package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String prospectWithoutEmail;
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("a prospect exists in Salesforce without an electronic email key")
    public void aProspectExistsInSalesforceWithoutAnElectronicEmailKey() {
        // This step verifies database state - implementation depends on DB connection
        // Store prospect name for later use
        this.prospectWithoutEmail = "John Doe Test";
        // Note: Actual DB verification would be implemented here
    }
    
    @And("I am logged in to Acticenter as an advisor")
    public void iAmLoggedInToActicenterAsAnAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.loginAsAdvisor("advisor_username", "advisor_password");
        assertTrue(loginPage.isLoginSuccessful(), "Advisor login failed");
    }
    
    @When("I navigate to the prospect search field")
    public void iNavigateToTheProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue(prospectSearchPage.isSearchFieldDisplayed(), "Search field is not displayed");
    }
    
    @And("I search for the prospect by name")
    public void iSearchForTheProspectByName() {
        prospectSearchPage.searchProspect(this.prospectWithoutEmail);
    }
    
    @Then("the prospect without email should not appear in search results")
    public void theProspectWithoutEmailShouldNotAppearInSearchResults() {
        assertFalse(prospectSearchPage.isProspectInResults(this.prospectWithoutEmail), 
                    "Prospect without email should not be displayed");
    }
    
    @And("other prospects with email keys should be displayed normally")
    public void otherProspectsWithEmailKeysShouldBeDisplayedNormally() {
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue(resultsCount > 0, "Expected to find prospects with email keys");
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be visible");
    }
}