package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.options.RequestOptions;
import pages.GitHubSearchPage;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private JsonObject apiResponse;
    private static final String TEST_USERNAME = "torvalds";
    private static final String GITHUB_API_URL = "https://api.github.com/users/";

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user is on the GitHub search page")
    public void theUserIsOnTheGitHubSearchPage() {
        searchPage.navigateToSearchPage();
        assertTrue("Search interface should be displayed", searchPage.isSearchInputVisible());
    }

    @When("the user enters a known GitHub username {string} in the search field")
    public void theUserEntersAKnownGitHubUsername(String username) {
        searchPage.enterSearchQuery(username);
        assertTrue("Username should be entered in the search field", 
            searchPage.getSearchInputValue().contains(username));
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.submitSearch();
    }

    @And("the user navigates to the Users filter to find user profiles")
    public void theUserNavigatesToTheUsersFilter() {
        searchPage.clickUsersFilter();
        assertTrue("Users search results should be displayed", 
            searchPage.isUsersResultsVisible());
    }

    @And("the user clicks on the user profile link")
    public void theUserClicksOnTheUserProfileLink() {
        searchPage.clickFirstUserResult();
        // Fetch API response for validation
        APIResponse response = page.context().request().get(
            GITHUB_API_URL + TEST_USERNAME,
            RequestOptions.create().setHeader("Accept", "application/vnd.github.v3+json")
        );
        apiResponse = JsonParser.parseString(response.text()).getAsJsonObject();
    }

    @Then("the API response should contain all required profile fields")
    public void theAPIResponseShouldContainAllRequiredProfileFields() {
        assertNotNull("API response should not be null", apiResponse);
        
        // Verify all required fields are present
        assertTrue("Response should contain avatar_url", apiResponse.has("avatar_url"));
        assertTrue("Response should contain name", apiResponse.has("name"));
        assertTrue("Response should contain login", apiResponse.has("login"));
        assertTrue("Response should contain bio", apiResponse.has("bio"));
        assertTrue("Response should contain location", apiResponse.has("location"));
        assertTrue("Response should contain company", apiResponse.has("company"));
        assertTrue("Response should contain blog", apiResponse.has("blog"));
        assertTrue("Response should contain followers", apiResponse.has("followers"));
        assertTrue("Response should contain following", apiResponse.has("following"));
        assertTrue("Response should contain public_repos", apiResponse.has("public_repos"));
        assertTrue("Response should contain public_gists", apiResponse.has("public_gists"));
    }

    @And("the profile information should be correctly displayed in the UI")
    public void theProfileInformationShouldBeCorrectlyDisplayedInTheUI() {
        // Verify avatar is displayed
        assertTrue("User avatar should be visible", profilePage.isAvatarVisible());
        
        // Verify name and username are displayed
        String displayedName = profilePage.getFullName();
        String displayedUsername = profilePage.getUsername();
        assertNotNull("Full name should be displayed", displayedName);
        assertEquals("Username should match", TEST_USERNAME, displayedUsername.toLowerCase());
        
        // Verify location is displayed
        assertTrue("Location should be visible", profilePage.isLocationVisible());
        
        // Verify organization/company is displayed
        assertTrue("Organization should be visible", profilePage.isOrganizationVisible());
    }

    @And("the user metrics should be visible in the profile section")
    public void theUserMetricsShouldBeVisibleInTheProfileSection() {
        // Verify followers count is displayed
        assertTrue("Followers count should be visible", profilePage.isFollowersCountVisible());
        
        // Verify following count is displayed  
        assertTrue("Following count should be visible", profilePage.isFollowingCountVisible());
        
        // Verify repositories count is displayed
        assertTrue("Repositories count should be visible", profilePage.isRepositoriesCountVisible());
        
        // Verify Follow button is present
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
    }
}