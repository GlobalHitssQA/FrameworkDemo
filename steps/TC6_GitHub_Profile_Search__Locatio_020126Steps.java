package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSearchSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private final String TEST_USERNAME_NO_LOCATION = "test-user-no-location";

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub profile search application is loaded")
    public void theGitHubProfileSearchApplicationIsLoaded() {
        profileSearchPage.navigateTo("https://github.com");
        assertTrue(profileSearchPage.isSearchInputVisible(), "Application should load successfully");
    }

    @When("I enter a GitHub username with no location information")
    public void iEnterAGitHubUsernameWithNoLocationInformation() {
        profileSearchPage.enterUsername(TEST_USERNAME_NO_LOCATION);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the user profile should be displayed")
    public void theUserProfileShouldBeDisplayed() {
        assertTrue(profileSearchPage.isUserDetailsVisible(), "User profile should be displayed");
    }

    @And("the location field should be present in the user information section")
    public void theLocationFieldShouldBePresentInTheUserInformationSection() {
        assertTrue(profileSearchPage.isLocationFieldPresent(), "Location field should be present in layout");
    }

    @And("the location field should appear empty without placeholder text")
    public void theLocationFieldShouldAppearEmptyWithoutPlaceholderText() {
        String locationText = profileSearchPage.getLocationText();
        assertTrue(locationText == null || locationText.trim().isEmpty(), "Location field should be empty or blank");
    }
}