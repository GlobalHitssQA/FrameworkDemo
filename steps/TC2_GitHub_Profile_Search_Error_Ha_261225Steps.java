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

    @Given("the user is on the GitHub profile search page")
    public void theUserIsOnTheGitHubProfileSearchPage() {
        profileSearchPage.navigateToSearchPage();
    }

    @Given("the search component is displayed with input field and search button")
    public void theSearchComponentIsDisplayedWithInputFieldAndSearchButton() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a non-existent username {string}")
    public void theUserEntersANonExistentUsername(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be displayed in input", username, profileSearchPage.getSearchInputValue());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should display an error message indicating user not found")
    public void theSystemShouldDisplayAnErrorMessageIndicatingUserNotFound() {
        assertTrue("Error message should be visible", profileSearchPage.isErrorMessageVisible());
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no existe") ||
            errorMessage.toLowerCase().contains("error"));
    }

    @And("the profile metrics section should not display any data")
    public void theProfileMetricsSectionShouldNotDisplayAnyData() {
        assertFalse("Repos counter should not be visible", profileSearchPage.isReposCounterVisible());
        assertFalse("Followers counter should not be visible", profileSearchPage.isFollowersCounterVisible());
        assertFalse("Following counter should not be visible", profileSearchPage.isFollowingCounterVisible());
        assertFalse("Gists counter should not be visible", profileSearchPage.isGistsCounterVisible());
    }

    @And("the profile information section should remain empty")
    public void theProfileInformationSectionShouldRemainEmpty() {
        assertFalse("User avatar should not be visible", profileSearchPage.isUserAvatarVisible());
        assertFalse("User full name should not be visible", profileSearchPage.isUserFullNameVisible());
        assertFalse("User bio should not be visible", profileSearchPage.isUserBioVisible());
        assertFalse("User location should not be visible", profileSearchPage.isUserLocationVisible());
        assertFalse("User company should not be visible", profileSearchPage.isUserCompanyVisible());
    }
}