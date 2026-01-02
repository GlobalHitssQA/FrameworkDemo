package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search component.
 * 
 * LOCATORS: INFERIDOS - Los selectores están basados en buenas prácticas y
 * la estructura típica de una aplicación de búsqueda de perfiles GitHub.
 * La aplicación real ("Buscador de Perfiles GitHub") es una app custom que
 * consume la API de GitHub, no la página de GitHub directamente.
 */
public class GitHubProfileSearchPage {

    private Page page;

    // Locators para la interfaz de búsqueda (INFERIDOS)
    private Locator usernameInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Locators para el perfil del usuario (INFERIDOS)
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;

    // Locators para métricas del dashboard (INFERIDOS)
    private Locator metricsDashboard;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // Locators para lista de seguidores (INFERIDOS)
    private Locator followersList;
    private Locator apiRequestIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Interfaz de búsqueda - LOCATORS INFERIDOS
        this.usernameInput = page.locator("[data-testid='username-input'], input[placeholder*='username'], #username-search, input[name='username']");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button:has(svg[class*='search']), button:has-text('Search')");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");

        // Perfil del usuario - LOCATORS INFERIDOS
        this.userAvatar = page.locator("[data-testid='user-avatar'], img[alt*='avatar'], .avatar, .profile-avatar");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .vcard-fullname, h1.user-name");
        this.userName = page.locator("[data-testid='username'], .username, .vcard-username, span.user-login");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio, p.user-biography");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, [itemprop='homeLocation']");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, [itemprop='worksFor']");
        this.userWebLink = page.locator("[data-testid='user-website'], .user-website, a[rel='nofollow']");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-button");

        // Dashboard de métricas - LOCATORS INFERIDOS
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard'], .metrics-dashboard, .user-metrics, .stats-container");
        this.reposCounter = page.locator("[data-testid='repos-counter'], .repos-count, [data-metric='repos'], .counter-repos");
        this.followersCounter = page.locator("[data-testid='followers-counter'], .followers-count, [data-metric='followers'], .counter-followers");
        this.followingCounter = page.locator("[data-testid='following-counter'], .following-count, [data-metric='following'], .counter-following");
        this.gistsCounter = page.locator("[data-testid='gists-counter'], .gists-count, [data-metric='gists'], .counter-gists");

        // Lista de seguidores y API indicator - LOCATORS INFERIDOS
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, ul.followers");
        this.apiRequestIndicator = page.locator("[data-testid='api-requests'], .api-limit, .rate-limit-indicator");
    }

    // Métodos de navegación
    public void navigateTo(String url) {
        page.navigate(url);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceReady() {
        return usernameInput.isVisible() && searchButton.isVisible();
    }

    // Métodos de búsqueda
    public void searchForUser(String username) {
        usernameInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public void clearSearchInput() {
        usernameInput.clear();
    }

    // Métodos de verificación del perfil
    public boolean isUserProfileDisplayed() {
        return userAvatar.isVisible() || userName.isVisible();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getUserLocation() {
        return userLocation.textContent();
    }

    public String getUserCompany() {
        return userCompany.textContent();
    }

    // Métodos para métricas
    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
    }

    public boolean isReposCounterVisible() {
        return reposCounter.isVisible();
    }

    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }

    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }

    public boolean areAllMetricsDisplayed() {
        return isReposCounterVisible() &&
               isFollowersCounterVisible() &&
               isFollowingCounterVisible() &&
               isGistsCounterVisible();
    }

    public int getReposCount() {
        return parseMetricValue(reposCounter.textContent());
    }

    public int getFollowersCount() {
        return parseMetricValue(followersCounter.textContent());
    }

    public int getFollowingCount() {
        return parseMetricValue(followingCounter.textContent());
    }

    public int getGistsCount() {
        return parseMetricValue(gistsCounter.textContent());
    }

    // Métodos para lista de seguidores
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followersList.locator("li, .follower-item, [data-testid='follower-item']").count();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    // Métodos para API indicator
    public boolean isApiRequestIndicatorVisible() {
        return apiRequestIndicator.isVisible();
    }

    public String getApiRequestIndicatorText() {
        return apiRequestIndicator.textContent();
    }

    // Método utilitario para parsear valores de métricas
    private int parseMetricValue(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }
        // Remover caracteres no numéricos excepto 'k' para miles
        String cleanedText = text.replaceAll("[^0-9kK.]", "").trim();
        if (cleanedText.isEmpty()) {
            return 0;
        }
        try {
            if (cleanedText.toLowerCase().contains("k")) {
                // Manejar formato abreviado (ej: "269k" -> 269000)
                String numPart = cleanedText.toLowerCase().replace("k", "");
                double value = Double.parseDouble(numPart);
                return (int) (value * 1000);
            }
            return Integer.parseInt(cleanedText);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    // Método para hacer clic en el botón Follow
    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }
}