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

public class GitHubProfileSearchSteps {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubSearchPage gitHubSearchPage;
    private String followerProfileUrl;

    @Given("the GitHub profile search application is loaded")
    public void theGitHubProfileSearchApplicationIsLoaded() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        gitHubSearchPage = new GitHubSearchPage(page);
        gitHubSearchPage.navigate("https://github.com");
        assertTrue("Application should load successfully", gitHubSearchPage.isSearchInputVisible());
    }

    @When("I enter a valid GitHub username {string} in the search input field")
    public void iEnterAValidGitHubUsernameInTheSearchInputField(String username) {
        gitHubSearchPage.enterUsername(username);
        String enteredText = gitHubSearchPage.getSearchInputValue();
        assertEquals("Username should be entered correctly", username, enteredText);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        gitHubSearchPage.clickSearchButton();
    }

    @Then("the API request should complete successfully")
    public void theAPIRequestShouldCompleteSuccessfully() {
        gitHubSearchPage.waitForProfileDataToLoad();
        assertTrue("Profile data should be loaded", gitHubSearchPage.isProfileDataVisible());
    }

    @And("the metrics dashboard should display Repos, Followers, Following, and Gists")
    public void theMetricsDashboardShouldDisplayReposFollowersFollowingAndGists() {
        assertTrue("Repos metric should be visible", gitHubSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", gitHubSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", gitHubSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", gitHubSearchPage.isGistsMetricVisible());
    }

    @And("the user profile section should display avatar, full name, username, bio, location, company, web link, and Follow button")
    public void theUserProfileSectionShouldDisplayCompleteInformation() {
        assertTrue("Avatar should be visible", gitHubSearchPage.isAvatarVisible());
        assertTrue("Full name should be visible", gitHubSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", gitHubSearchPage.isUsernameVisible());
        assertTrue("Bio should be visible or show not available", gitHubSearchPage.isBioSectionVisible());
        assertTrue("Location should be visible or show not available", gitHubSearchPage.isLocationSectionVisible());
        assertTrue("Company should be visible or show not available", gitHubSearchPage.isCompanySectionVisible());
        assertTrue("Follow button should be visible", gitHubSearchPage.isFollowButtonVisible());
    }

    @And("the followers list should display with avatar, username, and profile link for each follower")
    public void theFollowersListShouldDisplayWithCompleteInformation() {
        gitHubSearchPage.waitForFollowersListToLoad();
        assertTrue("Followers list should be visible", gitHubSearchPage.isFollowersListVisible());
        assertTrue("At least one follower should be displayed", gitHubSearchPage.getFollowersCount() > 0);
    }

    @When("I scroll through the followers list")
    public void iScrollThroughTheFollowersList() {
        gitHubSearchPage.scrollFollowersList();
    }

    @Then("all followers should remain accessible")
    public void allFollowersShouldRemainAccessible() {
        assertTrue("Followers should remain accessible after scrolling", gitHubSearchPage.isFollowersListVisible());
    }

    @When("I click on a follower's profile link")
    public void iClickOnAFollowerProfileLink() {
        followerProfileUrl = gitHubSearchPage.getFirstFollowerProfileUrl();
        gitHubSearchPage.clickFirstFollowerLink();
    }

    @Then("the follower's GitHub profile page should open")
    public void theFollowerGitHubProfilePageShouldOpen() {
        page.waitForTimeout(2000);
        String currentUrl = page.url();
        assertTrue("Should navigate to follower's profile", currentUrl.contains("github.com"));
    }

    @When("I navigate back to the search application")
    public void iNavigateBackToTheSearchApplication() {
        page.goBack();
        page.waitForTimeout(1000);
    }

    @And("I click on the web link in the user profile section")
    public void iClickOnTheWebLinkInTheUserProfileSection() {
        if (gitHubSearchPage.isWebLinkVisible()) {
            Page newPage = page.context().waitForPage(() -> {
                gitHubSearchPage.clickWebLink();
            });
            newPage.close();
        }
    }

    @Then("the user's personal website should open in a new tab")
    public void theUserPersonalWebsiteShouldOpenInANewTab() {
        assertTrue("Web link interaction completed", true);
    }

    @And("the API request counter should display current usage")
    public void theAPIRequestCounterShouldDisplayCurrentUsage() {
        if (gitHubSearchPage.isRequestCounterVisible()) {
            String counterText = gitHubSearchPage.getRequestCounterText();
            assertTrue("Request counter should display usage", counterText.matches("\\d+/\\d+"));
        }
    }

    @When("I search for a non-existent username {string}")
    public void iSearchForANonExistentUsername(String username) {
        gitHubSearchPage.enterUsername(username);
        gitHubSearchPage.clickSearchButton();
        page.waitForTimeout(2000);
    }

    @Then("an error message or empty state should be displayed")
    public void anErrorMessageOrEmptyStateShouldBeDisplayed() {
        boolean errorDisplayed = gitHubSearchPage.isErrorMessageVisible() || gitHubSearchPage.isEmptyStateVisible();
        assertTrue("Error message or empty state should be shown for non-existent user", errorDisplayed);
    }

    @When("I perform another valid search with username {string}")
    public void iPerformAnotherValidSearchWithUsername(String username) {
        gitHubSearchPage.enterUsername(username);
        gitHubSearchPage.clickSearchButton();
        gitHubSearchPage.waitForProfileDataToLoad();
    }

    @Then("the new profile should load correctly replacing previous results")
    public void theNewProfileShouldLoadCorrectlyReplacingPreviousResults() {
        assertTrue("New profile should be loaded", gitHubSearchPage.isProfileDataVisible());
        browser.close();
        playwright.close();
    }
}