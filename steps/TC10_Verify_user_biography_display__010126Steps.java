package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class BiographyDisplaySteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public BiographyDisplaySteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub Profile Search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search component should be ready for input");
    }

    @When("the user enters a valid GitHub username with biography {string}")
    public void theUserEntersAValidGitHubUsernameWithBiography(String username) {
        profileSearchPage.enterUsername(username);
        assertTrue(profileSearchPage.getSearchInputValue().equals(username), "Username should be correctly entered");
    }

    @When("the user enters a valid GitHub username without biography {string}")
    public void theUserEntersAValidGitHubUsernameWithoutBiography(String username) {
        profileSearchPage.enterUsername(username);
        assertTrue(profileSearchPage.getSearchInputValue().equals(username), "Username should be correctly entered");
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the profile section should be visible")
    public void theProfileSectionShouldBeVisible() {
        assertTrue(profileSearchPage.isProfileSectionVisible(), "Profile section should be visible with user personal details");
    }

    @And("the biography field should be present")
    public void theBiographyFieldShouldBePresent() {
        assertTrue(profileSearchPage.isBiographyFieldPresent(), "Biography area should be present in the profile section");
    }

    @And("the biography should display {string}")
    public void theBiographyShouldDisplay(String expectedBiography) {
        String actualBiography = profileSearchPage.getBiographyText();
        assertEquals(expectedBiography, actualBiography, "Biography should match the description from the user's GitHub profile");
    }

    @And("the biography field should show {string}")
    public void theBiographyFieldShouldShow(String expectedMessage) {
        String biographyText = profileSearchPage.getBiographyText();
        assertTrue(biographyText.isEmpty() || biographyText.equals(expectedMessage),
                "When biography is not available, the field should appear empty or display 'Not available'");
    }
}