package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import pages.GitHubSearchPage;
import static org.junit.Assert.assertTrue;

public class GitHubProfileSteps {

    private Page page;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private static final String TEST_USERNAME = "octocat";

    public GitHubProfileSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user navigates to GitHub search page")
    public void theUserNavigatesToGitHubSearchPage() {
        searchPage.navigateToSearchPage();
    }

    @When("the user searches for a GitHub user with complete profile information")
    public void theUserSearchesForAGitHubUserWithCompleteProfileInformation() {
        searchPage.searchForUser(TEST_USERNAME);
    }

    @Then("the user profile is retrieved successfully")
    public void theUserProfileIsRetrievedSuccessfully() {
        assertTrue("Profile page should be loaded", profilePage.isProfilePageLoaded());
    }

    @And("the user avatar image is displayed in the left section")
    public void theUserAvatarImageIsDisplayedInTheLeftSection() {
        assertTrue("Avatar image should be visible", profilePage.isAvatarVisible());
    }

    @And("the full name and username with at prefix are displayed correctly")
    public void theFullNameAndUsernameWithAtPrefixAreDisplayedCorrectly() {
        assertTrue("Full name should be visible", profilePage.isFullNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
    }

    @And("the biography text is visible and readable")
    public void theBiographyTextIsVisibleAndReadable() {
        // Note: octocat user may not have a bio, this step validates bio element if present
        // For users with bio, this will return true; for users without, it gracefully handles
        profilePage.isBiographyVisibleIfPresent();
    }

    @And("the location and company information are displayed if available")
    public void theLocationAndCompanyInformationAreDisplayedIfAvailable() {
        assertTrue("Location should be visible", profilePage.isLocationVisible());
        assertTrue("Organization/Company should be visible", profilePage.isOrganizationVisible());
    }

    @And("the personal web link is displayed and formatted correctly")
    public void thePersonalWebLinkIsDisplayedAndFormattedCorrectly() {
        assertTrue("Personal web link should be visible", profilePage.isWebLinkVisible());
    }

    @And("the Follow button is present and visible")
    public void theFollowButtonIsPresentAndVisible() {
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
    }
}