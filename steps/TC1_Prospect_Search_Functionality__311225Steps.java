package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {

    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as an advisor with Salesforce access")
    public void theUserIsLoggedInAsAnAdvisorWithSalesforceAccess() {
        prospectSearchPage.navigateToLogin();
        prospectSearchPage.loginAsAdvisor();
    }

    @And("the user navigates to the prospect search screen in Acticenter")
    public void theUserNavigatesToTheProspectSearchScreenInActicenter() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Then("the prospect search screen is displayed with the search field available")
    public void theProspectSearchScreenIsDisplayedWithTheSearchFieldAvailable() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search screen should be displayed", prospectSearchPage.isProspectSearchScreenDisplayed());
    }

    @When("the user enters exactly 2 characters in the search field")
    public void theUserEntersExactly2CharactersInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("AB");
    }

    @Then("no search is triggered and the system waits for additional input")
    public void noSearchIsTriggeredAndTheSystemWaitsForAdditionalInput() {
        assertFalse("Search results should not be visible with only 2 characters", 
            prospectSearchPage.areSearchResultsVisible());
        assertFalse("Loading indicator should not appear with only 2 characters", 
            prospectSearchPage.isLoadingIndicatorVisible());
    }

    @When("the user enters a third character in the search field")
    public void theUserEntersAThirdCharacterInTheSearchField() {
        prospectSearchPage.appendSearchText("C");
    }

    @Then("the search is automatically triggered")
    public void theSearchIsAutomaticallyTriggered() {
        prospectSearchPage.waitForSearchToTrigger();
        assertTrue("Search should be triggered after 3 characters", 
            prospectSearchPage.isSearchTriggered());
    }

    @And("the system displays matching prospects from the Salesforce database")
    public void theSystemDisplaysMatchingProspectsFromTheSalesforceDatabase() {
        assertTrue("Search results container should be visible", 
            prospectSearchPage.areSearchResultsVisible());
        assertTrue("At least one prospect result should be displayed", 
            prospectSearchPage.hasProspectResults());
    }
}