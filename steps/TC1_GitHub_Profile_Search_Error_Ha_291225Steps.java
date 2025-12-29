package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchErrorSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchErrorSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Finder component is open")
    public void theGitHubProfileFinderComponentIsOpen() {
        profileSearchPage.navigateToProfileFinder();
    }

    @And("the search input field and search button are visible")
    public void theSearchInputFieldAndSearchButtonAreVisible() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("I enter a non-existent username {string} in the search field")
    public void iEnterANonExistentUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be displayed in the search field", 
            username, profileSearchPage.getSearchInputValue());
    }

    @And("I click on the search button")
    public void iClickOnTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should display an error message indicating the user was not found")
    public void theSystemShouldDisplayAnErrorMessageIndicatingTheUserWasNotFound() {
        assertTrue("Error message should be visible", profileSearchPage.isErrorMessageVisible());
    }

    @And("the error message should be user-friendly and clear")
    public void theErrorMessageShouldBeUserFriendlyAndClear() {
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue("Error message should contain user-friendly text",
            errorMessage.toLowerCase().contains("not found") ||
            errorMessage.toLowerCase().contains("no existe") ||
            errorMessage.toLowerCase().contains("no results") ||
            errorMessage.toLowerCase().contains("user not found"));
    }

    @And("no profile information or metrics should be displayed")
    public void noProfileInformationOrMetricsShouldBeDisplayed() {
        assertFalse("User avatar should not be visible", profileSearchPage.isUserAvatarVisible());
        assertFalse("User name should not be visible", profileSearchPage.isUserNameVisible());
        assertFalse("Repositories count should not be visible", profileSearchPage.isReposCountVisible());
        assertFalse("Followers count should not be visible", profileSearchPage.isFollowersCountVisible());
        assertFalse("Following count should not be visible", profileSearchPage.isFollowingCountVisible());
    }
}