package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (basados en buenas prácticas para un componente de búsqueda de perfiles)
    private Locator searchInput;
    private Locator searchButton;
    private Locator dashboardSection;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator errorMessage;
    private Locator loadingIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search component locators - inferidos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Dashboard section locator - inferido
        this.dashboardSection = page.locator("[data-testid='dashboard-section']");
        
        // Metrics locators - inferidos
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");
        
        // User profile locators - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Status locators - inferidos
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
    }

    public void navigate() {
        page.navigate(BASE_URL);
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileDataToLoad() {
        dashboardSection.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isDashboardVisible() {
        return dashboardSection.isVisible();
    }

    public boolean areAllMetricsVisible() {
        return reposMetric.isVisible() 
            && followersMetric.isVisible() 
            && followingMetric.isVisible() 
            && gistsMetric.isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersMetric.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingMetric.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.isVisible();
    }

    public boolean isReposMetricHighlighted() {
        String classAttribute = reposMetric.getAttribute("class");
        return classAttribute != null && classAttribute.contains("highlighted");
    }

    public boolean isFollowersMetricHighlighted() {
        String classAttribute = followersMetric.getAttribute("class");
        return classAttribute != null && classAttribute.contains("highlighted");
    }

    public boolean isFollowingMetricHighlighted() {
        String classAttribute = followingMetric.getAttribute("class");
        return classAttribute != null && classAttribute.contains("highlighted");
    }

    public boolean isGistsMetricHighlighted() {
        String classAttribute = gistsMetric.getAttribute("class");
        return classAttribute != null && classAttribute.contains("highlighted");
    }

    public String getReposCount() {
        Locator countLocator = reposMetric.locator("[data-testid='metric-count']");
        return countLocator.isVisible() ? countLocator.textContent() : null;
    }

    public String getFollowersCount() {
        Locator countLocator = followersMetric.locator("[data-testid='metric-count']");
        return countLocator.isVisible() ? countLocator.textContent() : null;
    }

    public String getFollowingCount() {
        Locator countLocator = followingMetric.locator("[data-testid='metric-count']");
        return countLocator.isVisible() ? countLocator.textContent() : null;
    }

    public String getGistsCount() {
        Locator countLocator = gistsMetric.locator("[data-testid='metric-count']");
        return countLocator.isVisible() ? countLocator.textContent() : null;
    }

    public boolean areMetricsVisuallyConsistent() {
        String reposClass = reposMetric.getAttribute("class");
        String followersClass = followersMetric.getAttribute("class");
        String followingClass = followingMetric.getAttribute("class");
        String gistsClass = gistsMetric.getAttribute("class");
        
        // Verify all metrics have the same highlighting class pattern
        boolean allHighlighted = isReposMetricHighlighted() 
            && isFollowersMetricHighlighted() 
            && isFollowingMetricHighlighted() 
            && isGistsMetricHighlighted();
        
        return allHighlighted;
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }
}