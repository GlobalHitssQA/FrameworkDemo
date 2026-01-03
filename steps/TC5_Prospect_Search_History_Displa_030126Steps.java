package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;
import java.util.List;

public class ProspectSearchHistorySteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the Wealth Management Advisor is logged into Acticenter")
    public void theWealthManagementAdvisorIsLoggedIntoActicenter() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.performLogin();
        assertTrue("User should be logged in successfully", prospectSearchPage.isLoggedIn());
    }

    @When("the advisor navigates to the prospect search section")
    public void theAdvisorNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search interface should be displayed", prospectSearchPage.isProspectSearchDisplayed());
    }

    @And("the advisor performs 5 or more different prospect searches")
    public void theAdvisorPerformsDifferentProspectSearches() {
        String[] searchTerms = {
            "John Smith john.smith@example.com",
            "Maria Garcia maria.garcia@example.com",
            "Carlos Rodriguez carlos.rodriguez@example.com",
            "Ana Martinez ana.martinez@example.com",
            "Luis Fernandez luis.fernandez@example.com"
        };
        
        for (String term : searchTerms) {
            prospectSearchPage.performSearch(term);
            assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
            prospectSearchPage.clearSearch();
        }
    }

    @And("the advisor clicks on the search input field")
    public void theAdvisorClicksOnTheSearchInputField() {
        prospectSearchPage.focusSearchField();
        assertTrue("Search field should be active", prospectSearchPage.isSearchFieldFocused());
    }

    @And("the advisor starts typing any character in the search field")
    public void theAdvisorStartsTypingAnyCharacterInTheSearchField() {
        prospectSearchPage.typeInSearchField("a");
    }

    @Then("the last 5 searches performed should be displayed as suggestions")
    public void theLastSearchesPerformedShouldBeDisplayedAsSuggestions() {
        assertTrue("Search history suggestions should be visible", prospectSearchPage.areSearchSuggestionsDisplayed());
        int suggestionCount = prospectSearchPage.getSearchSuggestionCount();
        assertEquals("Exactly 5 search suggestions should be displayed", 5, suggestionCount);
    }

    @And("each suggestion should display the prospect name and email address")
    public void eachSuggestionShouldDisplayTheProspectNameAndEmailAddress() {
        List<String> suggestions = prospectSearchPage.getSearchSuggestions();
        
        for (String suggestion : suggestions) {
            assertTrue("Suggestion should contain prospect name", suggestion.matches(".*[A-Z][a-z]+ [A-Z][a-z]+.*"));
            assertTrue("Suggestion should contain email address", suggestion.matches(".*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.*"));
        }
    }
}