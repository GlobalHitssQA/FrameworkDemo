package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class GitHubProfileSearchPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "https://github.com"; // Cambiar por URL real de la aplicación
    private static final int DEFAULT_TIMEOUT = 10;
    
    // ==================== LOCATORS ====================
    // Elementos de búsqueda (inferidos - basados en buenas prácticas)
    private By searchInput = By.cssSelector("[data-testid='search-input'], input[type='text'][placeholder*='earch'], input[type='search']");
    private By searchButton = By.cssSelector("[data-testid='search-button'], button[type='submit'] svg, button[aria-label*='earch']");
    
    // Mensaje de error (inferido)
    private By errorMessage = By.cssSelector("[data-testid='error-message'], .error-message, [class*='error'], [class*='not-found'], [class*='empty-state']");
    
    // Información del perfil de usuario (inferidos)
    private By userAvatar = By.cssSelector("[data-testid='user-avatar'], img[alt*='avatar'], .avatar, .user-avatar");
    private By userName = By.cssSelector("[data-testid='user-name'], .user-name, .vcard-fullname, h1[class*='name']");
    private By userUsername = By.cssSelector("[data-testid='user-username'], .user-username, .vcard-username");
    private By userBio = By.cssSelector("[data-testid='user-bio'], .user-bio, .bio, [class*='biography']");
    private By userLocation = By.cssSelector("[data-testid='user-location'], .user-location, [itemprop='homeLocation']");
    private By userCompany = By.cssSelector("[data-testid='user-company'], .user-company, [itemprop='worksFor']");
    private By userWebsite = By.cssSelector("[data-testid='user-website'], .user-website, a[rel='nofollow']");
    private By followButton = By.cssSelector("[data-testid='follow-button'], button:contains('Follow'), .follow-btn");
    
    // Métricas del usuario (inferidos)
    private By reposCounter = By.cssSelector("[data-testid='repos-counter'], .repos-count, [href*='repositories'] .Counter");
    private By followersCounter = By.cssSelector("[data-testid='followers-counter'], .followers-count, a[href*='followers']");
    private By followingCounter = By.cssSelector("[data-testid='following-counter'], .following-count, a[href*='following']");
    private By gistsCounter = By.cssSelector("[data-testid='gists-counter'], .gists-count, a[href*='gists']");
    
    // Lista de seguidores (inferido)
    private By followersList = By.cssSelector("[data-testid='followers-list'], .followers-list, [class*='follower']");
    
    // Indicador de API requests (inferido)
    private By apiRequestsIndicator = By.cssSelector("[data-testid='api-requests-indicator'], .api-limit, [class*='rate-limit']");
    
    // ==================== CONSTRUCTOR ====================
    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
    }
    
    // ==================== NAVIGATION ====================
    public void navigateToSearchPage() {
        driver.get(BASE_URL);
    }
    
    public boolean isPageLoaded() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    // ==================== SEARCH ACTIONS ====================
    public boolean isSearchInputVisible() {
        return isElementDisplayed(searchInput);
    }
    
    public boolean isSearchButtonVisible() {
        return isElementDisplayed(searchButton);
    }
    
    public void enterUsername(String username) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        input.clear();
        input.sendKeys(username);
    }
    
    public String getSearchInputValue() {
        WebElement input = driver.findElement(searchInput);
        return input.getAttribute("value");
    }
    
    public void clickSearchButton() {
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(searchButton));
        button.click();
    }
    
    public void waitForApiResponse() {
        // Esperar a que desaparezca el loading o aparezca resultado/error
        try {
            wait.until(ExpectedConditions.or(
                ExpectedConditions.visibilityOfElementLocated(errorMessage),
                ExpectedConditions.visibilityOfElementLocated(userAvatar)
            ));
        } catch (Exception e) {
            // Timeout - continuar con la verificación
        }
    }
    
    // ==================== ERROR MESSAGE ====================
    public boolean isErrorMessageDisplayed() {
        return isElementDisplayed(errorMessage);
    }
    
    public String getErrorMessageText() {
        try {
            WebElement element = driver.findElement(errorMessage);
            return element.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    // ==================== PROFILE INFORMATION ====================
    public boolean isUserAvatarDisplayed() {
        return isElementDisplayed(userAvatar);
    }
    
    public boolean isUserNameDisplayed() {
        return isElementDisplayed(userName);
    }
    
    public boolean isUserBioDisplayed() {
        return isElementDisplayed(userBio);
    }
    
    public boolean isUserLocationDisplayed() {
        return isElementDisplayed(userLocation);
    }
    
    public boolean isUserCompanyDisplayed() {
        return isElementDisplayed(userCompany);
    }
    
    public boolean isUserWebsiteDisplayed() {
        return isElementDisplayed(userWebsite);
    }
    
    public boolean isFollowButtonDisplayed() {
        return isElementDisplayed(followButton);
    }
    
    // ==================== METRICS ====================
    public boolean isReposCounterDisplayed() {
        return isElementDisplayed(reposCounter);
    }
    
    public boolean isFollowersCounterDisplayed() {
        return isElementDisplayed(followersCounter);
    }
    
    public boolean isFollowingCounterDisplayed() {
        return isElementDisplayed(followingCounter);
    }
    
    public boolean isGistsCounterDisplayed() {
        return isElementDisplayed(gistsCounter);
    }
    
    // ==================== FOLLOWERS LIST ====================
    public boolean isFollowersListDisplayed() {
        return isElementDisplayed(followersList);
    }
    
    public List<WebElement> getFollowerItems() {
        try {
            return driver.findElements(followersList);
        } catch (Exception e) {
            return List.of();
        }
    }
    
    // ==================== API INDICATOR ====================
    public boolean isApiRequestsIndicatorDisplayed() {
        return isElementDisplayed(apiRequestsIndicator);
    }
    
    // ==================== UTILITY METHODS ====================
    private boolean isElementDisplayed(By locator) {
        try {
            List<WebElement> elements = driver.findElements(locator);
            return !elements.isEmpty() && elements.get(0).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}