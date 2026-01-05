package steps;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubSearchSteps {
    
    private Page page;
    private GitHubSearchPage searchPage;
    
    public GitHubSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }
    
    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubProfileSearch() {
        searchPage.navigateToSearchComponent();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }
    
    @When("the user locates the username text input field")
    public void locateUsernameInputField() {
        assertTrue("Username input field should be present", 
                   searchPage.isUsernameInputPresent());
    }
    
    @Then("the input field should be visible and enabled")
    public void verifyInputFieldVisibleAndEnabled() {
        assertTrue("Input field should be visible", 
                   searchPage.isUsernameInputVisible());
        assertTrue("Input field should be enabled", 
                   searchPage.isUsernameInputEnabled());
    }
    
    @And("the input field should accept alphanumeric characters")
    public void verifyInputFieldAcceptsAlphanumericCharacters() {
        String testUsername = "testUser123";
        searchPage.enterUsername(testUsername);
        
        String inputValue = searchPage.getUsernameInputValue();
        assertEquals("Input field should display entered characters", 
                     testUsername, 
                     inputValue);
    }
}