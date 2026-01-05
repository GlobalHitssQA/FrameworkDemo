package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private static final String TEST_USERNAME = "torvalds";

    public GitHubProfileSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user navigates to the GitHub Profile Search application")
    public void navigateToApplication() {
        profilePage.navigateTo();
    }

    @When("the user enters a valid GitHub username with complete profile information")
    public void enterValidUsername() {
        profilePage.enterUsername(TEST_USERNAME);
    }

    @And("the user clicks the search button")
    public void clickSearchButton() {
        profilePage.clickSearchButton();
        profilePage.waitForProfileToLoad();
    }

    @Then("the user avatar should be displayed in the left section")
    public void verifyAvatarDisplayed() {
        assertTrue(profilePage.isAvatarVisible(), "Avatar should be visible");
        assertNotNull(profilePage.getAvatarSource(), "Avatar source should not be null");
    }

    @And("the full name and username should be displayed")
    public void verifyNameAndUsername() {
        assertTrue(profilePage.isFullNameVisible(), "Full name should be visible");
        assertTrue(profilePage.isUsernameVisible(), "Username should be visible");
        String username = profilePage.getUsername();
        assertTrue(username.startsWith("@"), "Username should start with @ symbol");
    }

    @And("the biography should be displayed or show as not available")
    public void verifyBiography() {
        assertTrue(profilePage.isBiographyVisible(), "Biography section should be visible");
        String bio = profilePage.getBiography();
        assertNotNull(bio, "Biography should not be null");
    }

    @And("the location field should be displayed or show as empty")
    public void verifyLocation() {
        assertTrue(profilePage.isLocationSectionVisible(), "Location section should be visible");
    }

    @And("the company field should be displayed or show as empty")
    public void verifyCompany() {
        assertTrue(profilePage.isCompanySectionVisible(), "Company section should be visible");
    }

    @And("the web link should be displayed as a clickable hyperlink or show as empty")
    public void verifyWebLink() {
        assertTrue(profilePage.isWebLinkSectionVisible(), "Web link section should be visible");
        if (profilePage.hasWebLink()) {
            assertTrue(profilePage.isWebLinkClickable(), "Web link should be clickable");
        }
    }

    @And("the follow button should be visible and functional")
    public void verifyFollowButton() {
        assertTrue(profilePage.isFollowButtonVisible(), "Follow button should be visible");
        assertTrue(profilePage.isFollowButtonEnabled(), "Follow button should be enabled");
    }

    @And("all fields should be properly aligned in the left section")
    public void verifyLayoutAlignment() {
        assertTrue(profilePage.isLeftSectionDisplayed(), "Left section should be displayed");
        assertTrue(profilePage.areFieldsProperlyAligned(), "All fields should be properly aligned");
    }
}