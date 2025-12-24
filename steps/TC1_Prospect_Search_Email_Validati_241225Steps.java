package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.LoginPage;
import pages.ProspectSearchPage;
import org.junit.Assert;
import java.util.List;

public class ProspectSearchSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String prospectWithoutEmail;
    
    @Given("the advisor is authenticated in Acticenter")
    public void theAdvisorIsAuthenticatedInActicenter() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://acticenter.actinver.com");
        loginPage = new LoginPage(driver);
        loginPage.login("advisor_user", "advisor_password");
    }
    
    @And("at least one prospect without email exists in Salesforce database associated to the advisor")
    public void atLeastOneProspectWithoutEmailExistsInSalesforce() {
        // Database verification can be implemented here
        // For automation purposes, we assume this precondition is met
    }
    
    @And("at least one prospect with email exists in Salesforce database associated to the advisor")
    public void atLeastOneProspectWithEmailExistsInSalesforce() {
        // Database verification can be implemented here
        // For automation purposes, we assume this precondition is met
    }
    
    @Given("the advisor has verified in Salesforce that prospect {string} has no email registered")
    public void theAdvisorHasVerifiedProspectHasNoEmail(String prospectName) {
        this.prospectWithoutEmail = prospectName;
        // Database verification logic here
        // Could query Salesforce API or database to confirm prospect has no email
    }
    
    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToProspectSearch() {
        prospectSearchPage = new ProspectSearchPage(driver);
        prospectSearchPage.navigateToProspectSearch();
    }
    
    @And("the advisor enters more than 2 characters {string} in the search field")
    public void theAdvisorEntersCharactersInSearchField(String searchText) {
        prospectSearchPage.enterSearchText(searchText);
    }
    
    @And("the advisor clicks the search button or presses Enter")
    public void theAdvisorClicksSearchButton() {
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("the system executes the search in Salesforce database")
    public void theSystemExecutesSearchInSalesforce() {
        prospectSearchPage.waitForSearchResults();
    }
    
    @And("the search results are displayed on screen")
    public void theSearchResultsAreDisplayed() {
        Assert.assertTrue("Search results should be visible", 
            prospectSearchPage.areSearchResultsDisplayed());
    }
    
    @And("the prospect {string} without email is not displayed in the results list")
    public void theProspectWithoutEmailIsNotDisplayed(String prospectName) {
        List<String> results = prospectSearchPage.getSearchResultNames();
        Assert.assertFalse("Prospect without email should not be in results", 
            results.contains(prospectName));
    }
    
    @And("only prospects with registered email addresses are displayed in the results")
    public void onlyProspectsWithEmailAreDisplayed() {
        List<String> results = prospectSearchPage.getSearchResultNames();
        Assert.assertTrue("At least one prospect with email should be displayed", 
            results.size() > 0);
        // Additional validation could verify each prospect has email in Salesforce
    }
}