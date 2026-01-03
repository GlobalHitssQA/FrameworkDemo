package stepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private int firstSearchResultCount;
    private int secondSearchResultCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is logged in to Acticenter")
    public void theAdvisorUserIsLoggedInToActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "securePassword123");
        assertTrue("User should be authenticated", loginPage.isLoginSuccessful());
    }

    @When("the user navigates to the prospect search section")
    public void theUserNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Then("the search field and search icon should be displayed")
    public void theSearchFieldAndSearchIconShouldBeDisplayed() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search icon should be visible", prospectSearchPage.isSearchIconVisible());
    }

    @When("the user enters {string} in the search field")
    public void theUserEntersInTheSearchField(String searchText) {
        prospectSearchPage.enterSearchText(searchText);
        assertEquals("Search text should be entered", searchText, prospectSearchPage.getSearchFieldValue());
    }

    @And("the user clicks the search icon")
    public void theUserClicksTheSearchIcon() {
        prospectSearchPage.clickSearchIcon();
        firstSearchResultCount = prospectSearchPage.getSearchResultsCount();
    }

    @Then("search results from Salesforce should be displayed")
    public void searchResultsFromSalesforceShouldBeDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("At least one result should be displayed", prospectSearchPage.getSearchResultsCount() > 0);
    }

    @When("the user clears the search field")
    public void theUserClearsTheSearchField() {
        prospectSearchPage.clearSearchField();
        assertEquals("Search field should be empty", "", prospectSearchPage.getSearchFieldValue());
    }

    @And("the user presses the Enter key")
    public void theUserPressesTheEnterKey() {
        prospectSearchPage.pressEnterOnSearchField();
        secondSearchResultCount = prospectSearchPage.getSearchResultsCount();
    }

    @And("both search methods should produce identical behavior")
    public void bothSearchMethodsShouldProduceIdenticalBehavior() {
        assertTrue("Both search methods should display results", firstSearchResultCount > 0 && secondSearchResultCount > 0);
        assertTrue("Search results should be displayed in both cases", prospectSearchPage.areSearchResultsVisible());
    }
}