package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

/**
 * Page Object for GitHub Profile Finder Application
 * 
 * LOCATOR SOURCE: INFERIDO
 * Los locators están basados en buenas prácticas (data-testid, IDs semánticos)
 * ya que la aplicación "Buscador de Perfiles GitHub" es una aplicación personalizada
 * que consume la API de GitHub, no la página de GitHub directamente.
 * 
 * Referencia de elementos UI del contexto:
 * - Input de texto para búsqueda
 * - Botón de búsqueda con icono de lupa
 * - Contadores: Repos, Followers, Following, Gists
 * - Indicador de Requests (ej. 51/60)
 */
public class GitHubProfileFinderPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    // URL base de la aplicación (configurar según ambiente)
    private static final String BASE_URL = "https://github.com"; // URL inferida - ajustar según aplicación real
    
    // =====================================================
    // LOCATORS - INFERIDOS (basados en buenas prácticas)
    // =====================================================
    
    // Elementos de búsqueda
    private By searchInput = By.cssSelector("[data-testid='search-input']");
    private By searchButton = By.cssSelector("[data-testid='search-button']");
    private By searchButtonIcon = By.cssSelector("[data-testid='search-button'] svg, [data-testid='search-button'] .search-icon");
    
    // Alternativas de locators para búsqueda (fallback)
    private By searchInputAlt = By.id("username-search");
    private By searchButtonAlt = By.cssSelector("button[type='submit'].search-btn, button.btn-search");
    
    // Contenedor del perfil
    private By profileContainer = By.cssSelector("[data-testid='profile-container']");
    private By profileLoading = By.cssSelector("[data-testid='profile-loading'], .loading-spinner");
    
    // Información del usuario
    private By userAvatar = By.cssSelector("[data-testid='user-avatar']");
    private By userFullName = By.cssSelector("[data-testid='user-fullname']");
    private By userName = By.cssSelector("[data-testid='username']");
    private By userBio = By.cssSelector("[data-testid='user-bio']");
    private By userLocation = By.cssSelector("[data-testid='user-location']");
    private By userCompany = By.cssSelector("[data-testid='user-company']");
    private By userWebsite = By.cssSelector("[data-testid='user-website']");
    private By followButton = By.cssSelector("[data-testid='follow-button']");
    
    // =====================================================
    // MÉTRICAS DEL DASHBOARD - LOCATORS PRINCIPALES
    // =====================================================
    
    // Contenedor de métricas
    private By metricsContainer = By.cssSelector("[data-testid='metrics-container'], .metrics-dashboard");
    
    // Métrica: Repos (Repositorios)
    private By reposMetric = By.cssSelector("[data-testid='metric-repos']");
    private By reposValue = By.cssSelector("[data-testid='metric-repos'] .metric-value, [data-testid='repos-count']");
    private By reposLabel = By.cssSelector("[data-testid='metric-repos'] .metric-label");
    
    // Métrica: Followers (Seguidores)
    private By followersMetric = By.cssSelector("[data-testid='metric-followers']");
    private By followersValue = By.cssSelector("[data-testid='metric-followers'] .metric-value, [data-testid='followers-count']");
    private By followersLabel = By.cssSelector("[data-testid='metric-followers'] .metric-label");
    
    // Métrica: Following (Siguiendo)
    private By followingMetric = By.cssSelector("[data-testid='metric-following']");
    private By followingValue = By.cssSelector("[data-testid='metric-following'] .metric-value, [data-testid='following-count']");
    private By followingLabel = By.cssSelector("[data-testid='metric-following'] .metric-label");
    
    // Métrica: Gists
    private By gistsMetric = By.cssSelector("[data-testid='metric-gists']");
    private By gistsValue = By.cssSelector("[data-testid='metric-gists'] .metric-value, [data-testid='gists-count']");
    private By gistsLabel = By.cssSelector("[data-testid='metric-gists'] .metric-label");
    
    // Indicador de API Requests
    private By apiRequestsIndicator = By.cssSelector("[data-testid='api-requests-indicator']");
    private By apiRequestsCount = By.cssSelector("[data-testid='api-requests-count']");
    
    // Lista de seguidores
    private By followersList = By.cssSelector("[data-testid='followers-list']");
    private By followerItem = By.cssSelector("[data-testid='follower-item']");
    private By followerAvatar = By.cssSelector("[data-testid='follower-avatar']");
    private By followerLink = By.cssSelector("[data-testid='follower-link']");
    
    // Mensaje de error
    private By errorMessage = By.cssSelector("[data-testid='error-message'], .error-container");
    private By userNotFoundError = By.cssSelector("[data-testid='user-not-found']");
    
    // =====================================================
    // CONSTRUCTOR
    // =====================================================
    
    public GitHubProfileFinderPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // =====================================================
    // MÉTODOS DE NAVEGACIÓN
    // =====================================================
    
    public void navigateToProfileFinder() {
        driver.get(BASE_URL);
    }
    
    public void navigateToProfileFinder(String url) {
        driver.get(url);
    }
    
    public boolean isPageLoaded() {
        try {
            wait.until(ExpectedConditions.or(
                ExpectedConditions.visibilityOfElementLocated(searchInput),
                ExpectedConditions.visibilityOfElementLocated(searchInputAlt)
            ));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    // =====================================================
    // MÉTODOS DE BÚSQUEDA
    // =====================================================
    
    public boolean isSearchInputVisible() {
        try {
            return driver.findElement(searchInput).isDisplayed() || 
                   driver.findElement(searchInputAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isSearchButtonVisible() {
        try {
            return driver.findElement(searchButton).isDisplayed() || 
                   driver.findElement(searchButtonAlt).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void enterUsername(String username) {
        WebElement input = findElement(searchInput, searchInputAlt);
        input.clear();
        input.sendKeys(username);
    }
    
    public String getSearchInputValue() {
        WebElement input = findElement(searchInput, searchInputAlt);
        return input.getAttribute("value");
    }
    
    public void clickSearchButton() {
        WebElement button = findElement(searchButton, searchButtonAlt);
        button.click();
    }
    
    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
        waitForProfileToLoad();
    }
    
    // =====================================================
    // MÉTODOS DE ESPERA
    // =====================================================
    
    public void waitForProfileToLoad() {
        // Esperar a que desaparezca el loading
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(profileLoading));
        } catch (Exception e) {
            // Loading puede no estar presente
        }
        // Esperar a que aparezca el contenedor del perfil
        wait.until(ExpectedConditions.visibilityOfElementLocated(profileContainer));
    }
    
    public void waitForMetricsToLoad() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(metricsContainer));
    }
    
    // =====================================================
    // MÉTODOS DE MÉTRICAS - REPOS
    // =====================================================
    
    public boolean isReposMetricVisible() {
        try {
            return driver.findElement(reposMetric).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public int getReposCount() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(reposValue));
        return parseMetricValue(element.getText());
    }
    
    public String getReposLabel() {
        return driver.findElement(reposLabel).getText();
    }
    
    // =====================================================
    // MÉTODOS DE MÉTRICAS - FOLLOWERS
    // =====================================================
    
    public boolean isFollowersMetricVisible() {
        try {
            return driver.findElement(followersMetric).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public int getFollowersCount() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(followersValue));
        return parseMetricValue(element.getText());
    }
    
    public String getFollowersLabel() {
        return driver.findElement(followersLabel).getText();
    }
    
    // =====================================================
    // MÉTODOS DE MÉTRICAS - FOLLOWING
    // =====================================================
    
    public boolean isFollowingMetricVisible() {
        try {
            return driver.findElement(followingMetric).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public int getFollowingCount() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(followingValue));
        return parseMetricValue(element.getText());
    }
    
    public String getFollowingLabel() {
        return driver.findElement(followingLabel).getText();
    }
    
    // =====================================================
    // MÉTODOS DE MÉTRICAS - GISTS
    // =====================================================
    
    public boolean isGistsMetricVisible() {
        try {
            return driver.findElement(gistsMetric).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public int getGistsCount() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(gistsValue));
        return parseMetricValue(element.getText());
    }
    
    public String getGistsLabel() {
        return driver.findElement(gistsLabel).getText();
    }
    
    // =====================================================
    // MÉTODOS DE INFORMACIÓN DE PERFIL
    // =====================================================
    
    public boolean isProfileDisplayed() {
        try {
            return driver.findElement(profileContainer).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getUserFullName() {
        return driver.findElement(userFullName).getText();
    }
    
    public String getUserName() {
        return driver.findElement(userName).getText();
    }
    
    public String getUserBio() {
        try {
            return driver.findElement(userBio).getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    public String getUserLocation() {
        try {
            return driver.findElement(userLocation).getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    public boolean isAvatarDisplayed() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    // =====================================================
    // MÉTODOS DE API REQUESTS INDICATOR
    // =====================================================
    
    public boolean isApiRequestsIndicatorVisible() {
        try {
            return driver.findElement(apiRequestsIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getApiRequestsText() {
        return driver.findElement(apiRequestsCount).getText();
    }
    
    // =====================================================
    // MÉTODOS DE ERROR
    // =====================================================
    
    public boolean isErrorMessageDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUserNotFoundErrorDisplayed() {
        try {
            return driver.findElement(userNotFoundError).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getErrorMessageText() {
        return driver.findElement(errorMessage).getText();
    }
    
    // =====================================================
    // MÉTODOS AUXILIARES
    // =====================================================
    
    /**
     * Parsea valores de métricas que pueden tener formato abreviado (ej: 268k, 1.5M)
     */
    private int parseMetricValue(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        
        text = text.trim().toLowerCase().replaceAll("[^0-9.kmb]", "");
        
        try {
            if (text.endsWith("k")) {
                return (int) (Double.parseDouble(text.replace("k", "")) * 1000);
            } else if (text.endsWith("m")) {
                return (int) (Double.parseDouble(text.replace("m", "")) * 1000000);
            } else if (text.endsWith("b")) {
                return (int) (Double.parseDouble(text.replace("b", "")) * 1000000000);
            } else {
                return Integer.parseInt(text.replaceAll("[^0-9]", ""));
            }
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    /**
     * Busca un elemento usando el locator principal, si no lo encuentra usa el alternativo
     */
    private WebElement findElement(By primary, By fallback) {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(primary));
        } catch (Exception e) {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(fallback));
        }
    }
    
    /**
     * Obtiene todas las métricas del perfil en un objeto
     */
    public ProfileMetrics getAllMetrics() {
        return new ProfileMetrics(
            getReposCount(),
            getFollowersCount(),
            getFollowingCount(),
            getGistsCount()
        );
    }
    
    /**
     * Clase interna para encapsular las métricas del perfil
     */
    public static class ProfileMetrics {
        public final int repos;
        public final int followers;
        public final int following;
        public final int gists;
        
        public ProfileMetrics(int repos, int followers, int following, int gists) {
            this.repos = repos;
            this.followers = followers;
            this.following = following;
            this.gists = gists;
        }
        
        @Override
        public String toString() {
            return String.format("Repos: %d, Followers: %d, Following: %d, Gists: %d",
                repos, followers, following, gists);
        }
    }
}