package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Search Page
 * Locators: REAL (extracted with Playwright MCP)
 */
public class GitHubSearchPage {

    private Page page;
    
    // Locators - REAL (extracted from GitHub search page)
    private Locator searchInput;
    
    private static final String BASE_URL = "https://github.com/search";

    public GitHubSearchPage(Page page) {
        this.page = page;
        // Real locator extracted: textbox "Search GitHub"
        this.searchInput = page.getByRole(com.microsoft.playwright.options.AriaRole.TEXTBOX, 
            new Page.GetByRoleOptions().setName("Search GitHub"));
    }

    public void navigate() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void submitSearch() {
        // Submit by pressing Enter since the search box triggers on Enter
        searchInput.press("Enter");
    }
}

---

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Search Results Page
 * Locators: REAL (extracted with Playwright MCP)
 */
public class GitHubSearchResultsPage {

    private Page page;
    
    // Locators - REAL (extracted from GitHub search results page)
    private Locator noResultsHeading;
    private Locator noResultsTip;
    private Locator resultsCount;
    private Locator usersFilterLink;
    
    // Profile elements - should NOT be visible for non-existent user
    private Locator userAvatar;
    private Locator userBio;
    private Locator repositoryCount;
    private Locator followersCount;
    private Locator followingCount;

    public GitHubSearchResultsPage(Page page) {
        this.page = page;
        
        // Real locators extracted from search results page
        // Heading: "Your search did not match any users"
        this.noResultsHeading = page.getByRole(com.microsoft.playwright.options.AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("Your search did not match any users"));
        
        // Tip text below the heading
        this.noResultsTip = page.locator("text=You could try one of the tips below");
        
        // Results count showing "0 results"
        this.resultsCount = page.getByRole(com.microsoft.playwright.options.AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("0 results"));
        
        // Users filter link showing "Users (0) results"
        this.usersFilterLink = page.locator("a[href*='type=users']").filter(
            new Locator.FilterOptions().setHasText("Users"));
        
        // Profile elements that should NOT appear
        this.userAvatar = page.locator("img.avatar");
        this.userBio = page.locator("[data-bio-text], .user-profile-bio");
        this.repositoryCount = page.locator("[data-testid='repos-count'], .Counter:has-text('Repositories')");
        this.followersCount = page.locator("a[href*='tab=followers'] .Counter");
        this.followingCount = page.locator("a[href*='tab=following'] .Counter");
    }

    public void waitForResultsToLoad() {
        page.waitForLoadState();
        // Wait for either results or no-results message
        page.waitForSelector("h2, h3", new Page.WaitForSelectorOptions().setTimeout(10000));
    }

    public boolean isResultsPageLoaded() {
        return page.url().contains("/search");
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsHeading.isVisible() || resultsCount.isVisible();
    }

    public String getNoResultsMessageText() {
        if (noResultsHeading.isVisible()) {
            return noResultsHeading.textContent();
        }
        return "";
    }

    public String getResultsCountText() {
        if (resultsCount.isVisible()) {
            return resultsCount.textContent();
        }
        return "";
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.count() > 0 && userAvatar.first().isVisible();
    }

    public boolean isUserBioVisible() {
        return userBio.count() > 0 && userBio.first().isVisible();
    }

    public boolean isRepositoryCountVisible() {
        return repositoryCount.count() > 0 && repositoryCount.first().isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersCount.count() > 0 && followersCount.first().isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingCount.count() > 0 && followingCount.first().isVisible();
    }

    public boolean isUsersFilterShowingZero() {
        if (usersFilterLink.isVisible()) {
            String text = usersFilterLink.textContent();
            return text.contains("(0)") || text.contains("0");
        }
        return false;
    }
}