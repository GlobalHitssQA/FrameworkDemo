package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileReadOnlySteps {
    
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    
    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        page.navigate("https://github.com");
        profileSearchPage = new GitHubProfileSearchPage(page);
        assertTrue(profileSearchPage.isSearchComponentDisplayed(), "Search component should be displayed");
    }
    
    @When("the user enters a valid GitHub username in the search input field")
    public void enterValidGitHubUsername() {
        profileSearchPage.enterUsername("torvalds");
        assertTrue(profileSearchPage.isUsernameEntered("torvalds"), "Username should be entered correctly");
    }
    
    @And("the user clicks the search button to retrieve the profile")
    public void clickSearchButton() {
        profileSearchPage.clickSearchButton();
    }
    
    @Then("the profile should be successfully retrieved and displayed with all details")
    public void verifyProfileDisplayed() {
        assertTrue(profileSearchPage.isProfileDisplayed(), "Profile should be successfully displayed");
        assertTrue(profileSearchPage.isAvatarVisible(), "Avatar should be visible");
        assertTrue(profileSearchPage.isUsernameVisible(), "Username should be visible");
        assertTrue(profileSearchPage.isFollowersCountVisible(), "Followers count should be visible");
        assertTrue(profileSearchPage.isFollowingCountVisible(), "Following count should be visible");
        assertTrue(profileSearchPage.isRepositoriesCountVisible(), "Repositories count should be visible");
    }
    
    @And("no edit buttons or editable fields should be present on the profile information")
    public void verifyNoEditButtonsPresent() {
        assertFalse(profileSearchPage.isEditButtonPresent(), "No edit buttons should be present on profile");
        assertFalse(profileSearchPage.areEditableFieldsPresent(), "No editable fields should be present on profile");
    }
    
    @And("all profile fields should be displayed in read-only mode")
    public void verifyAllFieldsReadOnly() {
        assertTrue(profileSearchPage.areAllFieldsReadOnly(), "All profile fields should be in read-only mode");
        assertFalse(profileSearchPage.isUsernameFieldEditable(), "Username field should not be editable");
        assertFalse(profileSearchPage.isBioFieldEditable(), "Bio field should not be editable");
        assertFalse(profileSearchPage.isLocationFieldEditable(), "Location field should not be editable");
        assertFalse(profileSearchPage.isCompanyFieldEditable(), "Company field should not be editable");
    }
    
    @And("only navigation actions should be available such as clicking on follower links or the Follow button")
    public void verifyOnlyNavigationActionsAvailable() {
        assertTrue(profileSearchPage.isFollowButtonVisible(), "Follow button should be available for navigation");
        assertTrue(profileSearchPage.isFollowersLinkClickable(), "Followers link should be clickable for navigation");
        assertTrue(profileSearchPage.isFollowingLinkClickable(), "Following link should be clickable for navigation");
        assertFalse(profileSearchPage.areEditingCapabilitiesEnabled(), "No editing capabilities should be enabled");
        
        // Cleanup
        page.close();
        browser.close();
        playwright.close();
    }
}