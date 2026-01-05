package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileResponsiveSteps {
    
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfilePage profilePage;
    private static final String TEST_USER = "torvalds";
    
    @Given("the browser is opened with resolution 1920x1080")
    public void theBrowserIsOpenedWithResolution() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        page.setViewportSize(1920, 1080);
        profilePage = new GitHubProfilePage(page);
    }
    
    @When("the user navigates to a GitHub user profile with complete information")
    public void theUserNavigatesToGitHubUserProfile() {
        profilePage.navigateToProfile(TEST_USER);
    }
    
    @Then("the profile interface should load properly scaled for desktop view")
    public void theProfileInterfaceShouldLoadProperlyScaled() {
        assertTrue("Profile page should be loaded", profilePage.isProfileLoaded());
        assertTrue("Viewport should be desktop width", page.viewportSize().width >= 1024);
    }
    
    @And("the left section should display user avatar, name, bio, location, company, and web link")
    public void theLeftSectionShouldDisplayUserDetails() {
        assertTrue("Avatar should be visible", profilePage.isAvatarVisible());
        assertTrue("User name should be visible", profilePage.isUserNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertTrue("Location should be visible", profilePage.isLocationVisible());
        assertTrue("Organization should be visible", profilePage.isOrganizationVisible());
    }
    
    @And("the right section should display pinned repositories and contribution activity")
    public void theRightSectionShouldDisplayRepositoriesAndActivity() {
        assertTrue("Pinned repositories section should be visible", profilePage.isPinnedReposVisible());
        assertTrue("Contribution graph should be visible", profilePage.isContributionGraphVisible());
    }
    
    @And("the metrics dashboard should display Repos, Followers, Following, and Stars at the top navigation")
    public void theMetricsDashboardShouldDisplayMetrics() {
        assertTrue("Repositories link should be visible", profilePage.isRepositoriesLinkVisible());
        assertTrue("Followers link should be visible", profilePage.isFollowersLinkVisible());
        assertTrue("Stars link should be visible", profilePage.isStarsLinkVisible());
    }
    
    @When("the browser window is resized to different desktop widths between 1024px and 1920px")
    public void theBrowserWindowIsResizedToDifferentWidths() {
        int[] testWidths = {1024, 1280, 1440, 1680, 1920};
        
        for (int width : testWidths) {
            page.setViewportSize(width, 1080);
            page.waitForTimeout(500);
            
            assertTrue("Layout should remain functional at " + width + "px", 
                      profilePage.isProfileLoaded());
        }
    }
    
    @Then("the layout should adapt responsively maintaining proper proportions and readability")
    public void theLayoutShouldAdaptResponsively() {
        page.setViewportSize(1920, 1080);
        assertTrue("Profile should remain visible after resizing", profilePage.isProfileLoaded());
        assertTrue("Avatar should remain visible after resizing", profilePage.isAvatarVisible());
        assertTrue("Navigation should remain visible after resizing", profilePage.isRepositoriesLinkVisible());
    }
}