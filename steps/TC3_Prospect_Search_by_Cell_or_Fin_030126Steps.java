package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter with assigned cell or financial center")
    public void theAdvisorIsLoggedInToActicenterWithAssignedCellOrFinancialCenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(dashboardPage.isAdvisorDashboardVisible());
    }

    @When("the advisor navigates to the prospect search module")
    public void theAdvisorNavigatesToTheProspectSearchModule() {
        dashboardPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchInterfaceVisible());
    }

    @And("the advisor enters search criteria for a prospect")
    public void theAdvisorEntersSearchCriteriaForAProspect() {
        prospectSearchPage.enterSearchCriteria("John Doe");
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForResults();
    }

    @Then("the system queries Salesforce filtering by the advisor's cell or financial center")
    public void theSystemQueriesSalesforceFilteringByTheAdvisorsCellOrFinancialCenter() {
        assertTrue(prospectSearchPage.areResultsDisplayed());
    }

    @And("only prospects assigned to advisors within the same cell or financial center are displayed")
    public void onlyProspectsAssignedToAdvisorsWithinTheSameCellOrFinancialCenterAreDisplayed() {
        assertTrue(prospectSearchPage.validateProspectsScope());
        String cellInfo = prospectSearchPage.getCellOrFinancialCenterInfo();
        assertNotNull("Cell or financial center information should be present", cellInfo);
    }
}