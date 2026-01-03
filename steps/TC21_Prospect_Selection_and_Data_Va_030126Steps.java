package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.ProspectDetailsPage;
import static org.junit.Assert.*;

public class ProspectSelectionSteps {
    private Page page;
    private ProspectSearchPage searchPage;
    private ProspectDetailsPage detailsPage;
    private String originalProspectName;
    private String originalProspectEmail;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.searchPage = new ProspectSearchPage(page);
        this.detailsPage = new ProspectDetailsPage(page);
    }

    @Given("I have executed a prospect search with multiple results")
    public void iHaveExecutedProspectSearchWithMultipleResults() {
        searchPage.navigateToDashboard();
        searchPage.performSearch("test");
    }

    @And("the search results display prospect names and email information")
    public void theSearchResultsDisplayProspectNamesAndEmailInfo() {
        assertTrue("Search results should be visible", searchPage.areResultsVisible());
        assertTrue("Prospect names should be displayed", searchPage.isProspectNameVisible());
        assertTrue("Prospect emails should be displayed", searchPage.isProspectEmailVisible());
    }

    @When("I select a specific prospect from the results list")
    public void iSelectSpecificProspectFromResultsList() {
        originalProspectName = searchPage.getFirstProspectName();
        originalProspectEmail = searchPage.getFirstProspectEmail();
        searchPage.selectFirstProspect();
    }

    @Then("the selected prospect should be highlighted and marked")
    public void theSelectedProspectShouldBeHighlightedAndMarked() {
        assertTrue("Selected prospect should be highlighted", searchPage.isProspectSelected());
    }

    @When("I proceed to the next screen")
    public void iProceedToNextScreen() {
        searchPage.clickConfirmSelection();
        detailsPage.waitForPageLoad();
    }

    @Then("I should see the prospect name displayed correctly")
    public void iShouldSeeProspectNameDisplayedCorrectly() {
        String displayedName = detailsPage.getProspectName();
        assertNotNull("Prospect name should be displayed", displayedName);
        assertTrue("Prospect name should not be empty", !displayedName.isEmpty());
    }

    @And("I should see the prospect email displayed completely")
    public void iShouldSeeProspectEmailDisplayedCompletely() {
        String displayedEmail = detailsPage.getProspectEmail();
        assertNotNull("Prospect email should be displayed", displayedEmail);
        assertTrue("Email should contain @ symbol", displayedEmail.contains("@"));
    }

    @And("all relevant prospect information should be accessible")
    public void allRelevantProspectInformationShouldBeAccessible() {
        assertTrue("Prospect name field should be visible", detailsPage.isProspectNameVisible());
        assertTrue("Prospect email field should be visible", detailsPage.isProspectEmailVisible());
        assertTrue("Additional prospect data should be visible", detailsPage.areAdditionalFieldsVisible());
    }

    @And("the prospect data should match the original Salesforce record")
    public void theProspectDataShouldMatchOriginalSalesforceRecord() {
        String displayedName = detailsPage.getProspectName();
        String displayedEmail = detailsPage.getProspectEmail();
        
        assertEquals("Prospect name should match original selection", originalProspectName, displayedName);
        assertEquals("Prospect email should match original selection", originalProspectEmail, displayedEmail);
        assertTrue("No data corruption should have occurred", detailsPage.validateDataIntegrity());
    }
}