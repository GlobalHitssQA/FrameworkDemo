package stepdefinitions;

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

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as an Advisor with access to Acticenter")
    public void theUserIsLoggedInAsAnAdvisorWithAccessToActicenter() {
        loginPage.navigateToLogin();
        loginPage.loginAsAdvisor();
        assertTrue(loginPage.isDashboardDisplayed(), "Dashboard should be displayed after login");
    }

    @And("the user navigates to the prospect search section")
    public void theUserNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled");
    }

    @When("the user enters only 1 character in the prospect search field")
    public void theUserEntersOnly1CharacterInTheProspectSearchField() {
        prospectSearchPage.enterSearchText("a");
    }

    @Then("the system does not execute the search")
    public void theSystemDoesNotExecuteTheSearch() {
        assertFalse(prospectSearchPage.isSearchExecuted(), "Search should not be executed with 1 character");
    }

    @And("no search results are displayed")
    public void noSearchResultsAreDisplayed() {
        assertFalse(prospectSearchPage.areResultsDisplayed(), "No results should be displayed");
    }

    @When("the user clicks the search button with only 1 character entered")
    public void theUserClicksTheSearchButtonWithOnly1CharacterEntered() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search is not initiated and the search field remains active")
    public void theSearchIsNotInitiatedAndTheSearchFieldRemains() {
        assertFalse(prospectSearchPage.isSearchExecuted(), "Search should not be initiated");
        assertTrue(prospectSearchPage.isSearchFieldActive(), "Search field should remain active");
    }

    @When("the user enters a second character to have 2 characters total")
    public void theUserEntersASecondCharacterToHave2CharactersTotal() {
        prospectSearchPage.appendSearchText("b");
    }

    @Then("the search functionality becomes enabled")
    public void theSearchFunctionalityBecomesEnabled() {
        assertTrue(prospectSearchPage.isSearchEnabled(), "Search should be enabled with 2 characters");
    }

    @When("the user executes the search with 2 characters")
    public void theUserExecutesTheSearchWith2Characters() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results are displayed successfully")
    public void theSearchResultsAreDisplayedSuccessfully() {
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed");
    }

    @And("the results show prospect name and email address")
    public void theResultsShowProspectNameAndEmailAddress() {
        assertTrue(prospectSearchPage.resultsContainProspectName(), "Results should contain prospect name");
        assertTrue(prospectSearchPage.resultsContainEmailAddress(), "Results should contain email address");
    }

    @And("the first 5 matches are visible on the screen")
    public void theFirst5MatchesAreVisibleOnTheScreen() {
        int visibleCount = prospectSearchPage.getVisibleResultsCount();
        assertTrue(visibleCount <= 5, "Maximum 5 results should be initially visible");
    }

    @And("additional matches are accessible via scroll if more than 5 exist")
    public void additionalMatchesAreAccessibleViaScrollIfMoreThan5Exist() {
        if (prospectSearchPage.getTotalResultsCount() > 5) {
            assertTrue(prospectSearchPage.isScrollableResultsList(), "Results list should be scrollable");
            prospectSearchPage.scrollToBottomOfResults();
            assertTrue(prospectSearchPage.getVisibleResultsCount() > 5, "More results should be visible after scrolling");
        }
    }
}