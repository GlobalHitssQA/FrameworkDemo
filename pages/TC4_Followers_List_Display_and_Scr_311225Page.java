package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object para la aplicación de búsqueda de perfiles GitHub.
 * NOTA: Los locators son INFERIDOS basándose en buenas prácticas y la descripción de la UI.
 */
public class GitHubProfileSearchPage {

    private Page page;

    // Locators - INFERIDOS (basados en buenas prácticas de nomenclatura)
    private Locator searchInput;
    private Locator searchButton;
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followerAvatar;
    private Locator followerUsername;
    private Locator followerProfileLink;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;
    private Locator reposCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    private Locator apiRequestsIndicator;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Input de búsqueda - inferido
        this.searchInput = page.locator("[data-testid='search-input']");
        
        // Botón de búsqueda con icono de lupa - inferido
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Contenedor de lista de seguidores - inferido
        this.followersListContainer = page.locator("[data-testid='followers-list']");
        
        // Items individuales de seguidores - inferido
        this.followerItems = page.locator("[data-testid='follower-item']");
        
        // Avatar de cada seguidor - inferido
        this.followerAvatar = page.locator("[data-testid='follower-item'] [data-testid='follower-avatar']");
        
        // Username de cada seguidor - inferido
        this.followerUsername = page.locator("[data-testid='follower-item'] [data-testid='follower-username']");
        
        // Link al perfil de cada seguidor - inferido
        this.followerProfileLink = page.locator("[data-testid='follower-item'] [data-testid='follower-link']");
        
        // Avatar del usuario principal - inferido
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        
        // Nombre completo del usuario - inferido
        this.userFullName = page.locator("[data-testid='user-fullname']");
        
        // Biografía del usuario - inferido
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Ubicación del usuario - inferido
        this.userLocation = page.locator("[data-testid='user-location']");
        
        // Empresa del usuario - inferido
        this.userCompany = page.locator("[data-testid='user-company']");
        
        // Sitio web del usuario - inferido
        this.userWebsite = page.locator("[data-testid='user-website']");
        
        // Botón Follow - inferido
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Métricas del dashboard - inferido
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");
        
        // Indicador de requests API - inferido
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
        
        // Mensaje de error - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Métodos de navegación
    public void navigate(String url) {
        page.navigate(url);
    }

    // Métodos de interacción con búsqueda
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    // Métodos de espera
    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    // Métodos de verificación de lista de seguidores
    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }

    public boolean isFirstFollowerAvatarVisible() {
        return followerAvatar.first().isVisible();
    }

    public boolean isFirstFollowerUsernameVisible() {
        return followerUsername.first().isVisible();
    }

    public boolean isFirstFollowerLinkVisible() {
        return followerProfileLink.first().isVisible();
    }

    public boolean isFollowersListScrollable() {
        // Verifica si el contenedor tiene scroll habilitado
        String overflowY = followersListContainer.evaluate("el => getComputedStyle(el).overflowY").toString();
        boolean hasOverflow = overflowY.equals("scroll") || overflowY.equals("auto");
        
        // Verifica si el contenido excede el contenedor
        Double scrollHeight = (Double) followersListContainer.evaluate("el => el.scrollHeight");
        Double clientHeight = (Double) followersListContainer.evaluate("el => el.clientHeight");
        
        return hasOverflow && scrollHeight > clientHeight;
    }

    public void scrollFollowersList() {
        followersListContainer.evaluate("el => el.scrollTop = el.scrollHeight / 2");
    }

    public boolean areAdditionalFollowersVisible() {
        int visibleCount = followerItems.count();
        return visibleCount > 0;
    }

    public void clickFirstFollowerLink() {
        followerProfileLink.first().click();
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    // Métodos de verificación de perfil de usuario
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent();
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

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Métodos de métricas
    public String getReposCount() {
        return reposCount.textContent();
    }

    public String getFollowersCountText() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    // Métodos de error
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }
}