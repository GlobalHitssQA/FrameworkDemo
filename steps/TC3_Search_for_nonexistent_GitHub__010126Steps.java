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
import pages.GitHubNotFoundPage;
import static org.junit.Assert.*;

public class SearchNonExistentUserSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubSearchPage searchPage;
    private GitHubNotFoundPage notFoundPage;
    private static final String BASE_URL = "https://github.com";
    private static final String NON_EXISTENT_USER = "thisuserdoesnotexist123456789xyz";

    @Given("the user is on the GitHub homepage")
    public void theUserIsOnTheGitHubHomepage() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        page = browser.newPage();
        searchPage = new GitHubSearchPage(page);
        notFoundPage = new GitHubNotFoundPage(page);
        searchPage.navigateTo(BASE_URL);
    }

    @When("the user navigates to search for a non-existent username")
    public void theUserNavigatesToSearchForANonExistentUsername() {
        searchPage.navigateToUserProfile(NON_EXISTENT_USER);
    }

    @Then("the page should display a 404 error page")
    public void thePageShouldDisplayA404ErrorPage() {
        assertTrue("Page title should contain 'Page not found'", 
            notFoundPage.getPageTitle().contains("Page not found"));
    }

    @And("the 404 image should be visible")
    public void the404ImageShouldBeVisible() {
        assertTrue("404 error image should be visible", 
            notFoundPage.isNotFoundImageVisible());
    }

    @And("a search input should be available on the error page")
    public void aSearchInputShouldBeAvailableOnTheErrorPage() {
        assertTrue("Search input should be visible on 404 page", 
            notFoundPage.isSearchInputVisible());
        assertTrue("Search button should be visible on 404 page", 
            notFoundPage.isSearchButtonVisible());
    }

    @And("no profile data or metrics should be displayed")
    public void noProfileDataOrMetricsShouldBeDisplayed() {
        assertFalse("User avatar should not be visible", 
            notFoundPage.isUserAvatarVisible());
        assertFalse("User profile name should not be visible", 
            notFoundPage.isUserProfileNameVisible());
        assertFalse("Followers count should not be visible", 
            notFoundPage.isFollowersCountVisible());
        assertFalse("Following count should not be visible", 
            notFoundPage.isFollowingCountVisible());
        assertFalse("Repositories section should not be visible", 
            notFoundPage.isRepositoriesSectionVisible());
    }
}