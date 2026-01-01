package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    
    // Locators - REALES (extraídos con Playwright MCP)
    // Barra de búsqueda de GitHub
    private Locator searchInput;
    
    // Locators - INFERIDOS (para aplicación de búsqueda de perfiles GitHub)
    // Estos locators son inferidos ya que la aplicación "Buscador de Perfiles GitHub" 
    // es una aplicación personalizada, no github.com directamente
    private Locator searchButton;
    private Locator dashboardMetricsSection;
    private Locator reposMetric;
    private Locator reposCountValue;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator followersList;
    private Locator errorMessage;
    private Locator apiLimitIndicator;

    // Locators REALES para GitHub.com (extraídos con Playwright)
    private Locator gitHubSearchInput;
    private Locator gitHubProfileReposTab;
    private Locator gitHubProfileReposCount;
    private Locator gitHubProfileFollowersLink;
    private Locator gitHubProfileFollowingLink;

    private static final String BASE_URL = "https://github.com";
    private static final String SEARCH_URL = "https://github.com/search";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators INFERIDOS para la aplicación de búsqueda de perfiles
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], input[type='search'], #search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button:has(svg), button:has-text('Search')");
        this.dashboardMetricsSection = page.locator("[data-testid='metrics-dashboard'], .metrics-section, .dashboard-metrics, .user-stats");
        this.reposMetric = page.locator("[data-testid='repos-metric'], .repos-count, .metric-repos, [data-metric='repos']");
        this.reposCountValue = page.locator("[data-testid='repos-value'], .repos-count .value, .metric-repos .count");
        this.followersMetric = page.locator("[data-testid='followers-metric'], .followers-count, .metric-followers");
        this.followingMetric = page.locator("[data-testid='following-metric'], .following-count, .metric-following");
        this.gistsMetric = page.locator("[data-testid='gists-metric'], .gists-count, .metric-gists");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img[alt*='avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-name, .fullname, h1");
        this.userUsername = page.locator("[data-testid='user-username'], .username, .login");
        this.userBio = page.locator("[data-testid='user-bio'], .bio, .user-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .location, [itemprop='homeLocation']");
        this.userCompany = page.locator("[data-testid='user-company'], .company, [itemprop='worksFor']");
        this.userWebLink = page.locator("[data-testid='user-website'], .website, a[rel='nofollow']");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-btn");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .follower-item");
        this.errorMessage = page.locator("[data-testid='error-message'], .error, .not-found, .alert-error");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit'], .rate-limit, .api-limit-warning");

        // Locators REALES para GitHub.com (extraídos con Playwright MCP)
        this.gitHubSearchInput = page.locator("input[aria-label='Search GitHub'], input[placeholder='Search GitHub']");
        this.gitHubProfileReposTab = page.locator("a[href$='?tab=repositories']");
        this.gitHubProfileReposCount = page.locator("a[href$='?tab=repositories'] span.Counter, nav[aria-label='User profile'] a:has-text('Repositories') span");
        this.gitHubProfileFollowersLink = page.locator("a[href$='?tab=followers'], a:has-text('followers')");
        this.gitHubProfileFollowingLink = page.locator("a[href$='?tab=following'], a:has-text('following')");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void enterUsername(String username) {
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isDashboardMetricsVisible() {
        return dashboardMetricsSection.isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.isVisible();
    }

    public String getReposCount() {
        reposCountValue.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return reposCountValue.textContent().trim();
    }

    public String getFollowersCount() {
        return followersMetric.textContent().trim();
    }

    public String getFollowingCount() {
        return followingMetric.textContent().trim();
    }

    public String getGistsCount() {
        return gistsMetric.textContent().trim();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUserUsername() {
        return userUsername.textContent().trim();
    }

    public String getUserBio() {
        return userBio.textContent().trim();
    }

    public String getUserLocation() {
        return userLocation.textContent().trim();
    }

    public String getUserCompany() {
        return userCompany.textContent().trim();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessage() {
        return errorMessage.textContent().trim();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public int getFollowersListCount() {
        return followersList.count();
    }

    /**
     * Navega directamente al perfil de GitHub para obtener el conteo real de repositorios
     * Locators REALES extraídos con Playwright MCP
     */
    public String getActualGitHubProfileRepoCount(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
        
        // Locator REAL: extraído de la inspección del perfil de GitHub
        // El conteo de repos aparece en la navegación como "Repositories 9"
        Locator repoCountLocator = page.locator("nav[aria-label='User profile'] a[href$='?tab=repositories'] span.Counter");
        
        if (!repoCountLocator.isVisible()) {
            // Fallback: buscar en el texto del enlace de repositorios
            repoCountLocator = page.locator("a[href$='?tab=repositories']");
            String text = repoCountLocator.textContent();
            // Extraer número del texto "Repositories 9"
            return text.replaceAll("[^0-9]", "").trim();
        }
        
        return repoCountLocator.textContent().trim();
    }

    public void scrollFollowersList() {
        followersList.last().scrollIntoViewIfNeeded();
    }

    public void clickFollowerProfile(int index) {
        followersList.nth(index).click();
    }
}