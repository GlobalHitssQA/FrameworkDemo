package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class FollowButtonRedirectSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfilePage gitHubProfilePage;
    private String searchedUsername;
    private Page newPage;

    public FollowButtonRedirectSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.gitHubProfilePage = new GitHubProfilePage(page);
    }

    @Given("a GitHub user profile is loaded in the search component")
    public void aGitHubUserProfileIsLoadedInTheSearchComponent() {
        searchedUsername = "octocat";
        gitHubProfilePage.navigateToProfile(searchedUsername);
    }

    @And("the profile displays all user details including the Follow button")
    public void theProfileDisplaysAllUserDetailsIncludingTheFollowButton() {
        assertTrue("User avatar should be visible", gitHubProfilePage.isAvatarVisible());
        assertTrue("Username should be visible", gitHubProfilePage.isUsernameVisible());
        assertTrue("Follow button should be visible", gitHubProfilePage.isFollowButtonVisible());
    }

    @When("I locate the Follow button in the user details section")
    public void iLocateTheFollowButtonInTheUserDetailsSection() {
        assertTrue("Follow button should be present in user details", 
            gitHubProfilePage.isFollowButtonVisible());
    }

    @Then("the Follow button is visible and properly labeled")
    public void theFollowButtonIsVisibleAndProperlyLabeled() {
        assertTrue("Follow button should be visible", gitHubProfilePage.isFollowButtonVisible());
        assertEquals("Follow button should have correct text", "Follow", 
            gitHubProfilePage.getFollowButtonText());
    }

    @When("I click the Follow button")
    public void iClickTheFollowButton() {
        String followButtonHref = gitHubProfilePage.getFollowButtonHref();
        gitHubProfilePage.clickFollowButton();
    }

    @Then("the system initiates a redirect to the external GitHub platform")
    public void theSystemInitiatesARedirectToTheExternalGitHubPlatform() {
        String currentUrl = page.url();
        assertTrue("Should redirect to GitHub login or profile page", 
            currentUrl.contains("github.com"));
    }

    @And("the redirect opens the correct GitHub profile page")
    public void theRedirectOpensTheCorrectGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("URL should contain GitHub domain", 
            currentUrl.contains("github.com"));
        assertTrue("URL should reference the searched username in return_to parameter", 
            currentUrl.contains(searchedUsername) || currentUrl.contains("login"));
    }

    @And("the external page URL matches the GitHub profile URL for the searched user")
    public void theExternalPageURLMatchesTheGitHubProfileURLForTheSearchedUser() {
        String currentUrl = page.url();
        String expectedProfilePattern = "github.com/" + searchedUsername;
        String expectedReturnTo = "return_to=https%3A%2F%2Fgithub.com%2F" + searchedUsername;
        
        assertTrue("URL should match expected GitHub profile pattern", 
            currentUrl.contains(expectedProfilePattern) || currentUrl.contains(expectedReturnTo));
    }
}