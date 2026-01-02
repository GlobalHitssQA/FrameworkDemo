package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String advisorCell;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter with cell or financial center assignment")
    public void advisorLoggedInWithCellAssignment() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        advisorCell = loginPage.getAdvisorCellAssignment();
        assertTrue("Advisor should have cell assignment", advisorCell != null && !advisorCell.isEmpty());
    }

    @When("the advisor navigates to the dashboard and accesses prospect search")
    public void navigateToDashboardAndAccessProspectSearch() {
        dashboardPage.waitForDashboardLoad();
        dashboardPage.clickProspectSearchOption();
        assertTrue("Prospect search should be available", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor executes a prospect search with valid criteria")
    public void executeProspectSearchWithValidCriteria() {
        prospectSearchPage.fillSearchCriteria("John Doe");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results should only display prospects assigned to the advisor's cell or financial center")
    public void verifySearchResultsRestrictedToAdvisorCell() {
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("Search should return results", resultsCount > 0);
        
        for (int i = 0; i < resultsCount; i++) {
            String prospectCell = prospectSearchPage.getProspectCellFromResult(i);
            assertEquals("Prospect should belong to advisor's cell", advisorCell, prospectCell);
        }
    }

    @When("the advisor attempts to search for a prospect from a different cell or financial center")
    public void searchForProspectFromDifferentCell() {
        prospectSearchPage.clearSearchCriteria();
        prospectSearchPage.fillSearchCriteria("External Prospect XYZ");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect from the different cell should not appear in search results")
    public void verifyProspectFromDifferentCellNotDisplayed() {
        boolean noResults = prospectSearchPage.isNoResultsMessageVisible();
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("Search should return no results or empty list", noResults || resultsCount == 0);
    }

    @And("all displayed results should belong to the advisor's authorized prospect list")
    public void verifyAllResultsBelongToAuthorizedList() {
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        
        for (int i = 0; i < resultsCount; i++) {
            String prospectCell = prospectSearchPage.getProspectCellFromResult(i);
            assertEquals("All results must belong to advisor's cell", advisorCell, prospectCell);
        }
    }
}