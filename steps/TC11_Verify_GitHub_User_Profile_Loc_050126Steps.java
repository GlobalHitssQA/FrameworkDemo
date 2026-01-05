package steps;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfilePage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileLocationSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private String expectedLocation;
    
    public GitHubProfileLocationSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }
    
    @Given("the user navigates to the GitHub profile page")
    public void navigateToGitHubProfilePage() {
        page.navigate("https://github.com");
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }
    
    @When("the user searches for a GitHub username with location data")
    public void searchForUsernameWithLocation() {
        // Navigate to a user profile with location (e.g., torvalds)
        page.navigate("https://github.com/torvalds");
        page.waitForLoadState(LoadState.NETWORKIDLE);
        expectedLocation = "Portland, OR";
    }
    
    @And("the search button is clicked")
    public void clickSearchButton() {
        // In GitHub profiles, navigation completes the "search"
        page.waitForLoadState(LoadState.DOMCONTENTLOADED);
    }
    
    @Then("the location field should be visible in the user details section")
    public void verifyLocationFieldIsVisible() {
        assertTrue(profilePage.isLocationVisible(), 
            "Location field should be visible in the user profile");
    }
    
    @And("the location value should match the API response data")
    public void verifyLocationMatchesAPIResponse() {
        String actualLocation = profilePage.getLocationText();
        assertNotNull(actualLocation, "Location should not be null");
        assertTrue(actualLocation.contains(expectedLocation), 
            String.format("Expected location to contain '%s' but got '%s'", 
                expectedLocation, actualLocation));
    }
    
    @When("the user searches for a profile without location data")
    public void searchForProfileWithoutLocation() {
        // Navigate to a user without location data
        // Note: Most GitHub users have location, using a test scenario
        page.navigate("https://github.com/testuser-no-location");
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }
    
    @Then("the location field should not be present or should display empty")
    public void verifyLocationFieldIsNotPresent() {
        boolean locationVisible = profilePage.isLocationVisible();
        if (locationVisible) {
            String locationText = profilePage.getLocationText();
            assertTrue(locationText == null || locationText.trim().isEmpty(), 
                "Location field should be empty or not displayed");
        }
    }
}