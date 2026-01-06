package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;

import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String initialUrl;

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubProfileSearch() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        page.navigate("https://github.com");
        profileSearchPage = new GitHubProfileSearchPage(page);
        assertTrue("Search component should be visible", profileSearchPage.isSearchComponentVisible());
    }

    @When("the user enters a valid existing GitHub username {string} in the search input field")
    public void enterUsername(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, profileSearchPage.getEnteredUsername());
    }

    @And("the user clicks on the search button with the magnifying glass icon")
    public void clickSearchButton() {
        profileSearchPage.clickSearchButton();
        page.waitForTimeout(2000);
    }

    @Then("the metrics dashboard displays the total values for Repos, Followers, Following, and Gists")
    public void verifyMetricsDashboard() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        assertNotNull("Repos count should not be null", profileSearchPage.getReposCount());
        assertNotNull("Followers count should not be null", profileSearchPage.getFollowersCount());
        assertNotNull("Following count should not be null", profileSearchPage.getFollowingCount());
        assertNotNull("Gists count should not be null", profileSearchPage.getGistsCount());
    }

    @And("the left section displays the user's avatar image")
    public void verifyAvatarImage() {
        assertTrue("User avatar should be displayed", profileSearchPage.isAvatarVisible());
    }

    @And("the left section shows the full name and username")
    public void verifyFullNameAndUsername() {
        assertTrue("Full name should be displayed", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be displayed", profileSearchPage.isUsernameVisible());
        assertNotNull("Full name should not be null", profileSearchPage.getFullName());
        assertNotNull("Username should not be null", profileSearchPage.getUsername());
    }

    @And("the biography section displays the user's profile description")
    public void verifyBiography() {
        assertTrue("Biography section should be present", profileSearchPage.isBiographyPresent());
    }

    @And("the location and company information are displayed")
    public void verifyLocationAndCompany() {
        assertTrue("Location field should be present", profileSearchPage.isLocationPresent());
        assertTrue("Company field should be present", profileSearchPage.isCompanyPresent());
    }

    @And("the web link field shows the personal or portfolio URL")
    public void verifyWebLink() {
        assertTrue("Web link field should be present", profileSearchPage.isWebLinkPresent());
    }

    @And("the Follow button is present and functional")
    public void verifyFollowButton() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
        assertTrue("Follow button should be enabled", profileSearchPage.isFollowButtonEnabled());
    }

    @And("the right section displays a vertical list of followers")
    public void verifyFollowersList() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should have items", profileSearchPage.getFollowersCount() > 0);
    }

    @And("each follower entry shows avatar, username, and profile link")
    public void verifyFollowerEntries() {
        assertTrue("First follower avatar should be visible", profileSearchPage.isFirstFollowerAvatarVisible());
        assertTrue("First follower username should be visible", profileSearchPage.isFirstFollowerUsernameVisible());
        assertTrue("First follower link should be clickable", profileSearchPage.isFirstFollowerLinkClickable());
    }

    @And("the followers list allows scrolling when the number exceeds container size")
    public void verifyFollowersListScrolling() {
        assertTrue("Followers list container should be scrollable", profileSearchPage.isFollowersListScrollable());
    }

    @And("the API request limit indicator is displayed showing current usage")
    public void verifyApiRequestIndicator() {
        assertTrue("API request indicator should be visible", profileSearchPage.isApiRequestIndicatorVisible());
        String indicatorText = profileSearchPage.getApiRequestIndicatorText();
        assertNotNull("API request indicator text should not be null", indicatorText);
        assertTrue("API request indicator should contain slash", indicatorText.contains("/"));
    }

    @When("the user clicks on a follower's profile link")
    public void clickFollowerProfileLink() {
        initialUrl = page.url();
        profileSearchPage.clickFirstFollowerLink();
        page.waitForTimeout(2000);
    }

    @Then("the system redirects to the corresponding GitHub profile page for that follower")
    public void verifyRedirectToFollowerProfile() {
        String currentUrl = page.url();
        assertNotEquals("URL should have changed", initialUrl, currentUrl);
        assertTrue("URL should contain GitHub domain", currentUrl.contains("github.com"));
        browser.close();
        playwright.close();
    }
}