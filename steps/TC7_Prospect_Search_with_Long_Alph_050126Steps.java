package stepDefinitions;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String longSearchString;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "Password123");
        page.waitForLoadState(LoadState.NETWORKIDLE);
        assertTrue("Login should be successful", loginPage.isLoggedIn());
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor enters a very long alphanumeric string exceeding 100 characters")
    public void theAdvisorEntersAVeryLongAlphanumericString() {
        longSearchString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
                           "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
                           "ExtraCharacters1234567890";
        prospectSearchPage.enterSearchText(longSearchString);
        assertEquals("Search field should contain the full string", 
                     longSearchString, 
                     prospectSearchPage.getSearchFieldValue());
    }

    @And("the advisor triggers the search")
    public void theAdvisorTriggersTheSearch() {
        prospectSearchPage.clickSearchButton();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    @Then("the system should execute the search in Salesforce database with the full string")
    public void theSystemShouldExecuteTheSearchWithFullString() {
        assertTrue("Search should be executed", prospectSearchPage.isSearchExecuted());
    }

    @And("the system should display search results or no results message without errors")
    public void theSystemShouldDisplayResultsOrNoResultsMessage() {
        boolean hasResults = prospectSearchPage.hasSearchResults();
        boolean hasNoResultsMessage = prospectSearchPage.hasNoResultsMessage();
        boolean hasErrorMessage = prospectSearchPage.hasErrorMessage();
        
        assertFalse("No error message should be displayed", hasErrorMessage);
        assertTrue("Either results or no results message should be displayed", 
                   hasResults || hasNoResultsMessage);
    }
}