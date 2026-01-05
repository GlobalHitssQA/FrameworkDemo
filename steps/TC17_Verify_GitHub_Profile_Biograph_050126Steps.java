package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileBiographySteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME_WITHOUT_BIO = "ghost";

    public GitHubProfileBiographySteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub profile search component is displayed")
    public void theGitHubProfileSearchComponentIsDisplayed() {
        profileSearchPage.navigateToSearchComponent();
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input should be visible");
        assertTrue(profileSearchPage.isSearchButtonVisible(), "Search button should be visible");
    }

    @When("I enter a GitHub username that has no biography data")
    public void iEnterAGitHubUsernameThatHasNoBiographyData() {
        profileSearchPage.enterUsername(TEST_USERNAME_WITHOUT_BIO);
    }

    @And("I click the search button to retrieve the profile")
    public void iClickTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile is successfully retrieved from GitHub API")
    public void theProfileIsSuccessfullyRetrievedFromGitHubAPI() {
        assertTrue(profileSearchPage.isProfileLoaded(), "Profile should be loaded successfully");
    }

    @And("the user details section is visible")
    public void theUserDetailsSectionIsVisible() {
        assertTrue(profileSearchPage.isUserDetailsSectionVisible(), "User details section should be visible");
    }

    @And("the biography field is displayed in the profile details")
    public void theBiographyFieldIsDisplayedInTheProfileDetails() {
        assertTrue(profileSearchPage.isBiographyFieldDisplayed(), "Biography field should be displayed");
    }

    @And("the biography field shows empty or not available message")
    public void theBiographyFieldShowsEmptyOrNotAvailableMessage() {
        String biographyText = profileSearchPage.getBiographyText();
        assertTrue(
            biographyText == null || 
            biographyText.trim().isEmpty() || 
            biographyText.toLowerCase().contains("not available") ||
            biographyText.toLowerCase().contains("no bio"),
            "Biography should be empty or show 'not available' message"
        );
    }
}