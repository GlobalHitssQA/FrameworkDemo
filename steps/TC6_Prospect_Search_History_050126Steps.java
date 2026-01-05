package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;
import java.util.List;

public class ProspectSearchHistorySteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private List<String> searchHistory;

    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in to Acticenter as an advisor")
    public void iAmLoggedInToActicenterAsAnAdvisor() {
        loginPage.navigateToLogin();
        loginPage.login("advisor_user", "advisor_password");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @When("I perform 5 or more prospect searches using different criteria")
    public void iPerformFiveOrMoreProspectSearchesUsingDifferentCriteria() {
        String[] searchCriteria = {"John Doe", "jane.smith@email.com", "Robert Johnson", "maria.garcia@test.com", "Michael Brown", "sarah.wilson@example.com"};
        
        for (String criteria : searchCriteria) {
            prospectSearchPage.enterSearchCriteria(criteria);
            prospectSearchPage.clickSearchButton();
            prospectSearchPage.waitForSearchResults();
        }
    }

    @And("I navigate back to the prospect search field")
    public void iNavigateBackToTheProspectSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.navigateToSearchField();
    }

    @And("I click on the search field and begin typing any character")
    public void iClickOnTheSearchFieldAndBeginTypingAnyCharacter() {
        prospectSearchPage.focusOnSearchField();
        prospectSearchPage.typeInSearchField("a");
    }

    @Then("the system displays the last 5 searches performed by me as dropdown suggestions")
    public void theSystemDisplaysTheLastFiveSearchesPerformedByMeAsDropdownSuggestions() {
        assertTrue("Search history dropdown should be visible", prospectSearchPage.isSearchHistoryDropdownVisible());
        searchHistory = prospectSearchPage.getSearchHistoryItems();
        assertFalse("Search history should not be empty", searchHistory.isEmpty());
    }

    @And("only the 5 most recent searches are shown in chronological order")
    public void onlyTheFiveMostRecentSearchesAreShownInChronologicalOrder() {
        assertEquals("Should display exactly 5 search history items", 5, searchHistory.size());
        
        String[] expectedSearches = {"sarah.wilson@example.com", "Michael Brown", "maria.garcia@test.com", "Robert Johnson", "jane.smith@email.com"};
        
        for (int i = 0; i < 5; i++) {
            assertTrue("Search history should contain: " + expectedSearches[i], 
                searchHistory.contains(expectedSearches[i]));
        }
    }
}