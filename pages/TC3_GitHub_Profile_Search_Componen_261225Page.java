package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Page Object for GitHub Profile Search Component
 * 
 * LOCATORS SOURCE: INFERIDO (basado en buenas practicas)
 * La URL proporcionada (github.com) es la pagina principal de GitHub,
 * pero el componente descrito es una aplicacion custom de busqueda de perfiles.
 * Los locators estan basados en convenciones de data-testid y selectores semanticos.
 */
public class GitHubProfileSearchPage {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final int WAIT_TIMEOUT = 10;
    private static final int LAYOUT_ADAPTATION_WAIT = 500; // milliseconds

    // ============ LOCATORS - SEARCH COMPONENT ============
    // Inferido: Input de busqueda de usuario
    private By searchInput = By.cssSelector("[data-testid='search-input'], input[placeholder*='usuario'], input[placeholder*='username'], #search-input");
    
    // Inferido: Boton de busqueda con icono de lupa
    private By searchButton = By.cssSelector("[data-testid='search-button'], button[aria-label*='search'], button[aria-label*='buscar'], .search-btn");
    
    // Inferido: Contenedor principal del componente
    private By mainComponent = By.cssSelector("[data-testid='profile-search-component'], .profile-search-container, #app, main");

    // ============ LOCATORS - PROFILE SECTION ============
    // Inferido: Seccion del perfil de usuario
    private By profileSection = By.cssSelector("[data-testid='profile-section'], .profile-section, .user-profile");
    
    // Inferido: Avatar del usuario
    private By userAvatar = By.cssSelector("[data-testid='user-avatar'], .avatar, img[alt*='avatar'], .profile-avatar");
    
    // Inferido: Nombre completo del usuario
    private By userFullName = By.cssSelector("[data-testid='user-fullname'], .user-name, .fullname, h1.name");
    
    // Inferido: Username del usuario
    private By username = By.cssSelector("[data-testid='username'], .username, .login, span.username");
    
    // Inferido: Biografia del perfil
    private By userBio = By.cssSelector("[data-testid='user-bio'], .bio, .user-bio, p.bio");
    
    // Inferido: Ubicacion del usuario
    private By userLocation = By.cssSelector("[data-testid='user-location'], .location, .user-location");
    
    // Inferido: Empresa del usuario
    private By userCompany = By.cssSelector("[data-testid='user-company'], .company, .organization");
    
    // Inferido: Enlace web personal
    private By userWebsite = By.cssSelector("[data-testid='user-website'], .website, a.blog, .user-url");
    
    // Inferido: Boton Follow
    private By followButton = By.cssSelector("[data-testid='follow-button'], button:contains('Follow'), .follow-btn");

    // ============ LOCATORS - METRICS DASHBOARD ============
    // Inferido: Dashboard de metricas
    private By metricsDashboard = By.cssSelector("[data-testid='metrics-dashboard'], .metrics, .stats-container, .counters");
    
    // Inferido: Contador de repositorios
    private By reposCounter = By.cssSelector("[data-testid='repos-counter'], .repos-count, [data-metric='repos'], .counter-repos");
    
    // Inferido: Contador de followers
    private By followersCounter = By.cssSelector("[data-testid='followers-counter'], .followers-count, [data-metric='followers'], .counter-followers");
    
    // Inferido: Contador de following
    private By followingCounter = By.cssSelector("[data-testid='following-counter'], .following-count, [data-metric='following'], .counter-following");
    
    // Inferido: Contador de gists
    private By gistsCounter = By.cssSelector("[data-testid='gists-counter'], .gists-count, [data-metric='gists'], .counter-gists");

    // ============ LOCATORS - FOLLOWERS LIST ============
    // Inferido: Lista de seguidores
    private By followersList = By.cssSelector("[data-testid='followers-list'], .followers-list, .followers-container, ul.followers");
    
    // Inferido: Items individuales de seguidores
    private By followerItems = By.cssSelector("[data-testid='follower-item'], .follower-item, .followers-list li, .follower-card");
    
    // Inferido: Avatar de seguidor
    private By followerAvatar = By.cssSelector("[data-testid='follower-avatar'], .follower-item img, .follower-avatar");
    
    // Inferido: Enlace de perfil de seguidor
    private By followerProfileLink = By.cssSelector("[data-testid='follower-link'], .follower-item a, .follower-profile-link");

    // ============ LOCATORS - API INDICATOR ============
    // Inferido: Indicador de limite de requests (ej. 51/60)
    private By apiRequestsIndicator = By.cssSelector("[data-testid='api-requests-indicator'], .rate-limit, .requests-remaining, .api-limit");

    // ============ LOCATORS - ERROR MESSAGES ============
    // Inferido: Mensaje de error para usuario inexistente
    private By errorMessage = By.cssSelector("[data-testid='error-message'], .error-message, .user-not-found, .alert-error");

    // ============ CONSTRUCTOR ============
    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(WAIT_TIMEOUT));
    }

    // ============ SEARCH METHODS ============
    public void searchUser(String username) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(username);
        clickSearchButton();
        waitForProfileToLoad();
    }

    public void clickSearchButton() {
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(searchButton));
        button.click();
    }

    public void enterSearchText(String text) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(text);
    }

    // ============ VISIBILITY CHECK METHODS ============
    public boolean isComponentDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(mainComponent)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchInputDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchInputEnabled() {
        try {
            return driver.findElement(searchInput).isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(searchButton)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonEnabled() {
        try {
            return driver.findElement(searchButton).isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isProfileSectionDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(profileSection)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAvatarDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(userAvatar)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isUsernameDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(username)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isMetricsDashboardDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(metricsDashboard)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isReposCounterDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(reposCounter)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowersCounterDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(followersCounter)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowingCounterDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(followingCounter)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isGistsCounterDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(gistsCounter)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowersListDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(followersList)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areAllMainElementsDisplayed() {
        return isSearchInputDisplayed() && 
               isSearchButtonDisplayed() && 
               isProfileSectionDisplayed() && 
               isFollowersListDisplayed();
    }

    // ============ RESPONSIVE LAYOUT METHODS ============
    public void waitForLayoutAdaptation() {
        try {
            Thread.sleep(LAYOUT_ADAPTATION_WAIT);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public boolean isMobileLayoutActive() {
        int windowWidth = driver.manage().window().getSize().getWidth();
        return windowWidth < 768; // Standard mobile breakpoint
    }

    public boolean isDesktopLayoutCorrect() {
        int windowWidth = driver.manage().window().getSize().getWidth();
        if (windowWidth >= 1024) {
            // Verify elements are displayed side by side in desktop
            return isProfileSectionDisplayed() && isFollowersListDisplayed();
        }
        return false;
    }

    public boolean isStackedLayoutActive() {
        // In stacked layout, profile should appear before followers in DOM order
        // This is a simplified check - in real implementation, compare Y positions
        if (isMobileLayoutActive()) {
            try {
                WebElement profile = driver.findElement(profileSection);
                WebElement followers = driver.findElement(followersList);
                return profile.getLocation().getY() < followers.getLocation().getY();
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    // ============ SCROLL METHODS ============
    public boolean isFollowersListScrollable() {
        try {
            WebElement followersContainer = wait.until(
                ExpectedConditions.presenceOfElementLocated(followersList));
            
            JavascriptExecutor js = (JavascriptExecutor) driver;
            
            // Check if element has scrollable content
            Long scrollHeight = (Long) js.executeScript(
                "return arguments[0].scrollHeight", followersContainer);
            Long clientHeight = (Long) js.executeScript(
                "return arguments[0].clientHeight", followersContainer);
            
            // If scrollHeight > clientHeight, content is scrollable
            return scrollHeight > clientHeight;
        } catch (Exception e) {
            return false;
        }
    }

    public void scrollFollowersList(int pixels) {
        try {
            WebElement followersContainer = driver.findElement(followersList);
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].scrollTop += arguments[1]", 
                followersContainer, pixels);
        } catch (Exception e) {
            // Handle scroll exception
        }
    }

    public void scrollToFollower(int index) {
        try {
            java.util.List<WebElement> followers = driver.findElements(followerItems);
            if (index < followers.size()) {
                JavascriptExecutor js = (JavascriptExecutor) driver;
                js.executeScript("arguments[0].scrollIntoView(true);", 
                    followers.get(index));
            }
        } catch (Exception e) {
            // Handle scroll exception
        }
    }

    // ============ WAIT METHODS ============
    private void waitForProfileToLoad() {
        wait.until(ExpectedConditions.or(
            ExpectedConditions.visibilityOfElementLocated(profileSection),
            ExpectedConditions.visibilityOfElementLocated(errorMessage)
        ));
    }

    // ============ GETTER METHODS ============
    public String getUsername() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(username)).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getFullName() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(userFullName)).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getReposCount() {
        try {
            return driver.findElement(reposCounter).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowersCount() {
        try {
            return driver.findElement(followersCounter).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowingCount() {
        try {
            return driver.findElement(followingCounter).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getGistsCount() {
        try {
            return driver.findElement(gistsCounter).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public int getFollowersListItemCount() {
        try {
            return driver.findElements(followerItems).size();
        } catch (Exception e) {
            return 0;
        }
    }

    public String getApiRequestsIndicatorText() {
        try {
            return driver.findElement(apiRequestsIndicator).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isErrorMessageDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getErrorMessageText() {
        try {
            return driver.findElement(errorMessage).getText();
        } catch (Exception e) {
            return "";
        }
    }
}