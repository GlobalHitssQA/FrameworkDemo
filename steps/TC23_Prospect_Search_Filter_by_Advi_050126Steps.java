package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private int displayedResultsCount;
    private String selectedProspectCell;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter with assigned cell or financial center")
    public void theAdvisorIsLoggedInToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(loginPage.isDashboardDisplayed(), "Dashboard should be displayed after login");
    }

    @When("the advisor navigates to the prospect search interface")
    public void theAdvisorNavigatesToProspectSearchInterface() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Prospect search screen should be displayed");
    }

    @And("the advisor enters at least 2 characters in the search field")
    public void theAdvisorEntersCharactersInSearchField() {
        prospectSearchPage.enterSearchQuery("Jo");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays up to 5 matching results")
    public void theSystemDisplaysUpToFiveResults() {
        displayedResultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue(displayedResultsCount > 0, "At least one result should be displayed");
        assertTrue(displayedResultsCount <= 5, "Maximum 5 results should be displayed");
    }

    @And("the results contain only prospects assigned to the advisor's cell or financial center")
    public void theResultsContainOnlyAssignedProspects() {
        assertTrue(prospectSearchPage.areAllProspectsInAdvisorCell(), "All prospects should belong to advisor's cell");
    }

    @When("the advisor verifies that prospects from other cells are not included")
    public void theAdvisorVerifiesProspectsFromOtherCellsNotIncluded() {
        assertFalse(prospectSearchPage.hasProspectsFromOtherCells(), "No prospects from other cells should be present");
    }

    @And("the advisor selects a prospect from the filtered results")
    public void theAdvisorSelectsProspectFromResults() {
        prospectSearchPage.selectFirstProspect();
        assertTrue(prospectSearchPage.isProspectDetailsDisplayed(), "Prospect details should be displayed");
    }

    @Then("the selected prospect's details confirm assignment to the advisor's cell or financial center")
    public void theSelectedProspectConfirmsAssignment() {
        selectedProspectCell = prospectSearchPage.getProspectCellAssignment();
        assertNotNull(selectedProspectCell, "Prospect cell assignment should not be null");
        assertTrue(prospectSearchPage.isProspectAssignedToAdvisorCell(selectedProspectCell), 
                   "Selected prospect should be assigned to advisor's cell or financial center");
    }
}