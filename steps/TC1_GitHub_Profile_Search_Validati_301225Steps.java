package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        profileSearchPage.navigateToSearchComponent();
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("I enter a valid existing GitHub username {string} in the search input field")
    public void iEnterAValidExistingGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, profileSearchPage.getSearchInputValue());
    }

    @And("I click the search button to initiate the search")
    public void iClickTheSearchButtonToInitiateTheSearch() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the metrics dashboard displays the correct values for Repos, Followers, Following, and Gists")
    public void theMetricsDashboardDisplaysCorrectValues() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
        assertNotNull("Repos count should have a value", profileSearchPage.getReposCount());
        assertNotNull("Followers count should have a value", profileSearchPage.getFollowersCount());
        assertNotNull("Following count should have a value", profileSearchPage.getFollowingCount());
        assertNotNull("Gists count should have a value", profileSearchPage.getGistsCount());
    }

    @And("the user avatar image is displayed in the left section")
    public void theUserAvatarImageIsDisplayed() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Avatar should have valid src", profileSearchPage.getAvatarSrc().contains("avatars"));
    }

    @And("the full name and username with @ prefix are visible and correctly formatted")
    public void theFullNameAndUsernameAreVisible() {
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        String username = profileSearchPage.getUsernameText();
        assertTrue("Username should start with @", username.startsWith("@"));
    }

    @And("the biography, location, company, and web link are displayed")
    public void theBiographyLocationCompanyAndWebLinkAreDisplayed() {
        assertTrue("Biography section should be visible or show 'No disponible'", 
            profileSearchPage.isBioVisible() || profileSearchPage.isBioNotAvailable());
        assertTrue("Location section should be visible or show 'No disponible'", 
            profileSearchPage.isLocationVisible() || profileSearchPage.isLocationNotAvailable());
        assertTrue("Company section should be visible or show 'No disponible'", 
            profileSearchPage.isCompanyVisible() || profileSearchPage.isCompanyNotAvailable());
        assertTrue("Web link section should be visible or show 'No disponible'", 
            profileSearchPage.isWebLinkVisible() || profileSearchPage.isWebLinkNotAvailable());
    }

    @And("the Follow button is present and functional")
    public void theFollowButtonIsPresentAndFunctional() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
        assertTrue("Follow button should be enabled", profileSearchPage.isFollowButtonEnabled());
    }

    @And("the API request limit indicator is displayed")
    public void theApiRequestLimitIndicatorIsDisplayed() {
        assertTrue("API limit indicator should be visible", profileSearchPage.isApiLimitIndicatorVisible());
        String limitText = profileSearchPage.getApiLimitText();
        assertTrue("API limit should match format XX/60", limitText.matches("\\d+/60"));
    }
}