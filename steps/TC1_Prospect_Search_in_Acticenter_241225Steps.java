package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.ProspectSearchPage;

public class ProspectSearchSteps {
    private WebDriver driver;
    private ProspectSearchPage prospectSearchPage;
    private static final String NON_EXISTENT_PROSPECT = "ZZZ999NonExistentProspect";

    public ProspectSearchSteps(WebDriver driver) {
        this.driver = driver;
        this.prospectSearchPage = new ProspectSearchPage(driver);
    }

    @Given("the user is logged in as an advisor with access to Acticenter")
    public void userIsLoggedInAsAdvisor() {
        // Assuming login is handled in hooks or previous steps
        // This step validates the user session is active
        Assert.assertTrue("User should be logged in", prospectSearchPage.isUserLoggedIn());
    }

    @And("the user has permissions for Banca Patrimonial, Privada or Wealth Management")
    public void userHasRequiredPermissions() {
        // Validation of user permissions - can be verified via API or UI elements
        Assert.assertTrue("User should have required permissions", prospectSearchPage.hasAdvisorPermissions());
    }

    @Given("the user is on the prospect search screen in Acticenter")
    public void userIsOnProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        Assert.assertTrue("Prospect search screen should be displayed", 
            prospectSearchPage.isProspectSearchScreenDisplayed());
    }

    @When("the user enters a search term with more than 2 alphanumeric characters that does not match any existing prospect")
    public void userEntersNonExistentSearchTerm() {
        prospectSearchPage.enterSearchTerm(NON_EXISTENT_PROSPECT);
        Assert.assertTrue("Search term should be accepted", 
            prospectSearchPage.getSearchInputValue().equals(NON_EXISTENT_PROSPECT));
    }

    @And("the user clicks on the search button or presses enter")
    public void userClicksSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system should execute the search in the Salesforce database")
    public void systemExecutesSearchInSalesforce() {
        // Wait for search to complete - verify loading indicator disappears
        prospectSearchPage.waitForSearchToComplete();
        Assert.assertTrue("Search should be executed", prospectSearchPage.isSearchCompleted());
    }

    @And("a message should be displayed indicating that no results were found for the search query")
    public void noResultsMessageIsDisplayed() {
        Assert.assertTrue("No results message should be displayed", 
            prospectSearchPage.isNoResultsMessageDisplayed());
        String actualMessage = prospectSearchPage.getNoResultsMessage();
        Assert.assertFalse("No results message should not be empty", actualMessage.isEmpty());
    }
}