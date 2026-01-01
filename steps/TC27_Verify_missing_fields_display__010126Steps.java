package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class MissingFieldsValidationSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String USERNAME_WITH_MISSING_FIELDS = "test";

    public MissingFieldsValidationSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user accesses the GitHub profile search application")
    public void theUserAccessesTheGitHubProfileSearchApplication() {
        profileSearchPage.navigateToApplication();
        assertTrue("Application should load successfully", profileSearchPage.isApplicationLoaded());
    }

    @When("the user searches for a GitHub username with multiple missing fields")
    public void theUserSearchesForAGitHubUsernameWithMultipleMissingFields() {
        profileSearchPage.searchForUser(USERNAME_WITH_MISSING_FIELDS);
    }

    @Then("the profile loads successfully despite missing data")
    public void theProfileLoadsSuccessfullyDespiteMissingData() {
        assertTrue("Profile should be displayed", profileSearchPage.isProfileDisplayed());
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
    }

    @And("all unavailable fields display 'No disponible' or remain empty consistently")
    public void allUnavailableFieldsDisplayNoDisponibleOrRemainEmptyConsistently() {
        String locationText = profileSearchPage.getLocationText();
        String biographyText = profileSearchPage.getBiographyText();
        String companyText = profileSearchPage.getCompanyText();
        String websiteText = profileSearchPage.getWebsiteText();

        boolean locationMissing = locationText.isEmpty() || locationText.equals("No disponible");
        boolean biographyMissing = biographyText.isEmpty() || biographyText.equals("No disponible");
        boolean companyMissing = companyText.isEmpty() || companyText.equals("No disponible");
        boolean websiteMissing = websiteText.isEmpty() || websiteText.equals("No disponible");

        assertTrue("Missing fields should display consistently", 
            locationMissing && biographyMissing && companyMissing && websiteMissing);
    }

    @And("the 'No disponible' text appears with uniform font size and color across all fields")
    public void theNoDisponibleTextAppearsWithUniformFontSizeAndColorAcrossAllFields() {
        if (profileSearchPage.hasNoDisponibleLabels()) {
            assertTrue("No disponible labels should have consistent styling", 
                profileSearchPage.areNoDisponibleLabelsConsistentlyStyled());
        }
    }

    @And("available fields display their actual data correctly without 'No disponible'")
    public void availableFieldsDisplayTheirActualDataCorrectlyWithoutNoDisponible() {
        String username = profileSearchPage.getUsernameText();
        String followersCount = profileSearchPage.getFollowersCount();
        String followingCount = profileSearchPage.getFollowingCount();
        String reposCount = profileSearchPage.getReposCount();

        assertFalse("Username should not be 'No disponible'", username.equals("No disponible"));
        assertFalse("Username should not be empty", username.isEmpty());
        assertNotNull("Followers count should be present", followersCount);
        assertNotNull("Following count should be present", followingCount);
        assertNotNull("Repos count should be present", reposCount);
    }
}