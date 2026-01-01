package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfileSearchPage;
import org.junit.Assert;

public class PersonalWebsiteLinkSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME = "sindresorhus";
    private static final String EXPECTED_WEBSITE_URL = "https://sindresorhus.com/apps";

    public PersonalWebsiteLinkSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @And("the search component is loaded and displayed")
    public void theSearchComponentIsLoadedAndDisplayed() {
        Assert.assertTrue("Search component should be visible", 
            profileSearchPage.isSearchComponentDisplayed());
    }

    @When("the user enters a valid GitHub username that has a personal website link")
    public void theUserEntersAValidGitHubUsernameThatHasAPersonalWebsiteLink() {
        profileSearchPage.enterUsername(TEST_USERNAME);
    }

    @And("the user clicks the search button to retrieve the profile")
    public void theUserClicksTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system successfully loads the user profile")
    public void theSystemSuccessfullyLoadsTheUserProfile() {
        Assert.assertTrue("User profile should be loaded", 
            profileSearchPage.isProfileLoaded());
    }

    @And("the left section displays the user personal details")
    public void theLeftSectionDisplaysTheUserPersonalDetails() {
        Assert.assertTrue("Personal details section should be visible", 
            profileSearchPage.isPersonalDetailsSectionVisible());
    }

    @And("the personal website link is displayed as a clickable hyperlink with the correct URL")
    public void thePersonalWebsiteLinkIsDisplayedAsAClickableHyperlinkWithTheCorrectURL() {
        Assert.assertTrue("Website link should be visible", 
            profileSearchPage.isWebsiteLinkVisible());
        String websiteUrl = profileSearchPage.getWebsiteLinkUrl();
        Assert.assertEquals("Website URL should match expected", 
            EXPECTED_WEBSITE_URL, websiteUrl);
    }

    @When("the user clicks on the personal website link")
    public void theUserClicksOnThePersonalWebsiteLink() {
        profileSearchPage.clickWebsiteLink();
    }

    @Then("the system redirects to the personal website in a new tab")
    public void theSystemRedirectsToThePersonalWebsiteInANewTab() {
        Page newTab = profileSearchPage.waitForNewTab(context);
        Assert.assertNotNull("New tab should be opened", newTab);
        String newTabUrl = newTab.url();
        Assert.assertTrue("New tab should contain the personal website URL", 
            newTabUrl.contains("sindresorhus.com"));
    }
}