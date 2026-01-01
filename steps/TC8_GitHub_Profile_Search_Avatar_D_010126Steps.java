package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.assertTrue;

public class GitHubProfileSearchAvatarSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME = "octocat";

    public GitHubProfileSearchAvatarSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Search component is open")
    public void theGitHubProfileSearchComponentIsOpen() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInterfaceVisible());
    }

    @When("I enter a valid GitHub username in the search field")
    public void iEnterAValidGitHubUsernameInTheSearchField() {
        profileSearchPage.enterUsername(TEST_USERNAME);
        assertTrue("Username should be displayed in input field", 
            profileSearchPage.getSearchInputValue().equals(TEST_USERNAME));
    }

    @And("I click the search button to retrieve user profile data")
    public void iClickTheSearchButtonToRetrieveUserProfileData() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the left profile section should be visible with user details")
    public void theLeftProfileSectionShouldBeVisibleWithUserDetails() {
        assertTrue("Profile section should be visible", profileSearchPage.isProfileSectionVisible());
    }

    @And("the user avatar should be loaded and displayed correctly")
    public void theUserAvatarShouldBeLoadedAndDisplayedCorrectly() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Avatar should be properly sized", profileSearchPage.isAvatarProperlySized());
        assertTrue("Avatar source should match GitHub profile", profileSearchPage.isAvatarSourceValid());
    }

    @And("the avatar image should load without errors or broken image icons")
    public void theAvatarImageShouldLoadWithoutErrorsOrBrokenImageIcons() {
        assertTrue("Avatar should not be broken", profileSearchPage.isAvatarLoadedSuccessfully());
        assertTrue("Avatar should display without rendering issues", profileSearchPage.hasNoAvatarRenderingIssues());
    }
}