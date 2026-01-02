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

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @Then("the search component is displayed with text input field and search button")
    public void theSearchComponentIsDisplayedWithTextInputFieldAndSearchButton() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input field")
    public void theUserEntersAValidGitHubUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves the profile information from GitHub API")
    public void theSystemRetrievesTheProfileInformationFromGitHubAPI() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue("Profile section should be visible", profileSearchPage.isProfileSectionVisible());
    }

    @And("the user avatar is displayed in the profile section")
    public void theUserAvatarIsDisplayedInTheProfileSection() {
        assertTrue("User avatar should be visible", profileSearchPage.isAvatarVisible());
    }

    @And("the full name and username are displayed correctly")
    public void theFullNameAndUsernameAreDisplayedCorrectly() {
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertFalse("Username should not be empty", profileSearchPage.getUsername().isEmpty());
    }

    @And("the biography section displays the user description or not available message")
    public void theBiographySectionDisplaysTheUserDescriptionOrNotAvailableMessage() {
        assertTrue("Biography section should be visible", profileSearchPage.isBiographyVisible());
    }

    @And("the location and company fields are displayed correctly")
    public void theLocationAndCompanyFieldsAreDisplayedCorrectly() {
        assertTrue("Location field should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company field should be visible", profileSearchPage.isCompanyVisible());
    }

    @And("the personal website link is displayed or shows not available")
    public void thePersonalWebsiteLinkIsDisplayedOrShowsNotAvailable() {
        assertTrue("Website link section should be visible", profileSearchPage.isWebsiteLinkVisible());
    }

    @And("the Follow button is present and functional")
    public void theFollowButtonIsPresentAndFunctional() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
        assertTrue("Follow button should be enabled", profileSearchPage.isFollowButtonEnabled());
    }
}