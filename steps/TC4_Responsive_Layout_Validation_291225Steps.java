package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.ResponsiveLayoutPage;
import static org.junit.jupiter.api.Assertions.*;

public class ResponsiveLayoutSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private ResponsiveLayoutPage responsiveLayoutPage;

    private void initBrowser(int width, int height) {
        if (playwright == null) {
            playwright = Playwright.create();
            browser = playwright.chromium().launch();
        }
        if (context != null) {
            context.close();
        }
        context = browser.newContext(new Browser.NewContextOptions().setViewportSize(width, height));
        page = context.newPage();
        responsiveLayoutPage = new ResponsiveLayoutPage(page);
    }

    @Given("the user accesses the GitHub profile search component on a Desktop browser with resolution {int}x{int}")
    public void theUserAccessesTheGitHubProfileSearchComponentOnDesktop(int width, int height) {
        initBrowser(width, height);
        responsiveLayoutPage.navigateToApplication();
    }

    @Then("the interface displays in desktop layout with proper alignment of search bar and metrics dashboard")
    public void theInterfaceDisplaysInDesktopLayoutWithProperAlignment() {
        assertTrue(responsiveLayoutPage.isSearchBarVisible(), "Search bar should be visible");
        assertTrue(responsiveLayoutPage.isMetricsDashboardVisible(), "Metrics dashboard should be visible");
        assertTrue(responsiveLayoutPage.isUserDetailsSectionVisible(), "User details section should be visible");
        assertTrue(responsiveLayoutPage.isFollowersListSectionVisible(), "Followers list section should be visible");
        assertTrue(responsiveLayoutPage.isDesktopLayoutDisplayed(), "Desktop layout should be displayed");
    }

    @And("all components are visible and properly arranged without horizontal scrolling")
    public void allComponentsAreVisibleAndProperlyArrangedWithoutHorizontalScrolling() {
        assertFalse(responsiveLayoutPage.hasHorizontalScrollbar(), "Page should not have horizontal scrollbar");
        assertTrue(responsiveLayoutPage.areAllComponentsVisible(), "All components should be visible");
        assertTrue(responsiveLayoutPage.isProperSpacingMaintained(), "Proper spacing should be maintained");
    }

    @When("the user resizes the browser window to tablet dimensions {int}x{int}")
    public void theUserResizesTheBrowserWindowToTabletDimensions(int width, int height) {
        responsiveLayoutPage.setViewportSize(width, height);
    }

    @Then("the layout adapts responsively rearranging components to fit the reduced screen width")
    public void theLayoutAdaptsResponsivelyRearrangingComponents() {
        assertTrue(responsiveLayoutPage.isTabletLayoutDisplayed(), "Tablet layout should be displayed");
        assertTrue(responsiveLayoutPage.areComponentsRearrangedForTablet(), "Components should be rearranged for tablet");
        assertTrue(responsiveLayoutPage.isUsabilityMaintained(), "Usability should be maintained");
    }

    @When("the user accesses the component on a Mobile device in Portrait mode {int}x{int}")
    public void theUserAccessesTheComponentOnMobileDeviceInPortraitMode(int width, int height) {
        initBrowser(width, height);
        responsiveLayoutPage.navigateToApplication();
    }

    @Then("the interface adapts to mobile portrait layout with vertical stacking of components")
    public void theInterfaceAdaptsToMobilePortraitLayoutWithVerticalStacking() {
        assertTrue(responsiveLayoutPage.isMobilePortraitLayoutDisplayed(), "Mobile portrait layout should be displayed");
        assertTrue(responsiveLayoutPage.areComponentsVerticallyStacked(), "Components should be vertically stacked");
        assertTrue(responsiveLayoutPage.isAllFunctionalityMaintained(), "All functionality should be maintained");
    }

    @When("the user rotates the mobile device to Landscape orientation {int}x{int}")
    public void theUserRotatesTheMobileDeviceToLandscapeOrientation(int width, int height) {
        responsiveLayoutPage.setViewportSize(width, height);
    }

    @Then("the layout adjusts to landscape mode optimizing component arrangement for horizontal viewing")
    public void theLayoutAdjustsToLandscapeModeOptimizingComponentArrangement() {
        assertTrue(responsiveLayoutPage.isMobileLandscapeLayoutDisplayed(), "Mobile landscape layout should be displayed");
        assertTrue(responsiveLayoutPage.isOptimizedForHorizontalViewing(), "Layout should be optimized for horizontal viewing");
    }

    @And("the followers list allows vertical scrolling when content exceeds container size")
    public void theFollowersListAllowsVerticalScrollingWhenContentExceedsContainerSize() {
        assertTrue(responsiveLayoutPage.isFollowersListScrollable(), "Followers list should be scrollable");
        assertTrue(responsiveLayoutPage.doesScrollingNotAffectOtherComponents(), "Scrolling should not affect other components");
    }

    @And("all interactive elements remain accessible and functional across all viewport sizes")
    public void allInteractiveElementsRemainAccessibleAndFunctionalAcrossAllViewportSizes() {
        assertTrue(responsiveLayoutPage.isSearchButtonClickable(), "Search button should be clickable");
        assertTrue(responsiveLayoutPage.isSearchInputInteractable(), "Search input should be interactable");
        assertTrue(responsiveLayoutPage.isFollowButtonClickable(), "Follow button should be clickable");
        assertTrue(responsiveLayoutPage.areProfileLinksClickable(), "Profile links should be clickable");
    }
}