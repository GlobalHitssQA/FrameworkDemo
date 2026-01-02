package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.assertTrue;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
        assertTrue("Search interface should be displayed", profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters a valid GitHub username {string} in the search field")
    public void theUserEntersAValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the metrics dashboard displays the repository count")
    public void theMetricsDashboardDisplaysTheRepositoryCount() {
        assertTrue("Repository count should be visible", profileSearchPage.isReposCountVisible());
    }

    @And("the metrics dashboard displays the followers count")
    public void theMetricsDashboardDisplaysTheFollowersCount() {
        assertTrue("Followers count should be visible", profileSearchPage.isFollowersCountVisible());
    }

    @And("the metrics dashboard displays the following count")
    public void theMetricsDashboardDisplaysTheFollowingCount() {
        assertTrue("Following count should be visible", profileSearchPage.isFollowingCountVisible());
    }

    @And("the metrics dashboard displays the gists count")
    public void theMetricsDashboardDisplaysTheGistsCount() {
        assertTrue("Gists count should be visible", profileSearchPage.isGistsCountVisible());
    }

    @And("the profile section displays the user avatar")
    public void theProfileSectionDisplaysTheUserAvatar() {
        assertTrue("User avatar should be visible", profileSearchPage.isAvatarVisible());
    }

    @And("the profile section displays the full name and username")
    public void theProfileSectionDisplaysTheFullNameAndUsername() {
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
    }

    @And("the profile section displays the biography")
    public void theProfileSectionDisplaysTheBiography() {
        assertTrue("Biography should be visible", profileSearchPage.isBiographyVisible());
    }

    @And("the profile section displays the location")
    public void theProfileSectionDisplaysTheLocation() {
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
    }

    @And("the profile section displays the company")
    public void theProfileSectionDisplaysTheCompany() {
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
    }

    @And("the profile section displays the web link")
    public void theProfileSectionDisplaysTheWebLink() {
        assertTrue("Web link should be visible", profileSearchPage.isWebLinkVisible());
    }

    @And("the profile section displays the Follow button")
    public void theProfileSectionDisplaysTheFollowButton() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
    }

    @And("the followers section displays a list of followers with avatars and usernames")
    public void theFollowersSectionDisplaysAListOfFollowers() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers should have avatars", profileSearchPage.doFollowersHaveAvatars());
        assertTrue("Followers should have usernames", profileSearchPage.doFollowersHaveUsernames());
    }

    @And("the API request indicator displays the current usage status")
    public void theAPIRequestIndicatorDisplaysTheCurrentUsageStatus() {
        assertTrue("API request indicator should be visible", profileSearchPage.isApiRequestIndicatorVisible());
        assertTrue("API usage should show valid format", profileSearchPage.isApiUsageFormatValid());
    }
}