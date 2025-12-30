package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowersListScrollSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String initialScrollPosition;
    private String selectedFollowerUrl;

    @Given("the GitHub Profile Search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigate();
        assertTrue("Search component should be visible", profileSearchPage.isSearchComponentVisible());
    }

    @When("I enter a username with more than fifty followers in the search field")
    public void iEnterAUsernameWithMoreThanFiftyFollowersInTheSearchField() {
        String popularUsername = "torvalds";
        profileSearchPage.enterUsername(popularUsername);
        assertTrue("Username should be entered in input field", 
            profileSearchPage.getSearchInputValue().equals(popularUsername));
    }

    @And("I click the search button to load the profile")
    public void iClickTheSearchButtonToLoadTheProfile() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the followers list should be displayed in a vertical layout in the right section")
    public void theFollowersListShouldBeDisplayedInAVerticalLayoutInTheRightSection() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should be in right section", profileSearchPage.isFollowersListInRightSection());
    }

    @And("each follower entry should display avatar username and profile link")
    public void eachFollowerEntryShouldDisplayAvatarUsernameAndProfileLink() {
        assertTrue("Follower avatars should be displayed", profileSearchPage.areFollowerAvatarsDisplayed());
        assertTrue("Follower usernames should be displayed", profileSearchPage.areFollowerUsernamesDisplayed());
        assertTrue("Follower profile links should be displayed", profileSearchPage.areFollowerProfileLinksDisplayed());
    }

    @And("the followers list container should have scroll functionality when content exceeds visible area")
    public void theFollowersListContainerShouldHaveScrollFunctionalityWhenContentExceedsVisibleArea() {
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
    }

    @When("I scroll down through the followers list")
    public void iScrollDownThroughTheFollowersList() {
        initialScrollPosition = profileSearchPage.getFollowersListScrollPosition();
        profileSearchPage.scrollFollowersListDown();
    }

    @Then("additional follower entries should be revealed without affecting the main profile section")
    public void additionalFollowerEntriesShouldBeRevealedWithoutAffectingTheMainProfileSection() {
        String newScrollPosition = profileSearchPage.getFollowersListScrollPosition();
        assertNotEquals("Scroll position should have changed", initialScrollPosition, newScrollPosition);
        assertTrue("Main profile section should remain visible", profileSearchPage.isMainProfileSectionVisible());
    }

    @When("I scroll back up to the top of the followers list")
    public void iScrollBackUpToTheTopOfTheFollowersList() {
        profileSearchPage.scrollFollowersListToTop();
    }

    @Then("the list should return to the initial position smoothly")
    public void theListShouldReturnToTheInitialPositionSmoothly() {
        String scrollPosition = profileSearchPage.getFollowersListScrollPosition();
        assertEquals("Scroll position should be at top", "0", scrollPosition);
    }

    @When("I click on a follower profile link")
    public void iClickOnAFollowerProfileLink() {
        selectedFollowerUrl = profileSearchPage.getFirstFollowerProfileUrl();
        profileSearchPage.clickFirstFollowerProfileLink();
    }

    @Then("I should be redirected to the corresponding GitHub profile page")
    public void iShouldBeRedirectedToTheCorrespondingGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("Should navigate to follower's GitHub profile", 
            currentUrl.contains("github.com") && currentUrl.contains(selectedFollowerUrl));
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}