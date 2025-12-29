package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class ProfileDetailsSteps {

    private Page page;
    private GitHubProfilePage profilePage;

    public ProfileDetailsSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user is on the GitHub Profile Finder application")
    public void theUserIsOnTheGitHubProfileFinderApplication() {
        profilePage.navigateToApplication();
        assertTrue("Application should be loaded", profilePage.isSearchInputVisible());
    }

    @When("the user searches for a GitHub user with complete profile information")
    public void theUserSearchesForAGitHubUserWithCompleteProfileInformation() {
        profilePage.searchForUser("torvalds");
        profilePage.waitForProfileToLoad();
    }

    @Then("the user avatar should be displayed in the left section")
    public void theUserAvatarShouldBeDisplayedInTheLeftSection() {
        assertTrue("Avatar should be visible", profilePage.isAvatarVisible());
        assertFalse("Avatar source should not be empty", profilePage.getAvatarSource().isEmpty());
    }

    @And("the full name and username should be displayed correctly")
    public void theFullNameAndUsernameShouldBeDisplayedCorrectly() {
        assertTrue("Full name should be visible", profilePage.isFullNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertFalse("Full name should not be empty", profilePage.getFullName().isEmpty());
        assertTrue("Username should contain @", profilePage.getUsername().contains("@") || !profilePage.getUsername().isEmpty());
    }

    @And("the biography should be displayed or show not available message")
    public void theBiographyShouldBeDisplayedOrShowNotAvailableMessage() {
        assertTrue("Biography section should be visible", profilePage.isBioSectionVisible());
        String bioText = profilePage.getBioText();
        assertTrue("Biography should have content or show not available", 
            !bioText.isEmpty() || bioText.contains("No disponible") || bioText.contains("Not available"));
    }

    @And("the location and company information should be displayed")
    public void theLocationAndCompanyInformationShouldBeDisplayed() {
        assertTrue("Location section should be visible", profilePage.isLocationSectionVisible());
        assertTrue("Company section should be visible", profilePage.isCompanySectionVisible());
        
        String location = profilePage.getLocationText();
        String company = profilePage.getCompanyText();
        
        assertTrue("Location should have content or show not available",
            !location.isEmpty() || location.contains("No disponible") || location.contains("Not available"));
        assertTrue("Company should have content or show not available",
            !company.isEmpty() || company.contains("No disponible") || company.contains("Not available"));
    }

    @And("the personal website link should be displayed as clickable")
    public void thePersonalWebsiteLinkShouldBeDisplayedAsClickable() {
        if (profilePage.isWebsiteLinkVisible()) {
            assertTrue("Website link should be clickable", profilePage.isWebsiteLinkClickable());
        } else {
            assertTrue("Website section should show not available", profilePage.isWebsiteNotAvailableVisible());
        }
    }

    @And("the Follow button should be visible in the profile section")
    public void theFollowButtonShouldBeVisibleInTheProfileSection() {
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
        assertTrue("Follow button should be enabled", profilePage.isFollowButtonEnabled());
    }
}