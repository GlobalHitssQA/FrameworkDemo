package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

/**
 * Page Object for GitHub Search functionality.
 * Locators extracted using Playwright MCP from real GitHub search page.
 */
public class GitHubSearchPage {

    private final Page page;
    
    // Locators - REAL (extracted with Playwright)
    private final Locator searchInput;
    private final Locator usersFilterLink;
    private final Locator noUsersFoundHeading;
    private final Locator resultsCountHeading;

    private static final String SEARCH_URL = "https://github.com/search";

    public GitHubSearchPage(Page page) {
        this.page = page;
        // Real locator: textbox with name "Search GitHub"
        this.searchInput = page.getByRole(AriaRole.TEXTBOX, 
            new Page.GetByRoleOptions().setName("Search GitHub"));
        // Real locator: data-testid="nav-item-users"
        this.usersFilterLink = page.getByTestId("nav-item-users");
        // Real locator: heading with text "Your search did not match any users"
        this.noUsersFoundHeading = page.getByRole(AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("Your search did not match any users"));
        // Real locator: heading showing results count (e.g., "0 results")
        this.resultsCountHeading = page.getByRole(AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("0 results"));
    }

    /**
     * Navigate to GitHub search page
     */
    public void navigateToSearchPage() {
        page.navigate(SEARCH_URL);
    }

    /**
     * Check if search input field is visible
     * @return true if search input is visible
     */
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    /**
     * Enter a search query in the search input field
     * @param query the search term to enter
     */
    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    /**
     * Get the current value of the search input field
     * @return the current input value
     */
    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    /**
     * Submit the search by pressing Enter
     */
    public void submitSearch() {
        searchInput.press("Enter");
    }

    /**
     * Click on the Users filter to filter search results by users
     */
    public void clickUsersFilter() {
        usersFilterLink.click();
    }

    /**
     * Check if the "no users found" message is visible
     * @return true if the empty state message is visible
     */
    public boolean isNoUsersFoundMessageVisible() {
        return noUsersFoundHeading.isVisible();
    }

    /**
     * Get the results count text from the heading
     * @return the results count text (e.g., "0 results")
     */
    public String getResultsCount() {
        return resultsCountHeading.textContent();
    }
}