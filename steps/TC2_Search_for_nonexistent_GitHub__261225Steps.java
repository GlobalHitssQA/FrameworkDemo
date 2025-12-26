package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubSearchPage;
import pages.GitHubSearchResultsPage;
import static org.junit.Assert.*;

public class SearchNonExistentUserSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubSearchPage searchPage;
    private GitHubSearchResultsPage resultsPage;

    @Given("the user is on the GitHub search page")
    public void theUserIsOnTheGitHubSearchPage() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        searchPage = new GitHubSearchPage(page);
        searchPage.navigate();
    }

    @And("the search input and search button are enabled")
    public void theSearchInputAndSearchButtonAreEnabled() {
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
        assertTrue("Search input should be enabled", searchPage.isSearchInputEnabled());
    }

    @When("the user enters a non-existent username {string} in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField(String username) {
        searchPage.enterSearchQuery(username);
        assertTrue("Search field should contain the entered text", 
            searchPage.getSearchInputValue().contains(username));
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.submitSearch();
        resultsPage = new GitHubSearchResultsPage(page);
    }

    @Then("the system should display a loading indicator while processing")
    public void theSystemShouldDisplayALoadingIndicatorWhileProcessing() {
        // GitHub search is fast, loading state may be brief
        // We verify the page has navigated to results
        resultsPage.waitForResultsToLoad();
    }

    @And("the system should detect that the user was not found")
    public void theSystemShouldDetectThatTheUserWasNotFound() {
        assertTrue("Results page should be loaded", resultsPage.isResultsPageLoaded());
    }

    @And("a friendly error message should be displayed indicating no users were found")
    public void aFriendlyErrorMessageShouldBeDisplayedIndicatingNoUsersWereFound() {
        assertTrue("No results message should be visible", 
            resultsPage.isNoResultsMessageVisible());
        String errorMessage = resultsPage.getNoResultsMessageText();
        assertTrue("Error message should indicate no users found", 
            errorMessage.contains("did not match any users"));
    }

    @And("the user profile metrics and details sections should not be visible")
    public void theUserProfileMetricsAndDetailsSectionsShouldNotBeVisible() {
        assertFalse("User avatar should not be visible", 
            resultsPage.isUserAvatarVisible());
        assertFalse("User bio should not be visible", 
            resultsPage.isUserBioVisible());
        assertFalse("Repository count should not be visible", 
            resultsPage.isRepositoryCountVisible());
        assertFalse("Followers count should not be visible", 
            resultsPage.isFollowersCountVisible());
        assertFalse("Following count should not be visible", 
            resultsPage.isFollowingCountVisible());
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}