package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileReadOnlySteps {

    private Page page;
    private GitHubProfilePage profilePage;

    public GitHubProfileReadOnlySteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user navigates to a GitHub user profile page")
    public void theUserNavigatesToAGitHubUserProfilePage() {
        profilePage.navigateToProfile("octocat");
    }

    @When("the profile is fully loaded with user information")
    public void theProfileIsFullyLoadedWithUserInformation() {
        assertTrue("Profile should be loaded", profilePage.isProfileLoaded());
        assertTrue("User avatar should be visible", profilePage.isAvatarVisible());
        assertTrue("User name should be visible", profilePage.isFullNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
    }

    @Then("all profile fields should be displayed as read-only text")
    public void allProfileFieldsShouldBeDisplayedAsReadOnlyText() {
        assertFalse("Full name should not be editable", profilePage.isElementEditable(profilePage.getFullNameLocator()));
        assertFalse("Username should not be editable", profilePage.isElementEditable(profilePage.getUsernameLocator()));
        assertFalse("Location should not be editable", profilePage.isElementEditable(profilePage.getLocationLocator()));
        assertFalse("Organization should not be editable", profilePage.isElementEditable(profilePage.getOrganizationLocator()));
    }

    @And("no edit buttons or save buttons should be present")
    public void noEditButtonsOrSaveButtonsShouldBePresent() {
        assertFalse("Edit button should not exist", profilePage.isEditButtonPresent());
        assertFalse("Save button should not exist", profilePage.isSaveButtonPresent());
        assertFalse("Edit profile button should not exist for non-owner", profilePage.isEditProfileButtonPresent());
    }

    @And("clicking on profile text fields should not enable editing mode")
    public void clickingOnProfileTextFieldsShouldNotEnableEditingMode() {
        String originalName = profilePage.getFullNameText();
        profilePage.clickOnFullName();
        assertFalse("No input field should appear after clicking name", profilePage.isInputFieldVisibleInProfileSection());
        assertEquals("Name text should remain unchanged", originalName, profilePage.getFullNameText());

        String originalLocation = profilePage.getLocationText();
        profilePage.clickOnLocation();
        assertFalse("No input field should appear after clicking location", profilePage.isInputFieldVisibleInProfileSection());
        assertEquals("Location text should remain unchanged", originalLocation, profilePage.getLocationText());
    }

    @And("only navigation links and external Follow button should be interactive")
    public void onlyNavigationLinksAndExternalFollowButtonShouldBeInteractive() {
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
        assertTrue("Follow button should be a link", profilePage.isFollowButtonALink());
        assertTrue("Followers link should be clickable", profilePage.isFollowersLinkClickable());
        assertTrue("Following link should be clickable", profilePage.isFollowingLinkClickable());
        assertTrue("Organization link should be clickable", profilePage.isOrganizationLinkClickable());
        assertTrue("Website link should be clickable", profilePage.isWebsiteLinkClickable());
    }
}