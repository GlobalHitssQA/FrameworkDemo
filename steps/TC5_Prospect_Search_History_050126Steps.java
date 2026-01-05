package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchHistorySteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String[] searchTerms = {
        "john.doe@example.com",
        "jane.smith@example.com",
        "robert.johnson@example.com",
        "maria.garcia@example.com",
        "david.martinez@example.com"
    };

    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        loginPage.navigateToActicenter();
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(loginPage.isLoginSuccessful(), "Advisor should be logged in successfully");
    }

    @When("the advisor performs 5 different prospect searches")
    public void theAdvisorPerformsFiveDifferentProspectSearches() {
        for (String searchTerm : searchTerms) {
            prospectSearchPage.searchProspect(searchTerm);
            assertTrue(prospectSearchPage.areSearchResultsDisplayed(), 
                "Search results should be displayed for: " + searchTerm);
            prospectSearchPage.clearSearchField();
        }
    }

    @And("the advisor navigates back to the prospect search field")
    public void theAdvisorNavigatesBackToTheProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), 
            "Prospect search field should be visible");
    }

    @And("the advisor clicks on the prospect search field")
    public void theAdvisorClicksOnTheProspectSearchField() {
        prospectSearchPage.clickSearchField();
    }

    @Then("the system displays a dropdown with the last 5 searches")
    public void theSystemDisplaysADropdownWithTheLastFiveSearches() {
        assertTrue(prospectSearchPage.isSearchHistoryDropdownVisible(), 
            "Search history dropdown should be visible");
        assertEquals(5, prospectSearchPage.getSearchHistoryCount(), 
            "Dropdown should display exactly 5 search entries");
    }

    @And("each search entry shows the prospect name and email")
    public void eachSearchEntryShowsTheProspectNameAndEmail() {
        for (int i = 0; i < searchTerms.length; i++) {
            String entryText = prospectSearchPage.getSearchHistoryEntryText(i);
            assertTrue(entryText.contains("@"), 
                "Search entry " + (i + 1) + " should contain email address");
            assertFalse(entryText.isEmpty(), 
                "Search entry " + (i + 1) + " should not be empty");
        }
    }
}