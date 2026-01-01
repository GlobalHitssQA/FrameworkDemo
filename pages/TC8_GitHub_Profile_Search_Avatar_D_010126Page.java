package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;

/**
 * Page Object for GitHub Profile Search component.
 * Locators are INFERRED based on best practices for a custom GitHub profile search application.
 */
public class GitHubProfileSearchPage {

    private Page page;
    
    // Locators - INFERIDOS (aplicación personalizada de búsqueda de perfiles GitHub)
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileSection;
    private Locator userAvatar;
    private Locator userName;
    private Locator userFullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator followButton;
    private Locator errorMessage;
    private Locator loadingIndicator;

    private static final String BASE_URL = "https://github.com";
    private static final int AVATAR_MIN_WIDTH = 50;
    private static final int AVATAR_MIN_HEIGHT = 50;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initLocators();
    }

    private void initLocators() {
        // Input de búsqueda - inferido con data-testid semántico
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], input[aria-label*='search'], #search-username");
        
        // Botón de búsqueda con icono de lupa - inferido
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button:has(svg), .search-btn");
        
        // Sección de perfil del usuario (lado izquierdo) - inferido
        this.profileSection = page.locator("[data-testid='profile-section'], .profile-section, .user-profile, aside.profile");
        
        // Avatar del usuario - inferido
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img.avatar, .profile-avatar img, img[alt*='avatar']");
        
        // Nombre de usuario (username) - inferido
        this.userName = page.locator("[data-testid='username'], .username, .user-login, [itemprop='additionalName']");
        
        // Nombre completo - inferido
        this.userFullName = page.locator("[data-testid='fullname'], .fullname, .user-fullname, [itemprop='name']");
        
        // Biografía del usuario - inferido
        this.userBio = page.locator("[data-testid='user-bio'], .bio, .user-bio, [itemprop='description']");
        
        // Ubicación del usuario - inferido
        this.userLocation = page.locator("[data-testid='user-location'], .location, [itemprop='homeLocation']");
        
        // Empresa del usuario - inferido
        this.userCompany = page.locator("[data-testid='user-company'], .company, [itemprop='worksFor']");
        
        // Botón de seguir - inferido
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-btn");
        
        // Mensaje de error para usuario no encontrado - inferido
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .not-found, [role='alert']");
        
        // Indicador de carga - inferido
        this.loadingIndicator = page.locator("[data-testid='loading'], .loading, .spinner, [aria-busy='true']");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        // Esperar a que desaparezca el indicador de carga
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(com.microsoft.playwright.options.WaitForSelectorState.HIDDEN).setTimeout(10000));
        // Esperar a que el perfil sea visible
        profileSection.waitFor(new Locator.WaitForOptions().setState(com.microsoft.playwright.options.WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isProfileSectionVisible() {
        return profileSection.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isAvatarProperlySized() {
        if (!userAvatar.isVisible()) {
            return false;
        }
        
        Object width = userAvatar.evaluate("el => el.naturalWidth || el.width");
        Object height = userAvatar.evaluate("el => el.naturalHeight || el.height");
        
        int avatarWidth = width instanceof Number ? ((Number) width).intValue() : 0;
        int avatarHeight = height instanceof Number ? ((Number) height).intValue() : 0;
        
        return avatarWidth >= AVATAR_MIN_WIDTH && avatarHeight >= AVATAR_MIN_HEIGHT;
    }

    public boolean isAvatarSourceValid() {
        if (!userAvatar.isVisible()) {
            return false;
        }
        
        String src = userAvatar.getAttribute("src");
        return src != null && !src.isEmpty() && 
               (src.contains("avatars.githubusercontent.com") || src.contains("github"));
    }

    public boolean isAvatarLoadedSuccessfully() {
        if (!userAvatar.isVisible()) {
            return false;
        }
        
        // Verificar que la imagen se cargó correctamente usando naturalWidth
        Object result = userAvatar.evaluate("img => img.complete && img.naturalWidth > 0");
        return Boolean.TRUE.equals(result);
    }

    public boolean hasNoAvatarRenderingIssues() {
        if (!userAvatar.isVisible()) {
            return false;
        }
        
        // Verificar que no hay errores de renderizado
        // Una imagen rota típicamente tiene naturalWidth = 0 o tiene clase de error
        Object hasError = userAvatar.evaluate(
            "img => !img.classList.contains('error') && " +
            "!img.classList.contains('broken') && " +
            "img.complete && img.naturalWidth > 0 && img.naturalHeight > 0"
        );
        
        return Boolean.TRUE.equals(hasError);
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent();
        }
        return "";
    }

    public String getUserName() {
        if (userName.isVisible()) {
            return userName.textContent();
        }
        return "";
    }

    public String getUserFullName() {
        if (userFullName.isVisible()) {
            return userFullName.textContent();
        }
        return "";
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }
}