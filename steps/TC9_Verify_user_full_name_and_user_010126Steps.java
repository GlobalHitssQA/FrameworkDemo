package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

public class ProfileDisplaySteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String expectedUsername = "torvalds";
    private String expectedFullName = "Linus Torvalds";

    public ProfileDisplaySteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub Profile Search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToComponent();
        assertTrue("Search functionality should be available", profileSearchPage.isSearchInputVisible());
    }

    @When("the user enters a valid GitHub username with full name and username data")
    public void theUserEntersAValidGitHubUsername() {
        profileSearchPage.enterUsername(expectedUsername);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the profile section should be displayed on the left side")
    public void theProfileSectionShouldBeDisplayed() {
        assertTrue("Profile section should be visible", profileSearchPage.isProfileSectionVisible());
    }

    @And("the full name should be displayed correctly")
    public void theFullNameShouldBeDisplayedCorrectly() {
        String displayedFullName = profileSearchPage.getFullName();
        assertEquals("Full name should match", expectedFullName, displayedFullName);
    }

    @And("the username should be displayed with the at symbol prefix")
    public void theUsernameShouldBeDisplayedWithAtSymbolPrefix() {
        String displayedUsername = profileSearchPage.getUsername();
        assertTrue("Username should start with @ symbol", displayedUsername.startsWith("@"));
        assertEquals("Username should match with @ prefix", "@" + expectedUsername, displayedUsername);
    }
}