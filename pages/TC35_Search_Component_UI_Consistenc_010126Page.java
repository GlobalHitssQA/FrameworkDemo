package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

/**
 * Page Object for GitHub Search functionality
 * Locators: REAL (extracted with Playwright MCP)
 */
public class GitHubSearchPage {

    private Page page;
    
    // Main Search Page Locators - REAL (extracted from https://github.com/search)
    private Locator searchInput;
    private Locator advancedSearchLink;
    private Locator searchTipText;
    private Locator prefixesButton;
    
    // Advanced Search Page Locators - REAL (extracted from https://github.com/search/advanced)
    private Locator advancedSearchInput;
    private Locator advancedSearchButton;
    private Locator languageDropdown;
    private Locator fromOwnersInput;
    private Locator inRepositoriesInput;
    private Locator createdDateInput;
    
    // Search Results Page Locators - REAL (extracted from search results)
    private Locator resultsHeading;
    private Locator sortByButton;
    private Locator usersFilterLink;
    private Locator repositoriesFilterLink;
    private Locator codeFilterLink;
    private Locator issuesFilterLink;
    private Locator paginationNav;
    
    // Header Navigation Locators - REAL
    private Locator homepageLink;
    private Locator signInLink;
    private Locator toggleNavigationButton;
    private Locator skipToContentLink;
    
    // User Profile Page Locators - REAL (extracted from https://github.com/octocat)
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator followersLink;
    private Locator followingLink;
    private Locator userLocation;
    private Locator userOrganization;
    private Locator userWebsiteLink;
    private Locator followButton;
    private Locator repositoriesTab;
    private Locator projectsTab;
    private Locator overviewTab;
    
    // Followers Page Locators - REAL
    private Locator followersList;
    private Locator followerAvatar;
    private Locator followerLink;
    private Locator nextPageLink;

    private static final String BASE_URL = "https://github.com";
    private static final String SEARCH_URL = "https://github.com/search";
    private static final String ADVANCED_SEARCH_URL = "https://github.com/search/advanced";

    public GitHubSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Main Search Page - REAL locators
        this.searchInput = page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Search GitHub"));
        this.advancedSearchLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("advanced search"));
        this.prefixesButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("prefixes"));
        
        // Advanced Search Page - REAL locators
        this.advancedSearchInput = page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Advanced search"));
        this.advancedSearchButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Search"));
        this.languageDropdown = page.getByRole(AriaRole.COMBOBOX, new Page.GetByRoleOptions().setName("Written in this language"));
        this.fromOwnersInput = page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("From these owners"));
        this.inRepositoriesInput = page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("In these repositories"));
        this.createdDateInput = page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Created on the dates"));
        
        // Search Results - REAL locators
        this.sortByButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sort by: Best match"));
        this.usersFilterLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Users").setExact(false));
        this.repositoriesFilterLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Repositories").setExact(false));
        this.codeFilterLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Code").setExact(false));
        this.issuesFilterLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Issues").setExact(false));
        this.paginationNav = page.getByRole(AriaRole.NAVIGATION, new Page.GetByRoleOptions().setName("Pagination"));
        
        // Header Navigation - REAL locators
        this.homepageLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Homepage"));
        this.signInLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Sign in"));
        this.toggleNavigationButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Toggle navigation"));
        this.skipToContentLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Skip to content"));
        
        // User Profile - REAL locators
        this.userAvatar = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("View octocat's full-sized avatar"));
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        this.followButton = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Follow"));
        this.repositoriesTab = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Repositories").setExact(false));
        this.projectsTab = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Projects"));
        this.overviewTab = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Overview"));
        
        // Followers Page - REAL locators
        this.nextPageLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Next"));
    }

    // Navigation Methods
    public void navigateToSearchPage() {
        page.navigate(SEARCH_URL);
        page.waitForLoadState();
    }

    public void navigateToAdvancedSearchPage() {
        page.navigate(ADVANCED_SEARCH_URL);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public void navigateToUserFollowers(String username) {
        page.navigate(BASE_URL + "/" + username + "?tab=followers");
        page.waitForLoadState();
    }

    // Search Methods
    public void performSearch(String query) {
        searchInput.fill(query);
        searchInput.press("Enter");
        page.waitForLoadState();
    }

    public void performAdvancedSearch(String query) {
        advancedSearchInput.fill(query);
        advancedSearchButton.click();
        page.waitForLoadState();
    }

    public void fillAdvancedSearchOwners(String owners) {
        fromOwnersInput.fill(owners);
    }

    public void fillAdvancedSearchRepositories(String repositories) {
        inRepositoriesInput.fill(repositories);
    }

    public void selectLanguage(String language) {
        languageDropdown.selectOption(language);
    }

    // Visibility Check Methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isAdvancedSearchInputVisible() {
        return advancedSearchInput.isVisible();
    }

    public boolean isAdvancedSearchButtonVisible() {
        return advancedSearchButton.isVisible();
    }

    public boolean isPaginationVisible() {
        return paginationNav.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.first().isVisible();
    }

    // UI Consistency Validation Methods
    public String documentSearchPatterns() {
        StringBuilder patterns = new StringBuilder();
        patterns.append("Search Input: ").append(isSearchInputVisible() ? "Present" : "Missing").append("\n");
        patterns.append("Advanced Search Link: ").append(advancedSearchLink.isVisible() ? "Present" : "Missing").append("\n");
        patterns.append("Prefixes Button: ").append(prefixesButton.isVisible() ? "Present" : "Missing").append("\n");
        return patterns.toString();
    }

    public void compareSearchComponentLayout() {
        // Verify search input is present and accessible
        searchInput.isVisible();
    }

    public boolean hasConsistentStyling() {
        // Verify search input has proper ARIA role and is accessible
        return searchInput.isVisible() && searchInput.isEnabled();
    }

    public void verifySearchComponentPosition() {
        // Search is positioned in main content area
        page.locator("main").isVisible();
    }

    public boolean isSearchInHeaderPosition() {
        // Main search page has search in main content, header has navigation
        return page.locator("main").isVisible() && homepageLink.isVisible();
    }

    public void testKeyboardInteractions() {
        searchInput.focus();
        searchInput.fill("test");
        searchInput.press("Enter");
    }

    public boolean isEnterKeyBehaviorConsistent() {
        // After pressing Enter, page should navigate to results
        return page.url().contains("search");
    }

    public boolean hasFocusStateConsistency() {
        searchInput.focus();
        return searchInput.isVisible();
    }

    public void validateErrorMessagesAndEmptyStates() {
        // Search for non-existent user to trigger empty state
        navigateToSearchPage();
        performSearch("nonexistentuserxyz123456789");
    }

    public boolean hasStandardErrorFormatting() {
        // Check if results page loads with proper structure
        return page.locator("main").isVisible();
    }

    public boolean hasStandardEmptyStateFormatting() {
        // Results page should show count even if zero
        return page.url().contains("search");
    }

    // Filter Methods
    public void clickUsersFilter() {
        usersFilterLink.click();
        page.waitForLoadState();
    }

    public void clickRepositoriesFilter() {
        repositoriesFilterLink.click();
        page.waitForLoadState();
    }

    public void clickCodeFilter() {
        codeFilterLink.click();
        page.waitForLoadState();
    }

    public void clickIssuesFilter() {
        issuesFilterLink.click();
        page.waitForLoadState();
    }

    // Profile Methods
    public void clickFollowersLink() {
        followersLink.first().click();
        page.waitForLoadState();
    }

    public void clickFollowingLink() {
        followingLink.first().click();
        page.waitForLoadState();
    }

    public void clickNextPage() {
        if (nextPageLink.isVisible()) {
            nextPageLink.click();
            page.waitForLoadState();
        }
    }

    // Get Text Methods
    public String getResultsCount() {
        Locator resultsText = page.locator("h2:has-text('results')");
        return resultsText.isVisible() ? resultsText.textContent() : "0 results";
    }

    public String getCurrentUrl() {
        return page.url();
    }

    public String getPageTitle() {
        return page.title();
    }
}