package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    
    // Locators - INFERIDOS (basados en buenas prácticas de diseño)
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator apiRequestIndicator;
    
    private static final String BASE_URL = "https://github-profile-search-app.example.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Input de búsqueda - inferido
        this.searchInput = page.locator("[data-testid='search-input']");
        
        // Botón de búsqueda con icono de lupa - inferido
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Mensaje de error - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // Contenedor del perfil - inferido
        this.profileContainer = page.locator("[data-testid='profile-container']");
        
        // Avatar del usuario - inferido
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        
        // Nombre del usuario - inferido
        this.userName = page.locator("[data-testid='user-name']");
        
        // Biografía del usuario - inferido
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Métricas del dashboard - inferido
        this.reposMetric = page.locator("[data-testid='repos-count']");
        this.followersMetric = page.locator("[data-testid='followers-count']");
        this.followingMetric = page.locator("[data-testid='following-count']");
        this.gistsMetric = page.locator("[data-testid='gists-count']");
        
        // Indicador de requests API - inferido
        this.apiRequestIndicator = page.locator("[data-testid='api-request-indicator']");
    }

    public void navigateToApp() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public String getSearchFieldValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForApiResponse() {
        page.waitForTimeout(2000);
        try {
            errorMessage.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(5000));
        } catch (Exception e) {
            // Error message may not appear if profile is found
        }
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isProfileDataDisplayed() {
        return userAvatar.isVisible() || userName.isVisible() || userBio.isVisible();
    }

    public boolean areMetricsDisplayed() {
        return reposMetric.isVisible() || 
               followersMetric.isVisible() || 
               followingMetric.isVisible() || 
               gistsMetric.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchInput.isEnabled();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public void clearSearchField() {
        searchInput.clear();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getReposCount() {
        return reposMetric.textContent();
    }

    public String getFollowersCount() {
        return followersMetric.textContent();
    }

    public String getFollowingCount() {
        return followingMetric.textContent();
    }

    public String getGistsCount() {
        return gistsMetric.textContent();
    }
}