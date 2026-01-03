package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String advisorCellId;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is logged into Acticenter")
    public void theAdvisorUserIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(loginPage.isLoginSuccessful(), "Advisor login failed");
    }

    @And("the advisor is assigned to a specific cell or financial center")
    public void theAdvisorIsAssignedToASpecificCellOrFinancialCenter() {
        advisorCellId = loginPage.getAssignedCellId();
        assertNotNull(advisorCellId, "Advisor cell assignment not found");
        assertFalse(advisorCellId.isEmpty(), "Advisor cell ID is empty");
    }

    @When("the advisor accesses the prospect search functionality")
    public void theAdvisorAccessesTheProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchInterfaceDisplayed(), "Search interface not displayed");
    }

    @And("the advisor executes a search for prospects")
    public void theAdvisorExecutesASearchForProspects() {
        prospectSearchPage.executeSearch();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("only prospects assigned to the advisor or advisors from the same cell or financial center are displayed")
    public void onlyProspectsAssignedToTheAdvisorOrAdvisorsFromTheSameCellOrFinancialCenterAreDisplayed() {
        assertTrue(prospectSearchPage.hasSearchResults(), "No search results found");
        assertTrue(prospectSearchPage.allProspectsBelongToCell(advisorCellId), 
            "Some prospects do not belong to the advisor's cell or financial center");
    }

    @And("prospects assigned to other cells or financial centers are not displayed")
    public void prospectsAssignedToOtherCellsOrFinancialCentersAreNotDisplayed() {
        assertFalse(prospectSearchPage.hasProspectsFromOtherCells(advisorCellId), 
            "Prospects from other cells or financial centers are displayed");
    }
}