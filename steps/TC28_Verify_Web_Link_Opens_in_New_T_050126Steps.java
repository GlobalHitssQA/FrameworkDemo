package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProfilePage;
import static org.junit.Assert.*;

public class WebLinkNewTabSteps {
    private Page page;
    private ProfilePage profilePage;
    private String originalUrl;
    private int originalTabCount;

    public WebLinkNewTabSteps(Page page) {
        this.page = page;
        this.profilePage = new ProfilePage(page);
    }

    @Given("the GitHub profile search application is loaded")
    public void theGitHubProfileSearchApplicationIsLoaded() {
        profilePage.navigateToApplication();
        assertTrue(profilePage.isSearchInputVisible());
    }

    @When("I search for a GitHub username {string} that has a web link in their profile")
    public void iSearchForAGitHubUsernameThatHasAWebLinkInTheirProfile(String username) {
        profilePage.searchUser(username);
        page.waitForTimeout(2000);
    }

    @Then("the user profile should be displayed with web link visible")
    public void theUserProfileShouldBeDisplayedWithWebLinkVisible() {
        assertTrue(profilePage.isWebLinkVisible());
    }

    @When("I inspect the web link element")
    public void iInspectTheWebLinkElement() {
        // Inspection is performed in the next assertion step
    }

    @Then("the link should have target attribute set to {string}")
    public void theLinkShouldHaveTargetAttributeSetTo(String targetValue) {
        String actualTarget = profilePage.getWebLinkTargetAttribute();
        assertEquals(targetValue, actualTarget);
    }

    @When("I click on the web link")
    public void iClickOnTheWebLink() {
        originalUrl = page.url();
        originalTabCount = page.context().pages().size();
        profilePage.clickWebLink();
        page.waitForTimeout(2000);
    }

    @Then("a new browser tab should open with the personal website")
    public void aNewBrowserTabShouldOpenWithThePersonalWebsite() {
        int newTabCount = page.context().pages().size();
        assertEquals(originalTabCount + 1, newTabCount);
    }

    @And("the original application tab should remain active and unchanged")
    public void theOriginalApplicationTabShouldRemainActiveAndUnchanged() {
        assertEquals(originalUrl, page.url());
        assertTrue(profilePage.isSearchInputVisible());
    }

    @And("the new tab should display the correct URL from the user profile")
    public void theNewTabShouldDisplayTheCorrectURLFromTheUserProfile() {
        String expectedUrl = profilePage.getWebLinkHref();
        Page newTab = page.context().pages().get(page.context().pages().size() - 1);
        String actualUrl = newTab.url();
        assertTrue(actualUrl.contains(expectedUrl) || expectedUrl.contains(actualUrl));
    }
}