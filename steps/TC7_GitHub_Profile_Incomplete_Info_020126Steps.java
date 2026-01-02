package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private static final String INCOMPLETE_PROFILE_USERNAME = "ghost";

    public GitHubProfileSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the GitHub profile search application is loaded")
    public void theGitHubProfileSearchApplicationIsLoaded() {
        profilePage.navigateToApplication();
        assertTrue("Application should be loaded", profilePage.isSearchInputVisible());
    }

    @When("I enter a GitHub username with incomplete profile information")
    public void iEnterAGitHubUsernameWithIncompleteProfileInformation() {
        profilePage.enterUsername(INCOMPLETE_PROFILE_USERNAME);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profilePage.clickSearchButton();
        profilePage.waitForProfileLoad();
    }

    @Then("the user profile section is displayed")
    public void theUserProfileSectionIsDisplayed() {
        assertTrue("User profile section should be visible", profilePage.isProfileSectionVisible());
    }

    @And("fields with missing data display 'Not available' text")
    public void fieldsWithMissingDataDisplayNotAvailableText() {
        assertTrue("At least one field should display 'Not available'", 
            profilePage.hasNotAvailableFields());
    }

    @And("location field shows 'Not available' when data is missing")
    public void locationFieldShowsNotAvailableWhenDataIsMissing() {
        if (profilePage.isLocationFieldEmpty()) {
            String locationText = profilePage.getLocationText();
            assertTrue("Location should show 'Not available' or 'No disponible'", 
                locationText.contains("Not available") || locationText.contains("No disponible"));
        }
    }

    @And("biography field shows 'Not available' when data is missing")
    public void biographyFieldShowsNotAvailableWhenDataIsMissing() {
        if (profilePage.isBiographyFieldEmpty()) {
            String bioText = profilePage.getBiographyText();
            assertTrue("Biography should show 'Not available' or 'No disponible'", 
                bioText.contains("Not available") || bioText.contains("No disponible"));
        }
    }

    @And("company field shows 'Not available' when data is missing")
    public void companyFieldShowsNotAvailableWhenDataIsMissing() {
        if (profilePage.isCompanyFieldEmpty()) {
            String companyText = profilePage.getCompanyText();
            assertTrue("Company should show 'Not available' or 'No disponible'", 
                companyText.contains("Not available") || companyText.contains("No disponible"));
        }
    }

    @And("web link field shows 'Not available' when data is missing")
    public void webLinkFieldShowsNotAvailableWhenDataIsMissing() {
        if (profilePage.isWebLinkFieldEmpty()) {
            String webLinkText = profilePage.getWebLinkText();
            assertTrue("Web link should show 'Not available' or 'No disponible'", 
                webLinkText.contains("Not available") || webLinkText.contains("No disponible"));
        }
    }
}