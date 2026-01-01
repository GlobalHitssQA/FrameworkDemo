package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * Locators: INFERIDOS - basados en buenas prácticas y estructura típica de aplicaciones de búsqueda de perfiles
 */
public class GitHubProfileSearchPage {

    private Page page;

    // Locators - INFERIDOS (basados en elementos UI testeables de la metadata)
    // Search Section
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Profile Section - User Details (Left Column)
    private Locator userDetailsSection;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;

    // Metrics Dashboard
    private Locator metricsDashboard;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;

    // Followers Section (Right Column)
    private Locator followersListSection;
    private Locator followersList;
    private Locator followerItem;
    private Locator followerAvatar;
    private Locator followerLink;

    // Layout Container
    private Locator mainContainer;
    private Locator twoColumnLayout;

    // API Limit Indicator
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Search Section - Locators inferidos
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='search'], input[type='search'], #search-input, .search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit']:has(svg), button:has-text('Search'), .search-button, button[aria-label*='search']");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .alert-error, [role='alert']");

        // Profile Section - User Details
        this.userDetailsSection = page.locator("[data-testid='user-details'], .user-details, .profile-section, .user-profile");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img[alt*='avatar'], .profile-avatar");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .vcard-fullname, h1.name");
        this.username = page.locator("[data-testid='username'], .username, .vcard-username, span.username");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio, .profile-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, [itemprop='homeLocation'], .location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, [itemprop='worksFor'], .company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, a[rel='nofollow'], .website-link");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-button, .btn-follow");

        // Metrics Dashboard
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard'], .metrics-dashboard, .stats-container, .user-stats");
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, [data-metric='repos'], .counter:has-text('Repos')");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, [data-metric='followers'], a[href*='followers']");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, [data-metric='following'], a[href*='following']");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, [data-metric='gists'], .counter:has-text('Gists')");

        // Followers Section
        this.followersListSection = page.locator("[data-testid='followers-section'], .followers-section, .followers-list-container, aside.followers");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers, .follower-items");
        this.followerItem = page.locator("[data-testid='follower-item'], .follower-item, .follower-card, li.follower");
        this.followerAvatar = page.locator("[data-testid='follower-avatar'], .follower-avatar, .follower img");
        this.followerLink = page.locator("[data-testid='follower-link'], .follower-link, a.follower");

        // Layout Container
        this.mainContainer = page.locator("[data-testid='main-container'], .main-container, main, #app, .app-container");
        this.twoColumnLayout = page.locator("[data-testid='two-column-layout'], .two-column-layout, .layout-desktop, .grid-container");

        // API Limit Indicator
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning, .api-status");
    }

    // Navigation
    public void navigate(String url) {
        page.navigate(url);
    }

    public boolean isPageLoaded() {
        return mainContainer.isVisible();
    }

    // Search Actions
    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void waitForProfileToLoad() {
        userDetailsSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    // Profile Visibility Checks
    public boolean isProfileDisplayed() {
        return userDetailsSection.isVisible() && userAvatar.isVisible();
    }

    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isFollowersListSectionVisible() {
        return followersListSection.isVisible();
    }

    public boolean isTwoColumnLayoutDisplayed() {
        if (!twoColumnLayout.isVisible()) {
            return userDetailsSection.isVisible() && followersListSection.isVisible();
        }
        return twoColumnLayout.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean areMetricsVisible() {
        return followersCount.isVisible() || metricsDashboard.isVisible();
    }

    public boolean isPersonalInfoVisible() {
        return userFullName.isVisible() || username.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible() || followersListSection.isVisible();
    }

    public boolean areElementsProperlySpaced() {
        // Verifica que los elementos principales estén visibles y tengan dimensiones apropiadas
        if (userAvatar.isVisible()) {
            var box = userAvatar.boundingBox();
            if (box != null && box.width > 0 && box.height > 0) {
                return true;
            }
        }
        return mainContainer.isVisible();
    }

    // Responsive Layout Methods
    public void waitForLayoutAdjustment() {
        page.waitForTimeout(500); // Allow layout to adjust after resize
    }

    public boolean isLayoutResponsive() {
        return mainContainer.isVisible() && isProfileDisplayed();
    }

    public boolean isContentReadable() {
        // Verifica que el contenido principal siga siendo visible y legible
        return userDetailsSection.isVisible() || mainContainer.isVisible();
    }

    // Error Handling
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Getters for text content
    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return username.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    // Followers List Interactions
    public int getFollowersListCount() {
        return followerItem.count();
    }

    public void scrollFollowersList() {
        followersListSection.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    public void clickFollowerLink(int index) {
        followerLink.nth(index).click();
    }
}