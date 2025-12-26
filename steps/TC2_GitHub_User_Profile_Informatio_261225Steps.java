package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.junit.Assert;
import pages.GitHubProfilePage;
import pages.GitHubSearchPage;

public class GitHubProfileSteps {

    private WebDriver driver;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;

    public GitHubProfileSteps(WebDriver driver) {
        this.driver = driver;
        this.searchPage = new GitHubSearchPage(driver);
        this.profilePage = new GitHubProfilePage(driver);
    }

    @Given("the GitHub profile search interface is accessible")
    public void theGitHubProfileSearchInterfaceIsAccessible() {
        searchPage.navigateToSearchPage();
        Assert.assertTrue("Search interface should be accessible", searchPage.isSearchInputDisplayed());
    }

    @Given("I am on the GitHub user search page")
    public void iAmOnTheGitHubUserSearchPage() {
        searchPage.navigateToUserSearch();
        Assert.assertTrue("User search page should be displayed", searchPage.isOnUserSearchPage());
    }

    @When("I search for an existing user {string} with complete profile information")
    public void iSearchForAnExistingUserWithCompleteProfileInformation(String username) {
        searchPage.searchForUser(username);
        searchPage.clickOnFirstUserResult();
    }

    @When("I search for a user with incomplete profile information")
    public void iSearchForAUserWithIncompleteProfileInformation() {
        searchPage.searchForUser("torvalds2010");
        searchPage.clickOnFirstUserResult();
    }

    @Then("the system should successfully retrieve the user profile")
    public void theSystemShouldSuccessfullyRetrieveTheUserProfile() {
        Assert.assertTrue("Profile page should be loaded", profilePage.isProfilePageLoaded());
    }

    @And("the user avatar should be displayed correctly in the left section")
    public void theUserAvatarShouldBeDisplayedCorrectlyInTheLeftSection() {
        Assert.assertTrue("Avatar should be displayed", profilePage.isAvatarDisplayed());
        Assert.assertTrue("Avatar should be loaded correctly", profilePage.isAvatarLoadedCorrectly());
    }

    @And("the full name {string} should be displayed")
    public void theFullNameShouldBeDisplayed(String expectedFullName) {
        String actualFullName = profilePage.getFullName();
        Assert.assertEquals("Full name should match", expectedFullName, actualFullName);
    }

    @And("the username should be displayed with format {string}")
    public void theUsernameShouldBeDisplayedWithFormat(String expectedUsername) {
        String actualUsername = profilePage.getUsername();
        Assert.assertTrue("Username should contain expected value", 
            actualUsername.contains(expectedUsername.replace("@", "")));
    }

    @And("the user biography should be displayed if available")
    public void theUserBiographyShouldBeDisplayedIfAvailable() {
        if (profilePage.hasBiography()) {
            Assert.assertFalse("Biography should not be empty", 
                profilePage.getBiography().isEmpty());
        }
    }

    @And("the location {string} should be displayed")
    public void theLocationShouldBeDisplayed(String expectedLocation) {
        Assert.assertTrue("Location should be displayed", profilePage.isLocationDisplayed());
        String actualLocation = profilePage.getLocation();
        Assert.assertEquals("Location should match", expectedLocation, actualLocation);
    }

    @And("the organization {string} should be displayed")
    public void theOrganizationShouldBeDisplayed(String expectedOrganization) {
        Assert.assertTrue("Organization should be displayed", profilePage.isOrganizationDisplayed());
        String actualOrganization = profilePage.getOrganization();
        Assert.assertEquals("Organization should match", expectedOrganization, actualOrganization);
    }

    @And("the personal website link should be displayed if available")
    public void thePersonalWebsiteLinkShouldBeDisplayedIfAvailable() {
        if (profilePage.hasWebsiteLink()) {
            Assert.assertTrue("Website link should be clickable", 
                profilePage.isWebsiteLinkClickable());
        }
    }

    @And("the Follow button should be visible for external GitHub following")
    public void theFollowButtonShouldBeVisibleForExternalGitHubFollowing() {
        Assert.assertTrue("Follow button should be visible", profilePage.isFollowButtonDisplayed());
    }

    @Then("fields without information should appear empty or show {string}")
    public void fieldsWithoutInformationShouldAppearEmptyOrShow(String placeholder) {
        if (!profilePage.hasBiography()) {
            String bioText = profilePage.getBiographyOrPlaceholder();
            Assert.assertTrue("Bio should be empty or show placeholder",
                bioText.isEmpty() || bioText.equals(placeholder));
        }
    }

    @And("the avatar should still be displayed")
    public void theAvatarShouldStillBeDisplayed() {
        Assert.assertTrue("Avatar should be displayed", profilePage.isAvatarDisplayed());
    }

    @And("the username should still be displayed")
    public void theUsernameShouldStillBeDisplayed() {
        Assert.assertFalse("Username should not be empty", profilePage.getUsername().isEmpty());
    }
}