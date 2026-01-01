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
import static org.junit.jupiter.api.Assertions.*;

public class DesktopLayoutSteps {

    private Page page;
    private Browser browser;
    private BrowserContext context;
    private Playwright playwright;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String BASE_URL = "https://github.com";

    @Given("the user opens the GitHub profile search application on a desktop browser with resolution {int}x{int}")
    public void theUserOpensTheApplicationOnDesktopWithResolution(int width, int height) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext(new Browser.NewContextOptions()
                .setViewportSize(width, height));
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigate(BASE_URL);
        assertTrue(profileSearchPage.isPageLoaded(), "Application should load properly on desktop screen");
    }

    @When("the user enters a valid GitHub username in the search field")
    public void theUserEntersValidGitHubUsername() {
        String validUsername = "torvalds";
        profileSearchPage.enterSearchQuery(validUsername);
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input field should be properly sized and positioned for desktop view");
    }

    @And("the user clicks the search button to load the profile")
    public void theUserClicksSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile information is retrieved and displayed successfully")
    public void theProfileInformationIsDisplayed() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue(profileSearchPage.isProfileDisplayed(), "Profile information should be retrieved and displayed");
    }

    @And("the layout displays user details on the left and followers list on the right side by side")
    public void theLayoutDisplaysTwoColumnDesign() {
        assertTrue(profileSearchPage.isUserDetailsSectionVisible(), "User details section should be visible on the left");
        assertTrue(profileSearchPage.isFollowersListSectionVisible(), "Followers list section should be visible on the right");
        assertTrue(profileSearchPage.isTwoColumnLayoutDisplayed(), "Desktop layout should show a two-column design with user details on the left and followers on the right");
    }

    @And("all UI elements including avatar, metrics, personal info and followers list are properly sized and spaced")
    public void allUIElementsAreProperlySpaced() {
        assertTrue(profileSearchPage.isAvatarVisible(), "Avatar should be visible and properly sized");
        assertTrue(profileSearchPage.areMetricsVisible(), "Metrics (Repos, Followers, Following, Gists) should be visible");
        assertTrue(profileSearchPage.isPersonalInfoVisible(), "Personal info should be visible");
        assertTrue(profileSearchPage.isFollowersListVisible(), "Followers list should be visible");
        assertTrue(profileSearchPage.areElementsProperlySpaced(), "All UI elements should be appropriately sized with adequate spacing");
    }

    @When("the user resizes the browser window to different desktop resolutions")
    public void theUserResizesBrowserToNewResolution() {
        int[][] resolutions = {{1440, 900}, {1366, 768}, {1280, 720}};
        for (int[] resolution : resolutions) {
            page.setViewportSize(resolution[0], resolution[1]);
            profileSearchPage.waitForLayoutAdjustment();
        }
    }

    @Then("the layout adapts responsively maintaining proper proportions and readability")
    public void theLayoutAdaptsResponsively() {
        assertTrue(profileSearchPage.isLayoutResponsive(), "Layout should adapt responsively maintaining proper proportions and readability across different desktop screen sizes");
        assertTrue(profileSearchPage.isContentReadable(), "Content should remain readable after resizing");
        
        // Cleanup
        if (context != null) context.close();
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
    }
}