package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ProspectSearchPage;
import static org.junit.Assert.assertTrue;

public class ProspectSearchSteps {
    private WebDriver driver;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchSteps(WebDriver driver) {
        this.driver = driver;
        this.prospectSearchPage = new ProspectSearchPage(driver);
    }
    
    @Given("the user is authenticated as an Advisor in Acticenter")
    public void theUserIsAuthenticatedAsAnAdvisor() {
        // Authentication logic would be implemented here
        // This could call a login page or use session tokens
    }
    
    @Given("the user is on the prospect search screen in Acticenter")
    public void theUserIsOnTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search field is not displayed", 
            prospectSearchPage.isSearchFieldDisplayed());
    }
    
    @When("the user enters more than 2 alphanumeric characters that do not match any existing prospect {string}")
    public void theUserEntersNonMatchingCharacters(String searchTerm) {
        prospectSearchPage.enterSearchTerm(searchTerm);
    }
    
    @And("the user clicks the search button or presses enter")
    public void theUserClicksSearchButtonOrPressesEnter() {
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("the system executes the search in the Salesforce database")
    public void theSystemExecutesSearchInSalesforce() {
        prospectSearchPage.waitForSearchToComplete();
        assertTrue("Search was not executed", 
            prospectSearchPage.isSearchCompleted());
    }
    
    @And("a no results message is displayed indicating that no matches were found")
    public void aNoResultsMessageIsDisplayed() {
        assertTrue("No results message is not displayed", 
            prospectSearchPage.isNoResultsMessageDisplayed());
        String expectedMessage = "No se encontraron coincidencias";
        assertTrue("No results message text is incorrect", 
            prospectSearchPage.getNoResultsMessageText().contains(expectedMessage) ||
            prospectSearchPage.getNoResultsMessageText().contains("No results found"));
    }
}