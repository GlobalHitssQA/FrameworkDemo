package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileNameSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private static final String TEST_USERNAME = "torvalds";

    public GitHubProfileNameSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the GitHub profile search component is loaded")
    public void theGitHubProfileSearchComponentIsLoaded() {
        profilePage.navigateToSearchComponent();
        assertTrue("Search input should be visible", profilePage.isSearchInputVisible());
    }

    @When("I enter a valid GitHub username in the search field")
    public void iEnterAValidGitHubUsernameInTheSearchField() {
        profilePage.enterUsername(TEST_USERNAME);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profilePage.clickSearchButton();
        profilePage.waitForProfileToLoad();
    }

    @Then("the user full name should be displayed in the profile details area")
    public void theUserFullNameShouldBeDisplayedInTheProfileDetailsArea() {
        assertTrue("Full name should be visible", profilePage.isFullNameVisible());
        String fullName = profilePage.getFullName();
        assertNotNull("Full name should not be null", fullName);
        assertFalse("Full name should not be empty", fullName.trim().isEmpty());
    }

    @And("the username should be displayed with @ prefix")
    public void theUsernameShouldBeDisplayedWithPrefix() {
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        String displayedUsername = profilePage.getUsername();
        assertTrue("Username should start with @", displayedUsername.startsWith("@"));
        assertEquals("Username should match expected format", "@" + TEST_USERNAME, displayedUsername);
    }

    @And("both name fields should be positioned and formatted correctly")
    public void bothNameFieldsShouldBePositionedAndFormattedCorrectly() {
        assertTrue("Full name should be displayed above username", profilePage.isFullNameAboveUsername());
        assertTrue("Name fields container should be visible", profilePage.isNameContainerVisible());
    }
}