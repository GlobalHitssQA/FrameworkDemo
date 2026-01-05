package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private DashboardPage dashboardPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue("Login was not successful", loginPage.isLoginSuccessful());
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue("Search field is not available", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor enters search criteria that does not match any existing prospect")
    public void theAdvisorEntersSearchCriteriaThatDoesNotMatchAnyExistingProspect() {
        String nonExistingProspect = "ZZZNOMATCHXXX999";
        prospectSearchPage.enterSearchCriteria(nonExistingProspect);
        prospectSearchPage.clickSearchButton();
    }

    @Then("a message indicating no results found is displayed")
    public void aMessageIndicatingNoResultsFoundIsDisplayed() {
        assertTrue("No results message is not displayed", prospectSearchPage.isNoResultsMessageVisible());
        String expectedMessage = "No results found";
        String actualMessage = prospectSearchPage.getNoResultsMessage();
        assertTrue("No results message does not contain expected text", 
                   actualMessage.toLowerCase().contains(expectedMessage.toLowerCase()));
    }

    @And("the dashboard remains accessible without errors")
    public void theDashboardRemainsAccessibleWithoutErrors() {
        assertTrue("Dashboard is not accessible", dashboardPage.isDashboardVisible());
        assertFalse("Error message is displayed", prospectSearchPage.isErrorMessageVisible());
    }
}