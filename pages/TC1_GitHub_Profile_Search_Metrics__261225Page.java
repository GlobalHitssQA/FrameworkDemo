package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search functionality.
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real.
 * Los locators están basados en buenas prácticas y convenciones semánticas.
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github-profile-finder.app"; // URL inferida de la aplicación

    // Locators - INFERIDOS (basados en buenas prácticas de data-testid y selectores semánticos)
    private Locator searchInput;
    private Locator searchButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator errorMessage;
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Input de búsqueda - usando data-testid y fallbacks
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], input[placeholder*='usuario'], #search-username, .search-input");
        
        // Botón de búsqueda con icono de lupa
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='Search'], button[aria-label*='Buscar'], button.search-btn, button:has(svg.search-icon), button:has(.fa-search), button:has([class*='magnify'])");
        
        // Contadores de métricas
        this.reposCounter = page.locator("[data-testid='repos-counter'], [data-testid='repos-count'], .repos-count, .metric-repos .value, #repos-count");
        this.followersCounter = page.locator("[data-testid='followers-counter'], [data-testid='followers-count'], .followers-count, .metric-followers .value, #followers-count");
        this.followingCounter = page.locator("[data-testid='following-counter'], [data-testid='following-count'], .following-count, .metric-following .value, #following-count");
        this.gistsCounter = page.locator("[data-testid='gists-counter'], [data-testid='gists-count'], .gists-count, .metric-gists .value, #gists-count");
        
        // Información del perfil
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, .profile-avatar, img.avatar");
        this.userName = page.locator("[data-testid='user-name'], .user-name, .profile-name, h1.name, h2.name");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .profile-bio, .bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .profile-location, .location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .profile-company, .company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, .profile-website, a.website");
        
        // Mensajes de error y estado
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .user-not-found, .api-error");
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests'], .api-limit, .requests-remaining");
    }

    // Métodos de navegación
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Métodos de interacción - Búsqueda
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    public void waitForApiResponse() {
        page.waitForResponse(response -> response.url().contains("api.github.com/users"), () -> {});
        page.waitForTimeout(1000); // Espera adicional para renderizado
    }

    // Métodos de visibilidad
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
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

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    // Métodos para obtener valores de métricas
    public String getReposCounterValue() {
        return reposCounter.textContent().trim().replaceAll("[^0-9]", "");
    }

    public String getFollowersCounterValue() {
        return followersCounter.textContent().trim().replaceAll("[^0-9]", "");
    }

    public String getFollowingCounterValue() {
        return followingCounter.textContent().trim().replaceAll("[^0-9]", "");
    }

    public String getGistsCounterValue() {
        return gistsCounter.textContent().trim().replaceAll("[^0-9]", "");
    }

    // Métodos para obtener información del perfil
    public String getUserName() {
        return userName.textContent().trim();
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

    public String getUserWebsite() {
        return userWebsite.getAttribute("href");
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public String getErrorMessage() {
        return errorMessage.textContent().trim();
    }

    // Métodos para obtener el texto del input
    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    // Método para limpiar el campo de búsqueda
    public void clearSearchInput() {
        searchInput.clear();
    }
}