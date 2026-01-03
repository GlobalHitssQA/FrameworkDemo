package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchHistorySteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the advisor user is logged into Acticenter")
    public void theAdvisorUserIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor.user@actinver.com", "password123");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }
    
    @And("the advisor has performed 5 different prospect searches")
    public void theAdvisorHasPerformedFiveDifferentProspectSearches() {
        String[] searchTerms = {
            "Juan Perez juan.perez@email.com",
            "Maria Garcia maria.garcia@email.com",
            "Carlos Lopez carlos.lopez@email.com",
            "Ana Martinez ana.martinez@email.com",
            "Luis Rodriguez luis.rodriguez@email.com"
        };
        
        for (String searchTerm : searchTerms) {
            prospectSearchPage.performSearch(searchTerm);
            prospectSearchPage.waitForSearchResults();
        }
    }
    
    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }
    
    @And("the advisor clicks on the search field")
    public void theAdvisorClicksOnTheSearchField() {
        prospectSearchPage.clickSearchField();
    }
    
    @Then("the system displays the last 5 searches as suggestions")
    public void theSystemDisplaysTheLastFiveSearchesAsSuggestions() {
        assertTrue("Suggestions should be visible", prospectSearchPage.areSuggestionsVisible());
        assertEquals("Should display exactly 5 suggestions", 5, prospectSearchPage.getSuggestionsCount());
    }
    
    @And("each suggestion shows the prospect name and email")
    public void eachSuggestionShowsTheProspectNameAndEmail() {
        assertTrue("Each suggestion should contain name and email", prospectSearchPage.verifySuggestionsContainNameAndEmail());
    }
}