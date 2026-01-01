package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * 
 * LOCATORS SOURCE: INFERIDO
 * - La aplicación "Buscador de Perfiles GitHub" es una aplicación personalizada
 * - Los locators de la aplicación de búsqueda son inferidos basándose en buenas prácticas
 * - Los locators de elementos de perfil de GitHub son parcialmente basados en observación real de github.com
 */
public class GitHubProfileSearchPage {
    
    private Page page;
    
    // URL de la aplicación
    private static final String BASE_URL = "https://github.com";
    
    // LOCATORS INFERIDOS - Aplicación de búsqueda personalizada
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator apiLimitIndicator;
    
    // LOCATORS INFERIDOS - Dashboard de métricas
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    
    // LOCATORS - Sección de información del usuario (basados en estructura observada de GitHub)
    private Locator userInfoSection;
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator companyField;
    private Locator locationField;
    private Locator websiteLink;
    private Locator followButton;
    
    // LOCATORS - Lista de seguidores
    private Locator followersList;
    private Locator followerItems;
    
    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Locators inferidos para la aplicación de búsqueda personalizada
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='usuario'], input[placeholder*='username'], #search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='buscar'], button[aria-label*='search'], .search-button");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit'], .api-limit-warning");
        
        // Locators inferidos para métricas del dashboard
        this.reposMetric = page.locator("[data-testid='repos-count'], .metric-repos, [aria-label*='repositories']");
        this.followersMetric = page.locator("[data-testid='followers-count'], .metric-followers, a[href*='followers']");
        this.followingMetric = page.locator("[data-testid='following-count'], .metric-following, a[href*='following']");
        this.gistsMetric = page.locator("[data-testid='gists-count'], .metric-gists");
        
        // Locators para sección de información del usuario
        this.userInfoSection = page.locator("[data-testid='user-info-section'], .user-profile-info, .vcard-details, [itemtype*='Person']");
        this.userAvatar = page.locator("[data-testid='user-avatar'], img.avatar, img[alt*='avatar'], .avatar-user");
        this.fullName = page.locator("[data-testid='full-name'], .vcard-fullname, [itemprop='name'], h1 span.p-name");
        this.username = page.locator("[data-testid='username'], .vcard-username, [itemprop='additionalName'], h1 span.p-nickname");
        this.biography = page.locator("[data-testid='biography'], .user-profile-bio, [data-bio-text]");
        
        // Locator específico para campo de compañía - elemento clave del test
        this.companyField = page.locator("[data-testid='company-field'], .vcard-detail[itemprop='worksFor'], li[aria-label*='Organization'], [itemprop='worksFor']");
        
        // Locators para otros campos del perfil
        this.locationField = page.locator("[data-testid='location-field'], .vcard-detail[itemprop='homeLocation'], li[aria-label*='location'], [itemprop='homeLocation']");
        this.websiteLink = page.locator("[data-testid='website-link'], .vcard-detail a[rel='nofollow'], [itemprop='url']");
        this.followButton = page.locator("[data-testid='follow-button'], .follow-button, button:has-text('Follow'), a:has-text('Follow')");
        
        // Locators para lista de seguidores
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, [aria-label*='followers']");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item, .d-table");
    }
    
    // Métodos de navegación
    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }
    
    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }
    
    // Métodos de búsqueda
    public void searchForUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }
    
    public void enterSearchText(String text) {
        searchInput.fill(text);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    // Métodos de verificación - Estado de la aplicación
    public boolean isApplicationLoaded() {
        return page.title() != null && !page.title().isEmpty();
    }
    
    public boolean isProfileLoaded() {
        return userAvatar.isVisible() || username.isVisible();
    }
    
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }
    
    public String getErrorMessageText() {
        return errorMessage.textContent();
    }
    
    // Métodos de verificación - Sección de información del usuario
    public boolean isUserInformationSectionVisible() {
        return userInfoSection.isVisible() || (userAvatar.isVisible() && username.isVisible());
    }
    
    public boolean isAvatarDisplayed() {
        return userAvatar.isVisible();
    }
    
    public boolean isUsernameDisplayed() {
        return username.isVisible() && !username.textContent().trim().isEmpty();
    }
    
    public boolean isFullNameDisplayedOrEmpty() {
        // El nombre completo puede estar vacío en algunos perfiles
        return fullName.count() == 0 || fullName.isVisible();
    }
    
    public String getFullName() {
        if (fullName.isVisible()) {
            return fullName.textContent().trim();
        }
        return "";
    }
    
    public String getUsername() {
        return username.textContent().trim();
    }
    
    // Métodos para campo de compañía - CLAVE PARA EL TEST
    public boolean isCompanyFieldVisible() {
        return companyField.count() > 0 && companyField.isVisible();
    }
    
    public boolean isCompanyFieldEmpty() {
        if (companyField.count() == 0) {
            return true;
        }
        String companyText = companyField.textContent().trim();
        return companyText.isEmpty();
    }
    
    public boolean isCompanyFieldEmptyOrShowsNoDisponible() {
        if (companyField.count() == 0) {
            return true;
        }
        if (!companyField.isVisible()) {
            return true;
        }
        String companyText = companyField.textContent().trim();
        return companyText.isEmpty() || 
               companyText.equalsIgnoreCase("No disponible") ||
               companyText.equalsIgnoreCase("Not available");
    }
    
    public String getCompanyText() {
        if (companyField.isVisible()) {
            return companyField.textContent().trim();
        }
        return "";
    }
    
    // Métodos para campo de ubicación
    public boolean isLocationFieldVisible() {
        return locationField.count() > 0 && locationField.isVisible();
    }
    
    public boolean isLocationFieldFunctioning() {
        // Verifica que el campo de ubicación funciona independientemente del campo de compañía
        // Retorna true si está visible con contenido, o si no está presente (perfil sin ubicación)
        if (locationField.count() == 0) {
            return true;
        }
        return locationField.isVisible();
    }
    
    public String getLocationText() {
        if (locationField.isVisible()) {
            return locationField.textContent().trim();
        }
        return "";
    }
    
    // Métodos para métricas
    public boolean areMetricsDisplayed() {
        return followersMetric.isVisible() || followingMetric.isVisible();
    }
    
    public String getFollowersCount() {
        return followersMetric.textContent().trim();
    }
    
    public String getFollowingCount() {
        return followingMetric.textContent().trim();
    }
    
    // Métodos para biografía
    public boolean isBiographyDisplayed() {
        return biography.count() > 0 && biography.isVisible();
    }
    
    public String getBiographyText() {
        if (biography.isVisible()) {
            return biography.textContent().trim();
        }
        return "";
    }
    
    // Métodos para website
    public boolean isWebsiteLinkDisplayed() {
        return websiteLink.count() > 0 && websiteLink.isVisible();
    }
    
    public String getWebsiteUrl() {
        if (websiteLink.isVisible()) {
            return websiteLink.getAttribute("href");
        }
        return "";
    }
    
    // Métodos para Follow button
    public boolean isFollowButtonDisplayed() {
        return followButton.isVisible();
    }
    
    public void clickFollowButton() {
        followButton.click();
    }
    
    // Métodos para lista de seguidores
    public boolean isFollowersListDisplayed() {
        return followersList.isVisible();
    }
    
    public int getFollowersListCount() {
        return followerItems.count();
    }
    
    // Método para API limit
    public boolean isApiLimitWarningDisplayed() {
        return apiLimitIndicator.count() > 0 && apiLimitIndicator.isVisible();
    }
}