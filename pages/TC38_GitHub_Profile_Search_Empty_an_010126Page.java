package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en buenas prácticas y elementos UI descritos en metadata
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (basados en buenas prácticas de data-testid y selectores semánticos)
    private Locator searchInput;
    private Locator searchButton;
    private Locator validationMessage;
    private Locator emptyStateMessage;
    private Locator userNotFoundMessage;
    private Locator errorMessageContainer;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator followButton;
    private Locator followersList;
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Input de búsqueda - inferido
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[placeholder*='username'], input[placeholder*='buscar'], input[type='search']");
        
        // Botón de búsqueda con icono de lupa - inferido
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit']:has(svg), button:has-text('Search'), button:has-text('Buscar'), button[aria-label*='search']");
        
        // Mensaje de validación - inferido
        this.validationMessage = page.locator("[data-testid='validation-message'], .validation-message, .error-message, [role='alert'], .field-error");
        
        // Mensaje de estado vacío - inferido
        this.emptyStateMessage = page.locator("[data-testid='empty-state'], .empty-state, .no-results, .empty-message");
        
        // Mensaje de usuario no encontrado - inferido
        this.userNotFoundMessage = page.locator("[data-testid='user-not-found'], .user-not-found, .error-message:has-text('not found'), .error-message:has-text('No results'), [role='alert']:has-text('User not found')");
        
        // Contenedor de mensaje de error - inferido
        this.errorMessageContainer = page.locator("[data-testid='error-container'], .error-container, .alert-error, .error-banner, [role='alert']");
        
        // Avatar del usuario - inferido
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, .avatar, img[alt*='avatar']");
        
        // Nombre completo del usuario - inferido
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .full-name, h1.name, .vcard-fullname");
        
        // Username del usuario - inferido
        this.userUsername = page.locator("[data-testid='user-username'], .user-username, .username, .vcard-username, span[itemprop='additionalName']");
        
        // Biografía del usuario - inferido
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio, [itemprop='description']");
        
        // Ubicación del usuario - inferido
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .location, [itemprop='homeLocation']");
        
        // Empresa del usuario - inferido
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .company, [itemprop='worksFor']");
        
        // Enlace web del usuario - inferido
        this.userWebLink = page.locator("[data-testid='user-website'], .user-website, a[rel='nofollow me'], .website-link");
        
        // Contador de repositorios - inferido
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, .counter:has-text('Repos'), a[href*='repositories'] .Counter");
        
        // Contador de seguidores - inferido
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, a[href*='followers'] .Counter, .counter:has-text('Followers')");
        
        // Contador de following - inferido
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, a[href*='following'] .Counter, .counter:has-text('Following')");
        
        // Contador de gists - inferido
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, .counter:has-text('Gists')");
        
        // Botón Follow - inferido
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), input[value='Follow'], .follow-button");
        
        // Lista de seguidores - inferido
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .follow-list, ul.followers");
        
        // Indicador de límite de API - inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit'], .api-limit, .rate-limit, .api-limit-warning");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchInputEmpty() {
        String value = searchInput.inputValue();
        return value == null || value.trim().isEmpty();
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResponse() {
        page.waitForLoadState();
        // Esperar a que aparezca algún resultado o mensaje de error
        page.waitForSelector("[data-testid='user-avatar'], [data-testid='user-not-found'], .user-avatar, .error-message, .user-not-found", 
            new Page.WaitForSelectorOptions().setTimeout(10000).setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isValidationMessageVisible() {
        return validationMessage.isVisible();
    }

    public boolean isEmptyStateMessageVisible() {
        return emptyStateMessage.isVisible();
    }

    public boolean isSearchPrevented() {
        // Verificar si el botón está deshabilitado o si la URL no cambió
        return searchButton.isDisabled() || searchInput.getAttribute("aria-invalid") != null;
    }

    public boolean isUserNotFoundMessageVisible() {
        return userNotFoundMessage.isVisible() || errorMessageContainer.isVisible();
    }

    public boolean isErrorMessageUserFriendly() {
        if (!errorMessageContainer.isVisible() && !userNotFoundMessage.isVisible()) {
            return false;
        }
        String errorText = errorMessageContainer.isVisible() 
            ? errorMessageContainer.textContent() 
            : userNotFoundMessage.textContent();
        // Verificar que el mensaje es claro y no técnico
        return errorText != null && !errorText.isEmpty() 
            && !errorText.contains("404") 
            && !errorText.contains("Exception");
    }

    public boolean hasErrorMessageProperStyling() {
        Locator visibleError = errorMessageContainer.isVisible() 
            ? errorMessageContainer 
            : userNotFoundMessage;
        // Verificar que el elemento tiene estilos apropiados (está visible y tiene dimensiones)
        return visibleError.isVisible() && visibleError.boundingBox() != null;
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserUsername() {
        return userUsername.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getReposCount() {
        return reposCount.textContent();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }
}