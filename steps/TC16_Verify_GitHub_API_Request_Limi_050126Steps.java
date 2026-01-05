package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import com.microsoft.playwright.Page;
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
        profileSearchPage.navigate();
        assertTrue(profileSearchPage.isSearchComponentDisplayed());
    }

    @When("the user enters a valid GitHub username in the search input field")
    public void theUserEntersAValidGitHubUsernameInTheSearchInputField() {
        profileSearchPage.enterUsername("octocat");
    }

    @And("the user clicks the search button to query the GitHub profile")
    public void theUserClicksTheSearchButtonToQueryTheGitHubProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile data is retrieved and displayed on screen")
    public void theProfileDataIsRetrievedAndDisplayedOnScreen() {
        assertTrue(profileSearchPage.isProfileDataDisplayed());
    }

    @And("the request limit indicator is visible on the interface")
    public void theRequestLimitIndicatorIsVisibleOnTheInterface() {
        assertTrue(profileSearchPage.isRequestLimitIndicatorVisible());
    }

    @And("the request limit indicator displays in the correct format showing current and total requests")
    public void theRequestLimitIndicatorDisplaysInTheCorrectFormatShowingCurrentAndTotalRequests() {
        String requestLimitText = profileSearchPage.getRequestLimitIndicatorText();
        assertTrue("Request limit format is incorrect. Expected format: XX/YY, but got: " + requestLimitText,
                   requestLimitText.matches("\\d+/\\d+"));
    }
}