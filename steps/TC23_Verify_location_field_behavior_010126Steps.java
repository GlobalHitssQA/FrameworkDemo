package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class ProfileLocationSteps {
    
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfilePage profilePage;
    
    private static final String USERNAME_WITHOUT_LOCATION = "testuser";
    
    @Given("the user navigates to the GitHub profile search application")
    public void theUserNavigatesToTheGitHubProfileSearchApplication() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigateToHomePage();
        assertTrue("Application should load successfully", profilePage.isPageLoaded());
    }
    
    @When("the user searches for a GitHub username without location data")
    public void theUserSearchesForAGitHubUsernameWithoutLocationData() {
        profilePage.navigateToUserProfile(USERNAME_WITHOUT_LOCATION);
    }
    
    @Then("the profile page loads successfully")
    public void theProfilePageLoadsSuccessfully() {
        assertTrue("Profile page should be loaded", profilePage.isProfilePageLoaded());
    }
    
    @And("the user information section is displayed on the left side")
    public void theUserInformationSectionIsDisplayedOnTheLeftSide() {
        assertTrue("User information section should be visible", profilePage.isUserInfoSectionVisible());
    }
    
    @And("the location field appears empty or displays placeholder text")
    public void theLocationFieldAppearsEmptyOrDisplaysPlaceholderText() {
        boolean isLocationEmpty = profilePage.isLocationFieldEmpty();
        boolean hasPlaceholderText = profilePage.hasLocationPlaceholderText();
        assertTrue("Location field should be empty or show placeholder", isLocationEmpty || hasPlaceholderText);
    }
    
    @And("other profile fields display correctly without being affected by missing location")
    public void otherProfileFieldsDisplayCorrectlyWithoutBeingAffectedByMissingLocation() {
        assertTrue("Avatar should be visible", profilePage.isAvatarVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertTrue("Full name should be visible or empty gracefully", profilePage.isFullNameDisplayedOrEmpty());
        assertTrue("Followers count should be visible", profilePage.isFollowersCountVisible());
        assertTrue("Following count should be visible", profilePage.isFollowingCountVisible());
    }
}