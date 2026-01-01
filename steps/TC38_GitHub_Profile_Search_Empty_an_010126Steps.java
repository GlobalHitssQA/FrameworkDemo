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
        profileSearchPage.navigateToSearchPage();
    }

    @And("the search interface is displayed with an empty input field")
    public void theSearchInterfaceIsDisplayedWithAnEmptyInputField() {
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInterfaceVisible());
        assertTrue("Search input should be empty", profileSearchPage.isSearchInputEmpty());
    }

    @When("the user leaves the input field empty and clicks the search button")
    public void theUserLeavesTheInputFieldEmptyAndClicksTheSearchButton() {
        profileSearchPage.clearSearchInput();
        profileSearchPage.clickSearchButton();
    }

    @Then("the system prevents the search or displays a validation message")
    public void theSystemPreventsTheSearchOrDisplaysAValidationMessage() {
        boolean validationShown = profileSearchPage.isValidationMessageVisible() 
            || profileSearchPage.isEmptyStateMessageVisible()
            || profileSearchPage.isSearchPrevented();
        assertTrue("System should prevent search or show validation message", validationShown);
    }

    @When("the user enters a non-existent GitHub username")
    public void theUserEntersANonExistentGitHubUsername() {
        String nonExistentUsername = "xyznonexistentuser12345abcdef";
        profileSearchPage.enterUsername(nonExistentUsername);
    }

    @And("the user clicks the search button to trigger the API call")
    public void theUserClicksTheSearchButtonToTriggerTheAPICall() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForSearchResponse();
    }

    @Then("the system displays a user not found error message")
    public void theSystemDisplaysAUserNotFoundErrorMessage() {
        assertTrue("User not found error message should be displayed", 
            profileSearchPage.isUserNotFoundMessageVisible());
    }

    @And("the error message follows the platform design standards")
    public void theErrorMessageFollowsThePlatformDesignStandards() {
        assertTrue("Error message should be user-friendly and visible", 
            profileSearchPage.isErrorMessageUserFriendly());
        assertTrue("Error message should have proper styling", 
            profileSearchPage.hasErrorMessageProperStyling());
    }
}