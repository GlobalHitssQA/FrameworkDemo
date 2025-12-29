package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (basados en buenas prácticas para aplicación customizada de búsqueda de perfiles GitHub)
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl;

    // Locators inferidos - Input de búsqueda
    private final Locator searchInput;
    private final Locator searchButton;

    // Locators inferidos - Mensaje de error
    private final Locator errorMessage;
    private final Locator emptyStateContainer;

    // Locators inferidos - Información del perfil (para verificar que NO se muestran)
    private final Locator profileContainer;
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userBio;

    // Locators inferidos - Métricas del perfil
    private final Locator reposCounter;
    private final Locator followersCounter;
    private final Locator followingCounter;
    private final Locator gistsCounter;

    // Locators inferidos - Indicador de API
    private final Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = "https://github.com"; // URL base del proyecto

        // Inicialización de locators inferidos - Búsqueda
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[type='text'][placeholder*='search' i], input[type='search']");
        this.searchButton = page.locator("[data-testid='search-button'], #search-button, button[aria-label*='search' i], button:has(svg[class*='search']), button:has([class*='magnify'])");

        // Inicialización de locators inferidos - Mensajes de error/estado vacío
        this.errorMessage = page.locator("[data-testid='error-message'], [data-testid='user-not-found'], .error-message, .not-found-message, [class*='error'], [class*='not-found'], [role='alert']");
        this.emptyStateContainer = page.locator("[data-testid='empty-state'], .empty-state, [class*='empty'], [class*='no-results']");

        // Inicialización de locators inferidos - Perfil de usuario
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, #profile-container, [class*='profile-card'], [class*='user-profile']");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar' i], img[class*='avatar']");
        this.userName = page.locator("[data-testid='user-name'], .user-name, [class*='username'], h1[class*='name'], h2[class*='name']");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, [class*='bio'], p[class*='description']");

        // Inicialización de locators inferidos - Métricas
        this.reposCounter = page.locator("[data-testid='repos-count'], .repos-count, [class*='repo-count'], span:has-text('Repos') + span");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-count, [class*='follower-count'], span:has-text('Followers') + span");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-count, [class*='following-count'], span:has-text('Following') + span");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-count, [class*='gist-count'], span:has-text('Gists') + span");

        // Inicialización de locators inferidos - API
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator'], .api-limit, [class*='rate-limit'], [class*='api-status']");
    }

    /**
     * Navega a la página de búsqueda de perfiles
     */
    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    /**
     * Verifica si el input de búsqueda está visible
     */
    public boolean isSearchInputVisible() {
        return searchInput.first().isVisible();
    }

    /**
     * Verifica si el botón de búsqueda está visible
     */
    public boolean isSearchButtonVisible() {
        return searchButton.first().isVisible();
    }

    /**
     * Ingresa un nombre de usuario en el campo de búsqueda
     */
    public void enterUsername(String username) {
        searchInput.first().clear();
        searchInput.first().fill(username);
    }

    /**
     * Hace clic en el botón de búsqueda
     */
    public void clickSearchButton() {
        searchButton.first().click();
        page.waitForLoadState();
    }

    /**
     * Verifica si el mensaje de error está visible
     */
    public boolean isErrorMessageVisible() {
        return errorMessage.first().isVisible() || emptyStateContainer.first().isVisible();
    }

    /**
     * Obtiene el texto del mensaje de error
     */
    public String getErrorMessageText() {
        if (errorMessage.first().isVisible()) {
            return errorMessage.first().textContent();
        }
        if (emptyStateContainer.first().isVisible()) {
            return emptyStateContainer.first().textContent();
        }
        return "";
    }

    /**
     * Verifica si la información del perfil está oculta (no se muestra)
     */
    public boolean isProfileInfoHidden() {
        boolean profileHidden = !profileContainer.first().isVisible();
        boolean avatarHidden = !userAvatar.first().isVisible();
        boolean metricsHidden = !reposCounter.first().isVisible() && 
                                !followersCounter.first().isVisible();
        return profileHidden || (avatarHidden && metricsHidden);
    }

    /**
     * Verifica si el avatar del usuario está visible
     */
    public boolean isUserAvatarVisible() {
        return userAvatar.first().isVisible();
    }

    /**
     * Obtiene el nombre del usuario
     */
    public String getUserName() {
        return userName.first().textContent();
    }

    /**
     * Obtiene la biografía del usuario
     */
    public String getUserBio() {
        return userBio.first().textContent();
    }

    /**
     * Obtiene el contador de repositorios
     */
    public String getReposCount() {
        return reposCounter.first().textContent();
    }

    /**
     * Obtiene el contador de seguidores
     */
    public String getFollowersCount() {
        return followersCounter.first().textContent();
    }

    /**
     * Obtiene el contador de following
     */
    public String getFollowingCount() {
        return followingCounter.first().textContent();
    }

    /**
     * Obtiene el contador de gists
     */
    public String getGistsCount() {
        return gistsCounter.first().textContent();
    }

    /**
     * Verifica si el indicador de requests API está visible
     */
    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.first().isVisible();
    }
}