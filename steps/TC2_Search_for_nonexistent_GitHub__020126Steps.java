package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubUserSearchSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubSearchPage searchPage;

    @Given("the user navigates to the GitHub search page")
    public void theUserNavigatesToTheGitHubSearchPage() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        searchPage = new GitHubSearchPage(page);
        searchPage.navigateToSearchPage();
        assertTrue("Search interface should be displayed", searchPage.isSearchInputVisible());
    }

    @When("the user enters a non-existent username {string} in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField(String username) {
        searchPage.enterSearchQuery(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.submitSearch();
    }

    @And("the user filters results by Users")
    public void theUserFiltersResultsByUsers() {
        searchPage.clickUsersFilter();
    }

    @Then("the system displays a friendly error message indicating no users were found")
    public void theSystemDisplaysAFriendlyErrorMessageIndicatingNoUsersWereFound() {
        assertTrue("Error message should be visible", searchPage.isNoResultsMessageVisible());
        String errorMessage = searchPage.getNoResultsMessageText();
        assertTrue("Error message should indicate no users found", 
            errorMessage.contains("Your search did not match any users"));
    }

    @And("no profile data is displayed on the page")
    public void noProfileDataIsDisplayedOnThePage() {
        assertTrue("Results count should show 0", searchPage.getResultsCount().equals("0 results"));
        assertFalse("User profile list should not be visible", searchPage.isUserProfileListVisible());
    }
}