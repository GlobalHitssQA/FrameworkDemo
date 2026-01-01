package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GistsCountVerificationSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private int expectedGistsCount;

    public GistsCountVerificationSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub Profile Search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigate();
    }

    @And("the search component loads successfully")
    public void theSearchComponentLoadsSuccessfully() {
        assertTrue("Search component should be visible", profileSearchPage.isSearchComponentVisible());
    }

    @When("the user enters a valid GitHub username that has public gists")
    public void theUserEntersAValidGitHubUsernameThatHasPublicGists() {
        String usernameWithGists = "addyosmani";
        profileSearchPage.enterUsername(usernameWithGists);
    }

    @And("the user clicks the search button to fetch the profile")
    public void theUserClicksTheSearchButtonToFetchTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves user data from the GitHub API")
    public void theSystemRetrievesUserDataFromTheGitHubAPI() {
        profileSearchPage.waitForProfileDataToLoad();
        assertTrue("Profile data should be loaded", profileSearchPage.isProfileDataVisible());
    }

    @And("the dashboard displays the Gists metric prominently")
    public void theDashboardDisplaysTheGistsMetricProminently() {
        assertTrue("Gists metric should be visible in dashboard", profileSearchPage.isGistsMetricVisible());
    }

    @And("the Gists count matches the actual number of public gists from the API response")
    public void theGistsCountMatchesTheActualNumberOfPublicGistsFromTheAPIResponse() {
        int displayedGistsCount = profileSearchPage.getGistsCount();
        int apiGistsCount = profileSearchPage.getGistsCountFromAPI();
        assertEquals("Gists count should match API response", apiGistsCount, displayedGistsCount);
    }
}