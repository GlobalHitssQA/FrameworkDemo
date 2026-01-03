package steps;

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

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is on the Acticenter dashboard prospect search interface")
    public void userIsOnProspectSearchInterface() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search interface should be visible", 
                   prospectSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters at least 2 characters in the search field")
    public void userEntersCharactersInSearchField() {
        prospectSearchPage.enterSearchText("Te");
        prospectSearchPage.clickSearchButton();
    }

    @Then("matching prospects are displayed in the results")
    public void matchingProspectsAreDisplayed() {
        assertTrue("Search results should be visible", 
                   prospectSearchPage.areResultsDisplayed());
        assertTrue("At least one prospect should be in results", 
                   prospectSearchPage.getResultsCount() > 0);
    }

    @And("prospects without email key in Salesforce are not displayed")
    public void prospectsWithoutEmailKeyNotDisplayed() {
        assertTrue("All displayed prospects should have email keys", 
                   prospectSearchPage.allProspectsHaveEmailKey());
    }

    @When("the user selects a prospect with valid email key from the results")
    public void userSelectsProspectWithValidEmail() {
        prospectSearchPage.selectFirstProspectWithEmail();
    }

    @Then("the selected prospect information is displayed with name and email key")
    public void selectedProspectInfoDisplayed() {
        assertTrue("Prospect name should be displayed", 
                   prospectSearchPage.isProspectNameDisplayed());
        assertTrue("Prospect email should be displayed", 
                   prospectSearchPage.isProspectEmailDisplayed());
        assertFalse("Prospect name should not be empty", 
                    prospectSearchPage.getProspectName().isEmpty());
        assertFalse("Prospect email should not be empty", 
                    prospectSearchPage.getProspectEmail().isEmpty());
    }

    @And("the system continues to the AGAS-43 selection process flow")
    public void systemContinuesToSelectionProcess() {
        assertTrue("Selection process flow should be initiated", 
                   prospectSearchPage.isSelectionProcessFlowVisible());
    }
}