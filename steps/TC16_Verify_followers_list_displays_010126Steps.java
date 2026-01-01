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

public class FollowersListSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfilePage profilePage;

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigateToHomePage();
        assertTrue("Search component should be visible", profilePage.isSearchComponentVisible());
    }

    @When("the user enters a valid GitHub username that has followers")
    public void theUserEntersAValidGitHubUsernameThatHasFollowers() {
        profilePage.enterUsername("torvalds");
        assertTrue("Username should be entered in search field", profilePage.isUsernameEntered());
    }

    @And("the user clicks the search button to retrieve the profile")
    public void theUserClicksTheSearchButtonToRetrieveTheProfile() {
        profilePage.clickSearchButton();
        profilePage.waitForProfileToLoad();
    }

    @Then("the followers list is displayed in the right section")
    public void theFollowersListIsDisplayedInTheRightSection() {
        profilePage.navigateToFollowersTab();
        assertTrue("Followers list should be visible", profilePage.isFollowersListVisible());
    }

    @And("each follower entry displays their username")
    public void eachFollowerEntryDisplaysTheirUsername() {
        assertTrue("Each follower should display username", profilePage.allFollowersHaveUsername());
    }

    @And("all usernames are properly formatted and readable")
    public void allUsernamesAreProperlyFormattedAndReadable() {
        assertTrue("All usernames should be properly formatted", profilePage.allUsernamesAreFormatted());
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}