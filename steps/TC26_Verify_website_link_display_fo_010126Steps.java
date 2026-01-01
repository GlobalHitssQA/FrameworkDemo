package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class WebsiteLinkValidationSteps {

    private Page page;
    private GitHubProfilePage profilePage;

    public WebsiteLinkValidationSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user is on the GitHub profile search application")
    public void theUserIsOnTheGitHubProfileSearchApplication() {
        profilePage.navigateToGitHub();
        assertTrue("GitHub homepage should load", profilePage.isPageLoaded());
    }

    @When("the user searches for a GitHub username without a website link")
    public void theUserSearchesForAGitHubUsernameWithoutAWebsiteLink() {
        profilePage.navigateToUserProfile("torvalds");
    }

    @Then("the profile loads successfully")
    public void theProfileLoadsSuccessfully() {
        assertTrue("Profile page should load", profilePage.isProfileLoaded());
    }

    @And("the user information section is displayed")
    public void theUserInformationSectionIsDisplayed() {
        assertTrue("User information section should be visible", profilePage.isUserInfoSectionVisible());
    }

    @And("the website link field is empty or shows not available")
    public void theWebsiteLinkFieldIsEmptyOrShowsNotAvailable() {
        assertFalse("Website link should not be present for this user", profilePage.isWebsiteLinkVisible());
    }

    @And("other profile fields with data are displayed correctly")
    public void otherProfileFieldsWithDataAreDisplayedCorrectly() {
        assertTrue("Full name should be displayed", profilePage.isFullNameVisible());
        assertTrue("Username should be displayed", profilePage.isUsernameVisible());
        assertTrue("Avatar should be displayed", profilePage.isAvatarVisible());
        assertTrue("Followers count should be displayed", profilePage.isFollowersCountVisible());
        assertTrue("Following count should be displayed", profilePage.isFollowingCountVisible());
        assertTrue("Location should be displayed", profilePage.isLocationVisible());
        assertTrue("Organization should be displayed", profilePage.isOrganizationVisible());
    }
}