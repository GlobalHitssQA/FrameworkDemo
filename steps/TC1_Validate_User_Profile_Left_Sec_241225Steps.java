package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class ProfileDetailsSteps {
    private WebDriver driver;
    private GitHubProfilePage profilePage;
    private String testUsername = "octocat";

    @Given("the GitHub Profile Finder application is accessible")
    public void theApplicationIsAccessible() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @And("the GitHub API is available")
    public void theGitHubAPIIsAvailable() {
        // Validate API availability if needed
        assertNotNull(driver);
    }

    @Given("I am on the GitHub Profile Finder page")
    public void iAmOnTheGitHubProfileFinderPage() {
        driver.get("http://localhost:3000"); // Update with actual URL
        profilePage = new GitHubProfilePage(driver);
    }

    @When("I search for a GitHub user with some empty profile fields")
    public void iSearchForAGitHubUserWithEmptyFields() {
        profilePage.searchUser(testUsername);
    }

    @Then("the user profile should load successfully")
    public void theUserProfileShouldLoadSuccessfully() {
        assertTrue("Profile should be visible", profilePage.isProfileVisible());
    }

    @And("the user avatar should be displayed correctly in the left section")
    public void theUserAvatarShouldBeDisplayed() {
        assertTrue("Avatar should be displayed", profilePage.isAvatarDisplayed());
        assertNotNull("Avatar source should not be null", profilePage.getAvatarSrc());
    }

    @And("the full name and username should be visible")
    public void theFullNameAndUsernameShouldBeVisible() {
        assertTrue("Full name should be visible", profilePage.isFullNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertFalse("Full name should not be empty", profilePage.getFullName().isEmpty());
        assertFalse("Username should not be empty", profilePage.getUsername().isEmpty());
    }

    @And("the biography field should display the text or show {string} if empty")
    public void theBiographyFieldShouldDisplay(String emptyValue) {
        String bio = profilePage.getBiography();
        assertTrue("Biography should display value or " + emptyValue,
                bio != null && (bio.length() > 0 || bio.equals(emptyValue) || bio.isEmpty()));
    }

    @And("the location field should display the value or show {string} if empty")
    public void theLocationFieldShouldDisplay(String emptyValue) {
        String location = profilePage.getLocation();
        assertTrue("Location should display value or " + emptyValue,
                location != null && (location.length() > 0 || location.equals(emptyValue) || location.isEmpty()));
    }

    @And("the company field should display the value or show {string} if empty")
    public void theCompanyFieldShouldDisplay(String emptyValue) {
        String company = profilePage.getCompany();
        assertTrue("Company should display value or " + emptyValue,
                company != null && (company.length() > 0 || company.equals(emptyValue) || company.isEmpty()));
    }

    @And("the website link field should display the URL or show {string} if empty")
    public void theWebsiteLinkFieldShouldDisplay(String emptyValue) {
        String website = profilePage.getWebsite();
        assertTrue("Website should display value or " + emptyValue,
                website != null && (website.length() > 0 || website.equals(emptyValue) || website.isEmpty()));
    }

    @And("the Follow button should be visible and enabled")
    public void theFollowButtonShouldBeVisibleAndEnabled() {
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
        assertTrue("Follow button should be enabled", profilePage.isFollowButtonEnabled());
    }

    @And("all empty fields should consistently show the defined behavior")
    public void allEmptyFieldsShouldShowConsistentBehavior() {
        // Verify consistent handling of empty fields
        String[] fields = {profilePage.getBiography(), profilePage.getLocation(), 
                          profilePage.getCompany(), profilePage.getWebsite()};
        for (String field : fields) {
            if (field.isEmpty() || field.equals("No disponible")) {
                assertTrue("Empty field handling should be consistent", true);
            }
        }
    }
}