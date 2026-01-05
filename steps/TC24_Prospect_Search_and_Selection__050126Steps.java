package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.ProcessSelectionPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private ProcessSelectionPage processSelectionPage;
    private String selectedProspectName;
    private String selectedProspectEmail;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.processSelectionPage = new ProcessSelectionPage(page);
    }

    @Given("the user has accessed the prospect search interface in Acticenter")
    public void accessProspectSearchInterface() {
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Prospect search screen should be displayed");
    }

    @When("the user enters at least 2 characters in the search field")
    public void enterSearchCriteria() {
        prospectSearchPage.enterSearchText("Jo");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays up to 5 matching prospects with name and email")
    public void verifySearchResultsDisplayed() {
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be visible");
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue(resultsCount > 0 && resultsCount <= 5, "Should display up to 5 results");
        assertTrue(prospectSearchPage.isProspectNameVisible(0), "Prospect name should be visible");
        assertTrue(prospectSearchPage.isProspectEmailVisible(0), "Prospect email should be visible");
    }

    @When("the user reviews the search results")
    public void reviewSearchResults() {
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be available for review");
    }

    @Then("the search results display correctly with required information")
    public void verifySearchResultsInformation() {
        assertTrue(prospectSearchPage.getProspectName(0).length() > 0, "Prospect name should not be empty");
        assertTrue(prospectSearchPage.getProspectEmail(0).contains("@"), "Prospect email should be valid");
    }

    @When("the user selects a prospect from the search results")
    public void selectProspectFromResults() {
        selectedProspectName = prospectSearchPage.getProspectName(0);
        selectedProspectEmail = prospectSearchPage.getProspectEmail(0);
        prospectSearchPage.selectProspect(0);
    }

    @Then("the system registers the prospect selection and initiates navigation")
    public void verifyProspectSelectionRegistered() {
        page.waitForTimeout(1000);
        assertNotNull(selectedProspectName, "Selected prospect name should be stored");
        assertNotNull(selectedProspectEmail, "Selected prospect email should be stored");
    }

    @And("the system navigates to the process selection screen")
    public void verifyNavigationToProcessSelection() {
        assertTrue(processSelectionPage.isProcessSelectionScreenVisible(), "Process selection screen should be displayed");
    }

    @And("the selected prospect information is carried over to the new screen")
    public void verifyProspectInformationCarriedOver() {
        String displayedProspectInfo = processSelectionPage.getSelectedProspectInfo();
        assertTrue(displayedProspectInfo.contains(selectedProspectName) || displayedProspectInfo.contains(selectedProspectEmail),
                "Selected prospect information should be available in the new screen");
    }
}