package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Search functionality
 * Locators source: REAL (extracted with Playwright MCP)
 */
public class GitHubSearchPage {

    private Page page;
    
    // Locators - REAL (extracted from GitHub using Playwright)
    private Locator searchInput;
    private Locator usersFilterLink;
    private Locator noResultsHeading;
    private Locator noResultsMessage;
    private Locator resultsCountLabel;
    private Locator userProfileList;
    private Locator searchResultsContainer;

    private static final String GITHUB_SEARCH_URL = "https://github.com/search";

    public GitHubSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Real locator: textbox with name "Search GitHub"
        this.searchInput = page.getByRole(com.microsoft.playwright.options.AriaRole.TEXTBOX, 
            new Page.GetByRoleOptions().setName("Search GitHub"));
        
        // Real locator: nav item for users filter with test id
        this.usersFilterLink = page.getByTestId("nav-item-users");
        
        // Real locator: heading level 3 with no results message
        this.noResultsHeading = page.getByRole(com.microsoft.playwright.options.AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("Your search did not match any users"));
        
        // Real locator: paragraph with tips message
        this.noResultsMessage = page.locator("text=You could try one of the tips below");
        
        // Real locator: results count heading
        this.resultsCountLabel = page.getByRole(com.microsoft.playwright.options.AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("0 results").setLevel(2));
        
        // Real locator: user profile list container (absent when no results)
        this.userProfileList = page.locator("[data-testid='results-list']");
        
        // Real locator: search results container
        this.searchResultsContainer = page.locator("main");
    }

    public void navigateToSearchPage() {
        page.navigate(GITHUB_SEARCH_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void submitSearch() {
        searchInput.press("Enter");
        page.waitForLoadState();
    }

    public void clickUsersFilter() {
        usersFilterLink.click();
        page.waitForLoadState();
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsHeading.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsHeading.textContent();
    }

    public String getResultsCount() {
        return resultsCountLabel.textContent();
    }

    public boolean isUserProfileListVisible() {
        return userProfileList.isVisible();
    }

    public boolean isSearchResultsContainerEmpty() {
        return noResultsHeading.isVisible() && noResultsMessage.isVisible();
    }
}