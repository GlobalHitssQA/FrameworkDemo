package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class CompanyFieldValidationSteps {
    
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    
    public CompanyFieldValidationSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }
    
    @Given("the GitHub profile search application is loaded")
    public void theGitHubProfileSearchApplicationIsLoaded() {
        profileSearchPage.navigateToApplication();
        assertTrue("Application should be loaded", profileSearchPage.isApplicationLoaded());
    }
    
    @When("I search for a GitHub user without company information")
    public void iSearchForGitHubUserWithoutCompanyInformation() {
        // Using a known GitHub user without company info
        String usernameWithoutCompany = "octocat";
        profileSearchPage.searchForUser(usernameWithoutCompany);
    }
    
    @Then("the user profile should load successfully")
    public void theUserProfileShouldLoadSuccessfully() {
        assertTrue("Profile should be loaded", profileSearchPage.isProfileLoaded());
    }
    
    @And("the user information section should be displayed")
    public void theUserInformationSectionShouldBeDisplayed() {
        assertTrue("User information section should be visible", 
            profileSearchPage.isUserInformationSectionVisible());
    }
    
    @And("the company field should appear empty or display {string}")
    public void theCompanyFieldShouldAppearEmptyOrDisplay(String expectedText) {
        assertTrue("Company field should be empty or show 'No disponible'", 
            profileSearchPage.isCompanyFieldEmptyOrShowsNoDisponible());
    }
    
    @And("other profile fields with data should be displayed correctly")
    public void otherProfileFieldsWithDataShouldBeDisplayedCorrectly() {
        assertTrue("Avatar should be displayed", profileSearchPage.isAvatarDisplayed());
        assertTrue("Username should be displayed", profileSearchPage.isUsernameDisplayed());
        assertTrue("Full name should be displayed if available", 
            profileSearchPage.isFullNameDisplayedOrEmpty());
        // Verify that location field works independently of company
        assertTrue("Location field should function correctly", 
            profileSearchPage.isLocationFieldFunctioning());
    }
}