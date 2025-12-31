package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.Assert.assertTrue;

public class ProspectWithoutEmailSteps {
    
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private static final String PROSPECT_WITHOUT_EMAIL = "Juan Perez Sin Correo";
    
    public ProspectWithoutEmailSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the user is logged in as an advisor")
    public void theUserIsLoggedInAsAnAdvisor() {
        // Precondition: User should already be authenticated as advisor
        // This step assumes login was handled in a previous scenario or hook
        assertTrue("User should be logged in as advisor", prospectSearchPage.isAdvisorDashboardVisible());
    }
    
    @And("the user is on the prospect search screen in Acticenter")
    public void theUserIsOnTheProspectSearchScreenInActicenter() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenDisplayed());
    }
    
    @When("the user searches for a prospect without email address in Salesforce")
    public void theUserSearchesForAProspectWithoutEmailAddressInSalesforce() {
        prospectSearchPage.enterSearchTerm(PROSPECT_WITHOUT_EMAIL);
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("the prospect appears in the search results")
    public void theProspectAppearsInTheSearchResults() {
        assertTrue("Prospect should appear in search results", 
            prospectSearchPage.isProspectVisibleInResults(PROSPECT_WITHOUT_EMAIL));
    }
    
    @When("the user selects the prospect without email address from the results")
    public void theUserSelectsTheProspectWithoutEmailAddressFromTheResults() {
        prospectSearchPage.selectProspectFromResults(PROSPECT_WITHOUT_EMAIL);
    }
    
    @Then("the system displays an error message indicating the prospect has no email registered in Salesforce")
    public void theSystemDisplaysAnErrorMessageIndicatingTheProspectHasNoEmailRegisteredInSalesforce() {
        assertTrue("Error message should be visible", prospectSearchPage.isErrorMessageVisible());
        String errorMessage = prospectSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate missing email", 
            errorMessage.contains("no tiene correo") || 
            errorMessage.contains("sin correo electrónico") ||
            errorMessage.contains("email address") ||
            errorMessage.contains("no email"));
    }
}