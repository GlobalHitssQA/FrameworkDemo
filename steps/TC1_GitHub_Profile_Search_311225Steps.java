package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub Profile Finder application")
    public void theUserIsOnTheGitHubProfileFinderApplication() {
        profileSearchPage.navigateToApplication();
    }

    @And("the search interface is displayed with a text input field and a search button with magnifying glass icon")
    public void theSearchInterfaceIsDisplayedWithSearchElements() {
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input field should be visible");
        assertTrue(profileSearchPage.isSearchButtonVisible(), "Search button with magnifying glass icon should be visible");
    }

    @When("the user enters a valid existing GitHub username {string} in the search field")
    public void theUserEntersValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @Then("the entered text {string} is displayed correctly in the input field")
    public void theEnteredTextIsDisplayedCorrectly(String expectedText) {
        String actualText = profileSearchPage.getSearchInputValue();
        assertEquals(expectedText, actualText, "The entered text should be displayed correctly in the input field");
    }

    @When("the user clicks on the search button with magnifying glass icon")
    public void theUserClicksOnSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system initiates a query to the GitHub API and displays a loading indicator")
    public void theSystemInitiatesQueryAndDisplaysLoadingIndicator() {
        assertTrue(profileSearchPage.isLoadingIndicatorDisplayed(), "Loading indicator should be displayed");
    }

    @And("the system retrieves the profile information from GitHub API")
    public void theSystemRetrievesProfileInformation() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue(profileSearchPage.isProfileSectionVisible(), "Profile section should be visible after API response");
    }

    @Then("the dashboard displays the total metrics including Repos, Followers, Following and Gists with correct numeric values")
    public void theDashboardDisplaysMetrics() {
        assertTrue(profileSearchPage.isMetricsDashboardVisible(), "Metrics dashboard should be visible");
        assertTrue(profileSearchPage.isReposMetricVisible(), "Repos metric should be visible");
        assertTrue(profileSearchPage.isFollowersMetricVisible(), "Followers metric should be visible");
        assertTrue(profileSearchPage.isFollowingMetricVisible(), "Following metric should be visible");
        assertTrue(profileSearchPage.isGistsMetricVisible(), "Gists metric should be visible");
        assertNotNull(profileSearchPage.getReposCount(), "Repos count should have a numeric value");
        assertNotNull(profileSearchPage.getFollowersCount(), "Followers count should have a numeric value");
        assertNotNull(profileSearchPage.getFollowingCount(), "Following count should have a numeric value");
        assertNotNull(profileSearchPage.getGistsCount(), "Gists count should have a numeric value");
    }

    @And("the left section displays user details including Avatar, Full Name, Username, Biography, Location, Company, Web Link and Follow button")
    public void theLeftSectionDisplaysUserDetails() {
        assertTrue(profileSearchPage.isUserAvatarVisible(), "User avatar should be visible");
        assertTrue(profileSearchPage.isFullNameVisible(), "Full name should be visible");
        assertTrue(profileSearchPage.isUsernameVisible(), "Username should be visible");
        assertTrue(profileSearchPage.isBiographyVisible(), "Biography section should be visible");
        assertTrue(profileSearchPage.isLocationVisible(), "Location should be visible");
        assertTrue(profileSearchPage.isCompanyVisible(), "Company should be visible");
        assertTrue(profileSearchPage.isWebLinkVisible(), "Web link should be visible");
        assertTrue(profileSearchPage.isFollowButtonVisible(), "Follow button should be visible");
    }

    @And("the Requests indicator is updated showing the API rate limit consumed")
    public void theRequestsIndicatorIsUpdated() {
        assertTrue(profileSearchPage.isRequestsIndicatorVisible(), "Requests indicator should be visible");
        String requestsText = profileSearchPage.getRequestsIndicatorText();
        assertTrue(requestsText.matches("\\d+/\\d+"), "Requests indicator should show format like '51/60'");
    }
}