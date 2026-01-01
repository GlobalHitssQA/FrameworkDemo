package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (la URL base corresponde a github.com pero el caso de prueba
 * describe una aplicación personalizada de búsqueda de perfiles)
 */
public class GitHubProfileSearchPage {

    private Page page;
    
    // URL de la aplicación
    private static final String BASE_URL = "https://github.com";
    
    // Locators - INFERIDOS basados en buenas prácticas para componente de búsqueda personalizado
    private Locator searchContainer;
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator profileDashboard;
    private Locator rightSection;
    private Locator followersList;
    private Locator followerEntries;
    private Locator userAvatar;
    private Locator userName;
    private Locator userFullName;
    private Locator userBio;
    private Locator metricsRepos;
    private Locator metricsFollowers;
    private Locator metricsFollowing;
    private Locator metricsGists;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Componente de búsqueda
        this.searchContainer = page.locator("[data-testid='search-container']");
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // Dashboard de perfil
        this.profileDashboard = page.locator("[data-testid='profile-dashboard']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Métricas
        this.metricsRepos = page.locator("[data-testid='metric-repos']");
        this.metricsFollowers = page.locator("[data-testid='metric-followers']");
        this.metricsFollowing = page.locator("[data-testid='metric-following']");
        this.metricsGists = page.locator("[data-testid='metric-gists']");
        
        // Sección derecha con lista de seguidores
        this.rightSection = page.locator("[data-testid='right-section']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerEntries = page.locator("[data-testid='follower-entry']");
    }

    // Métodos de navegación
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
        searchContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Métodos de verificación de visibilidad
    public boolean isSearchComponentVisible() {
        return searchContainer.isVisible() && searchInput.isVisible() && searchButton.isVisible();
    }

    public boolean isRightSectionVisible() {
        return rightSection.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isRightSectionAlignedWithProfile() {
        return rightSection.isVisible() && profileDashboard.isVisible();
    }

    // Métodos de interacción
    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public boolean isUsernameEntered(String expectedUsername) {
        String actualValue = searchInput.inputValue();
        return expectedUsername.equals(actualValue);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        profileDashboard.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        followersList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Métodos de verificación de lista de seguidores
    public boolean isFollowersListVertical() {
        if (!followersList.isVisible()) {
            return false;
        }
        // Verificar que la lista tiene display flex con dirección column o es una lista vertical
        String flexDirection = followersList.evaluate("el => window.getComputedStyle(el).flexDirection").toString();
        String display = followersList.evaluate("el => window.getComputedStyle(el).display").toString();
        
        return "column".equals(flexDirection) || 
               "block".equals(display) || 
               "flex".equals(display) && "column".equals(flexDirection);
    }

    public int getFollowerEntriesCount() {
        return followerEntries.count();
    }

    public boolean areAllFollowerEntriesVisible() {
        int count = followerEntries.count();
        if (count == 0) {
            return false;
        }
        for (int i = 0; i < count; i++) {
            if (!followerEntries.nth(i).isVisible()) {
                return false;
            }
        }
        return true;
    }

    // Métodos para obtener información
    public String getUserName() {
        return userName.textContent();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Métodos para métricas
    public String getReposCount() {
        return metricsRepos.textContent();
    }

    public String getFollowersCount() {
        return metricsFollowers.textContent();
    }

    public String getFollowingCount() {
        return metricsFollowing.textContent();
    }

    public String getGistsCount() {
        return metricsGists.textContent();
    }
}