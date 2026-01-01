package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME = "torvalds";
    private static final String EXPECTED_LOCATION = "Portland, OR";
    private static final String EXPECTED_COMPANY = "Linux Foundation";

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
    }

    @And("the search component is loaded and ready to use")
    public void theSearchComponentIsLoadedAndReadyToUse() {
        assertTrue(profileSearchPage.isSearchComponentVisible(), 
            "Search component should be visible and ready");
    }

    @When("the user enters a valid GitHub username with location and company information")
    public void theUserEntersAValidGitHubUsernameWithLocationAndCompanyInformation() {
        profileSearchPage.enterUsername(TEST_USERNAME);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves the user profile information")
    public void theSystemRetrievesTheUserProfileInformation() {
        assertTrue(profileSearchPage.isProfileDisplayed(), 
            "Profile information should be displayed after search");
    }

    @And("the left section displays the user personal details")
    public void theLeftSectionDisplaysTheUserPersonalDetails() {
        assertTrue(profileSearchPage.isLeftSectionVisible(), 
            "Left section with personal details should be visible");
    }

    @And("the location field displays the user location data correctly")
    public void theLocationFieldDisplaysTheUserLocationDataCorrectly() {
        String actualLocation = profileSearchPage.getLocationText();
        assertNotNull(actualLocation, "Location should not be null");
        assertFalse(actualLocation.isEmpty(), "Location should not be empty");
        assertEquals(EXPECTED_LOCATION, actualLocation, 
            "Location should match the expected value from GitHub API");
    }

    @And("the company field displays the user current workplace data correctly")
    public void theCompanyFieldDisplaysTheUserCurrentWorkplaceDataCorrectly() {
        String actualCompany = profileSearchPage.getCompanyText();
        assertNotNull(actualCompany, "Company should not be null");
        assertFalse(actualCompany.isEmpty(), "Company should not be empty");
        assertEquals(EXPECTED_COMPANY, actualCompany, 
            "Company should match the expected value from GitHub API");
    }
}