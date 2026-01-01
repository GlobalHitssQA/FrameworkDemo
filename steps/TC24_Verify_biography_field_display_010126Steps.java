package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class BiographyFieldSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfilePage profilePage;
    
    // Username conocido sin biografía (extraído de inspección real)
    private static final String USERNAME_WITHOUT_BIO = "octocat";
    private static final String BASE_URL = "https://github.com";

    @Given("the user accesses the GitHub profile search application")
    public void theUserAccessesTheGitHubProfileSearchApplication() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigateToBaseUrl(BASE_URL);
        assertTrue("Application should load successfully", profilePage.isPageLoaded());
    }

    @When("the user searches for a GitHub username that has no biography")
    public void theUserSearchesForAGitHubUsernameThatHasNoBiography() {
        profilePage.navigateToUserProfile(USERNAME_WITHOUT_BIO);
    }

    @Then("the profile loads successfully")
    public void theProfileLoadsSuccessfully() {
        assertTrue("Profile page should be loaded", profilePage.isProfileLoaded());
    }

    @And("the user information section is displayed")
    public void theUserInformationSectionIsDisplayed() {
        assertTrue("User information section should be visible", profilePage.isUserInfoSectionVisible());
    }

    @And("the biography field appears empty or displays 'No disponible' text")
    public void theBiographyFieldAppearsEmptyOrDisplaysNoDisponibleText() {
        String bioText = profilePage.getBiographyText();
        boolean isBioEmptyOrNoDisponible = bioText.isEmpty() || 
                                            bioText.equals("No disponible") || 
                                            bioText.trim().isEmpty();
        assertTrue("Biography should be empty or show 'No disponible'", isBioEmptyOrNoDisponible);
    }

    @And("other profile fields with data are displayed correctly")
    public void otherProfileFieldsWithDataAreDisplayedCorrectly() {
        // Verificar que el nombre completo se muestra
        String fullName = profilePage.getFullName();
        assertFalse("Full name should not be empty", fullName.isEmpty());
        
        // Verificar que el username se muestra
        String username = profilePage.getUsername();
        assertFalse("Username should not be empty", username.isEmpty());
        assertEquals("Username should match", USERNAME_WITHOUT_BIO, username);
        
        // Verificar que el avatar está visible
        assertTrue("Avatar should be visible", profilePage.isAvatarVisible());
        
        // Verificar que followers está visible
        assertTrue("Followers link should be visible", profilePage.isFollowersVisible());
        
        // Verificar que following está visible
        assertTrue("Following link should be visible", profilePage.isFollowingVisible());
        
        // Verificar campos adicionales si existen (location, organization, website)
        // Estos campos son opcionales, solo verificamos que no afectan la visualización
        profilePage.isLocationVisible();
        profilePage.isOrganizationVisible();
        profilePage.isWebsiteVisible();
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}